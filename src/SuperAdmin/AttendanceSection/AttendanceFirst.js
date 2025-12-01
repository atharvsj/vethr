// import { useState, useEffect } from "react"
// import axiosInstance from "../../utils/axiosInstance";

// export default function Attendance1({ onNavigate }) {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [entriesPerPage, setEntriesPerPage] = useState(10)
//   const [currentPage, setCurrentPage] = useState(1)
//   const [attendanceData, setAttendanceData] = useState([]);

//   useEffect(() => {
//     const fetchAttendanceData = async () => {
//       try {
//         const response = await axiosInstance.get("api/attendance_overview/");
//         if (response.data.status === "success") {
//           const formatted = response.data.data.map((item, index) => ({
//             id: index,
//             name: item.full_name,
//             email: item.email,
//             date: item.login_date,
//             clockIn: item.clock_in || '--',
//             clockOut: item.clock_out || '--',
//             late: item.late_mark || '--',
//             earlyLeaving: item.is_half_day || '--',
//             totalWork: item.total_work || '--',
//             avatar: item.avatar,
//             status: item.attendance_status,
//           }));
//           setAttendanceData(formatted);
//         }
//       } catch (error) {
//         console.error("Error fetching attendance data:", error);
//       }
//     };

//     fetchAttendanceData();
//   }, []);

//   const filteredData = attendanceData.filter(
//     (employee) =>
//       (employee.name ?? '').toLowerCase().includes(searchTerm) ||
//       (employee.email ?? '').toLowerCase().includes(searchTerm),
//   )

//   const totalPages = Math.ceil(filteredData.length / entriesPerPage)
//   const startIndex = (currentPage - 1) * entriesPerPage
//   const endIndex = startIndex + entriesPerPage
//   const currentData = filteredData.slice(startIndex, endIndex)

//   const handlePageChange = (page) => {
//     setCurrentPage(page)
//   }

//   const formatTimeTo12Hour = (timeString) => {
//     if (!timeString || typeof timeString !== 'string') {
//       return "--";
//     }
//     const parts = timeString.split(':');
//     let hours = parseInt(parts[0], 10);
//     let minutes = parseInt(parts[1], 10);

//     if (isNaN(hours) || isNaN(minutes)) {
//       return "--";
//     }

//     const ampm = hours >= 12 ? 'PM' : 'AM';
//     hours = hours % 12;
//     hours = hours ? hours : 12;

//     const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
//     const formattedHours = hours < 10 ? '0' + hours : hours;

//     return `${formattedHours}:${formattedMinutes} ${ampm}`;
//   };

//   // --- STYLES (Only color values changed) ---
//   const containerStyle = {
//     padding: "24px",
//     backgroundColor: "#ffffff",
//     minHeight: "100vh",
//     fontFamily: "Arial, sans-serif",
//   }

//   const headerStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "24px",
//     paddingBottom: "16px",
//     borderBottom: "2px solid #e5e7eb",
//   }

//   const titleStyle = {
//     fontSize: "24px",
//     fontWeight: "600",
//     color: "#1f2937",
//     margin: 0,
//   }
  
//   const controlsStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "20px",
//     padding: "16px",
//     backgroundColor: "#f9fafb",
//     borderRadius: "8px",
//     border: "1px solid #e5e7eb",
//   }

//   const selectStyle = {
//     border: "1px solid #d1d5db",
//     borderRadius: "6px",
//     padding: "8px 12px",
//     fontSize: "14px",
//     backgroundColor: "white",
//     cursor: "pointer",
//     outline: "none",
//   }

//   const inputStyle = {
//     border: "1px solid #d1d5db",
//     borderRadius: "6px",
//     padding: "8px 12px",
//     fontSize: "14px",
//     width: "250px",
//     outline: "none",
//     transition: "border-color 0.2s ease",
//   }

//   const tableContainerStyle = {
//     overflowX: "auto",
//     border: "1px solid #e5e7eb",
//     borderRadius: "12px",
//     backgroundColor: "white",
//     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
//   }

//   const tableStyle = {
//     width: "100%",
//     borderCollapse: "collapse",
//   }

//   const thStyle = {
//     padding: "16px",
//     textAlign: "left",
//     fontSize: "12px",
//     fontWeight: "600",
//     color: "#6b7280",
//     textTransform: "uppercase",
//     letterSpacing: "0.05em",
//     backgroundColor: "#f3f4f6", // Updated for consistency
//     borderBottom: "1px solid #e5e7eb",
//   }

//   const tdStyle = {
//     padding: "16px",
//     borderBottom: "1px solid #f3f4f6",
//     fontSize: "14px",
//   }

//   const nameStyle = {
//     fontWeight: "500",
//     color: "#1f2937",
//     marginBottom: "4px",
//   }

//   const emailStyle = {
//     color: "#3b82f6",
//     fontSize: "13px",
//   }

//   const statusBadgeStyle = {
//     display: "inline-flex",
//     padding: "4px 12px",
//     fontSize: "12px",
//     fontWeight: "600",
//     borderRadius: "20px",
//     backgroundColor: "#d1fae5",
//     color: "#065f46",
//   }

//   const timeStyle = {
//     color: "#3b82f6",
//     fontWeight: "500",
//   }

//   const paginationStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: "24px",
//     padding: "16px",
//     backgroundColor: "#f9fafb",
//     borderRadius: "8px",
//   }

//   const pageButtonStyle = {
//     padding: "8px 12px",
//     fontSize: "14px",
//     border: "1px solid #d1d5db",
//     borderRadius: "6px",
//     backgroundColor: "white",
//     cursor: "pointer",
//     margin: "0 2px",
//     transition: "all 0.2s ease",
//   }
  
//   // --- COLOR CHANGE 1: Active page button is now purple ---
//   const activePageStyle = {
//     backgroundColor: "#673ab7",
//     color: "white",
//     borderColor: "#673ab7",
//   }

//   const disabledButtonStyle = {
//     opacity: 0.5,
//     cursor: "not-allowed",
//   }
  
//   // --- COLOR CHANGE 2: Previous/Next buttons are now purple ---
//   const solidPurpleButtonStyle = {
//       ...pageButtonStyle,
//       backgroundColor: '#673ab7',
//       color: 'white',
//       border: '1px solid #673ab7',
//   }

//   return (
//     <div style={containerStyle}>
//       <div style={headerStyle}>
//         <h1 style={titleStyle}>Daily Attendance Report</h1>
//       </div>

//    <div
//   style={{
//     display: "flex",
//     justifyContent: "space-between", // ✅ keeps them apart
//     alignItems: "center",
//     gap: "20px", // ✅ spacing between both blocks
//     padding: "6px 10px", // ✅ some space around
//     flexWrap: "nowrap", // ✅ prevents going up/down
//   }}
// >
//   {/* Show Entries */}
//   <div
//     style={{
//       display: "flex",
//       alignItems: "center",
//       gap: "6px",
//     }}
//   >
//     <span style={{ fontSize: "13px", color: "#6b7280", whiteSpace: "nowrap" }}>
//       Show
//     </span>
//     <select
//       value={entriesPerPage}
//       onChange={(e) => setEntriesPerPage(Number(e.target.value))}
//       style={{
//         padding: "4px 6px",
//         fontSize: "13px",
//         borderRadius: "6px",
//         border: "1px solid #d1d5db",
//         width: "70px", // ✅ compact width
//       }}
//     >
//       <option value={10}>10</option>
//       <option value={25}>25</option>
//       <option value={50}>50</option>
//       <option value={100}>100</option>
//     </select>
 
//   </div>

//   {/* Search */}
//   <div
//     style={{
//       display: "flex",
//       alignItems: "center",
//       gap: "6px",
//     }}
//   >
  
//     <input
//       type="text"
//       value={searchTerm}
//       onChange={(e) => setSearchTerm(e.target.value)}
//       placeholder="Search employees..."
//       style={{
//         width: "140px", // ✅ smaller fixed width for Windows view
//         padding: "4px 6px",
//         fontSize: "13px",
//         borderRadius: "6px",
//         border: "1px solid #d1d5db",
//         outline: "none",
//       }}
//       onFocus={(e) => (e.target.style.borderColor = "#673ab7")}
//       onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
//     />
//   </div>
// </div>


//       <div style={tableContainerStyle}>
//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th style={thStyle}>Sr. No.</th>
//               <th style={thStyle}>Employee</th>
//               <th style={thStyle}>Date</th>
//               <th style={thStyle}>Status</th>
//               <th style={thStyle}>Punch In</th>
//               <th style={thStyle}>Punch Out</th>
//               <th style={thStyle}>Late</th>
//               <th style={thStyle}>Half Day</th>
//               <th style={thStyle}>Total Work</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentData.map((employee, index) => (
//               <tr
//                 key={employee.id}
//                 onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9fafb")}
//                 onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
//               >
//                 <td style={tdStyle}>{startIndex + index + 1}</td>
//                 <td style={tdStyle}>
//                   <div style={{ display: "flex", alignItems: "center" }}>
//                     <div>
//                       <div style={nameStyle}>{employee.name}</div>
//                       {employee.email && <div style={emailStyle}>{employee.email}</div>}
//                     </div>
//                   </div>
//                 </td>
//                 <td style={tdStyle}>{employee.date.split("T")[0]}</td>
//                 <td style={tdStyle}>
//                   <span style={statusBadgeStyle}>{employee.status}</span>
//                 </td>
//                 <td style={{ ...tdStyle, ...timeStyle }}>{formatTimeTo12Hour(employee.clockIn)}</td>
//                 <td style={{ ...tdStyle, ...timeStyle }}>{formatTimeTo12Hour(employee.clockOut)}</td>
//                 <td style={{ ...tdStyle, ...timeStyle }}>{employee.late}</td>
//                 <td style={{ ...tdStyle, ...timeStyle }}>{employee.earlyLeaving}</td>
//                 <td style={{ ...tdStyle, ...timeStyle }}>{employee.totalWork}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div style={paginationStyle}>
//         <div style={{ fontSize: "14px", color: "#6b7280" }}>
//           Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} records
//         </div>

//         <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             style={{
//               ...solidPurpleButtonStyle,
//               ...(currentPage === 1 ? disabledButtonStyle : {}),
//             }}
//           >
//             Previous
//           </button>

//           {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//             <button
//               key={page}
//               onClick={() => handlePageChange(page)}
//               style={{
//                 ...pageButtonStyle,
//                 ...(currentPage === page ? activePageStyle : {}),
//               }}
//             >
//               {page}
//             </button>
//           ))}

//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             style={{
//               ...solidPurpleButtonStyle,
//               ...(currentPage === totalPages ? disabledButtonStyle : {}),
//             }}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }   /////// 








 




// import { useState, useEffect } from "react"
// import axiosInstance from "../../utils/axiosInstance";
 
// export default function Attendance1({ onNavigate }) {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [entriesPerPage, setEntriesPerPage] = useState(10)
//   const [currentPage, setCurrentPage] = useState(1)
//   const [attendanceData, setAttendanceData] = useState([]);
 
//   useEffect(() => {
//     const fetchAttendanceData = async () => {
//       try {
//         const response = await axiosInstance.get("api/attendance_overview/");
//         if (response.data.status === "success") {
//          const formatted = response.data.data.map((item, index) => ({
//   id: index,
//   name: item.full_name,
//   email: item.email,
//   date: item.login_date,
//   clockIn: item.clock_in || '--',
//   clockOut: item.clock_out || '--',
//   inLocation: item.in_location || '--',
//   outLocation: item.out_location || '--',
//   late: item.late_mark || '--',
//   earlyLeaving: item.is_half_day || '--',
//   totalWork: item.total_work || '--',
//   avatar: item.avatar,
//   status: item.attendance_status,
// }));

//           setAttendanceData(formatted);
//         }
//       } catch (error) {
//         console.error("Error fetching attendance data:", error);
//       }
//     };
 
//     fetchAttendanceData();
//   }, []);
 
//   // --- NEW: Function to format date to dd/mm/yyyy ---
//   const formatDateToDDMMYYYY = (dateString) => {
//     if (!dateString) return '--';
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) return '--';
 
//       const day = String(date.getDate()).padStart(2, '0');
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const year = date.getFullYear();
//       return `${day}/${month}/${year}`;
//     } catch (error) {
//       return '--';
//     }
//   };
 
//   const formatTimeTo12Hour = (timeString) => {
//     if (!timeString || typeof timeString !== 'string') {
//       return "--";
//     }
//     const parts = timeString.split(':');
//     let hours = parseInt(parts[0], 10);
//     let minutes = parseInt(parts[1], 10);
 
//     if (isNaN(hours) || isNaN(minutes)) {
//       return "--";
//     }
 
//     const ampm = hours >= 12 ? 'PM' : 'AM';
//     hours = hours % 12;
//     hours = hours ? hours : 12;
 
//     const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
//     const formattedHours = hours < 10 ? '0' + hours : hours;
 
//     return `${formattedHours}:${formattedMinutes} ${ampm}`;
//   };
 
//   // --- MODIFIED: Search logic now checks all relevant columns ---
//   const filteredData = attendanceData.filter(employee => {
//     if (!searchTerm) return true; // If search is empty, show all results
 
//     const searchTermLower = searchTerm.toLowerCase();
 
//     // An array of all values to search through for each employee
//     const searchableFields = [
//       employee.name,
//       employee.email,
//       formatDateToDDMMYYYY(employee.date), // Search the formatted date
//       employee.status,
//       formatTimeTo12Hour(employee.clockIn), // Search the formatted time
//       formatTimeTo12Hour(employee.clockOut), // Search the formatted time
//       employee.late,
//       employee.earlyLeaving,
//       employee.totalWork,
//     ];
 
//     // Check if any field contains the search term
//     return searchableFields.some(field =>
//       String(field ?? '').toLowerCase().includes(searchTermLower)
//     );
//   });
 
 
//   // Reset to page 1 when filters change for better UX
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, entriesPerPage]);
 
 
//   const totalPages = Math.ceil(filteredData.length / entriesPerPage)
//   const startIndex = (currentPage - 1) * entriesPerPage
//   const endIndex = startIndex + entriesPerPage
//   const currentData = filteredData.slice(startIndex, endIndex)
 
//   const handlePageChange = (page) => {
//     setCurrentPage(page)
//   }
 
//   // --- STYLES ---
//   const containerStyle = {
//     padding: "24px",
//     backgroundColor: "#ffffff",
//     minHeight: "100vh",
//     fontFamily: "Arial, sans-serif",
//   }
 
//   const headerStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "24px",
//     paddingBottom: "16px",
//     borderBottom: "2px solid #e5e7eb",
//   }
 
//   const titleStyle = {
//     fontSize: "24px",
//     fontWeight: "600",
//     color: "#1f2937",
//     margin: 0,
//   }
 
//   const controlsContainerStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: '20px',
//     flexWrap: "wrap",
//     gap: '16px'
//   }
 
//   const controlGroupStyle = {
//     display: "flex",
//     alignItems: "center",
//     gap: '12px',
//     flexWrap: "wrap",
//   }
 
//   const searchInputContainerStyle = {
//     position: 'relative',
//     display: 'flex',
//     alignItems: 'center',
//   }
 
//   const searchIconStyle = {
//     position: 'absolute',
//     left: '10px',
//     color: '#9ca3af',
//     width: '16px',
//     height: '16px',
//   }
 
//   const inputStyle = {
//     border: "1px solid #d1d5db",
//     borderRadius: "6px",
//     padding: "8px 12px",
//     fontSize: "14px",
//     outline: "none",
//     transition: "border-color 0.2s ease",
//   };
 
//   const searchInputStyle = {
//     ...inputStyle,
//     paddingLeft: '32px',
//     width: '250px', // A bit wider for general search
//   }
 
//   const tableContainerStyle = {
//     overflowX: "auto",
//     border: "1px solid #e5e7eb",
//     borderRadius: "12px",
//     backgroundColor: "white",
//     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
//   }
 
//   const tableStyle = {
//     width: "100%",
//     borderCollapse: "collapse",
//   }
 
//   const thStyle = {
//     padding: "16px",
//     textAlign: "left",
//     fontSize: "12px",
//     fontWeight: "600",
//     color: "#6b7280",
//     textTransform: "uppercase",
//     letterSpacing: "0.05em",
//     backgroundColor: "#f3f4f6",
//     borderBottom: "1px solid #e5e7eb",
//   }
 
//   const tdStyle = {
//     padding: "16px",
//     borderBottom: "1px solid #f3f4f6",
//     fontSize: "14px",
//   }
 
//   const nameStyle = {
//     fontWeight: "500",
//     color: "#1f2937",
//     marginBottom: "4px",
//   }
 
//   const emailStyle = {
//     color: "#3b82f6",
//     fontSize: "13px",
//   }
 
//   const statusBadgeStyle = {
//     display: "inline-flex",
//     padding: "4px 12px",
//     fontSize: "12px",
//     fontWeight: "600",
//     borderRadius: "20px",
//     backgroundColor: "#d1fae5",
//     color: "#065f46",
//   }
 
//   const timeStyle = {
//     color: "#3b82f6",
//     fontWeight: "500",
//   }
 
//   const paginationStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: "24px",
//     padding: "16px",
//     backgroundColor: "#f9fafb",
//     borderRadius: "8px",
//   }
 
//   const pageButtonStyle = {
//     padding: "8px 12px",
//     fontSize: "14px",
//     border: "1px solid #d1d5db",
//     borderRadius: "6px",
//     backgroundColor: "white",
//     cursor: "pointer",
//     margin: "0 2px",
//     transition: "all 0.2s ease",
//   }
 
//   const activePageStyle = {
//     backgroundColor: "#673ab7",
//     color: "white",
//     borderColor: "#673ab7",
//   }
 
//   const disabledButtonStyle = {
//     opacity: 0.5,
//     cursor: "not-allowed",
//   }
 
//   const solidPurpleButtonStyle = {
//     ...pageButtonStyle,
//     backgroundColor: '#673ab7',
//     color: 'white',
//     border: '1px solid #673ab7',
//   }
 
//   return (
//     <div style={containerStyle}>
//       <div style={headerStyle}>
//         <h1 style={titleStyle}>Daily Attendance Report</h1>
//       </div>
 
//       <div style={controlsContainerStyle}>
//         <div style={controlGroupStyle}>
//           <span style={{ fontSize: "14px", color: "#6b7280" }}>Show</span>
//           <select
//             value={entriesPerPage}
//             onChange={(e) => setEntriesPerPage(Number(e.target.value))}
//             style={inputStyle}
//           >
//             <option value={10}>10</option>
//             <option value={25}>25</option>
//             <option value={50}>50</option>
//             <option value={100}>100</option>
//           </select>
//           <span style={{ fontSize: "14px", color: "#6b7280" }}>entries</span>
//         </div>
 
//         <div style={controlGroupStyle}>
//           <div style={searchInputContainerStyle}>
//             <svg style={searchIconStyle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
//             </svg>
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Search" // Updated placeholder
//               style={searchInputStyle}
//               onFocus={(e) => (e.target.style.borderColor = "#673ab7")}
//               onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
//             />
//           </div>
//         </div>
//       </div>
 
 
//       <div style={tableContainerStyle}>
//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th style={thStyle}>Sr. No.</th>
//               <th style={thStyle}>Employee</th>
//               <th style={thStyle}>Date</th>
//               <th style={thStyle}>Status</th>
//               <th style={thStyle}>Punch In</th>
//               <th style={thStyle}>In Location</th>
//               <th style={thStyle}>Punch Out</th>
//               <th style={thStyle}>Out Location</th>
//               <th style={thStyle}>Late</th>
//               <th style={thStyle}>Half Day</th>
//               <th style={thStyle}>Total Work</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentData.map((employee, index) => (
//               <tr
//                 key={employee.id}
//                 onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9fafb")}
//                 onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
//               >
//                 <td style={tdStyle}>{startIndex + index + 1}</td>
//                 <td style={tdStyle}>
//                   <div style={{ display: "flex", alignItems: "center" }}>
//                     <div>
//                       <div style={nameStyle}>{employee.name}</div>
//                       {employee.email && <div style={emailStyle}>{employee.email}</div>}
//                     </div>
//                   </div>
//                 </td>
//                 <td style={tdStyle}>{formatDateToDDMMYYYY(employee.date)}</td>
//                 <td style={tdStyle}>
//                   <span style={statusBadgeStyle}>{employee.status}</span>
//                 </td>
//                 <td style={{ ...tdStyle, ...timeStyle }}>{formatTimeTo12Hour(employee.clockIn)}</td>
//                <td style={tdStyle}>
//   {employee.inLocation !== '--' ? (
//     <button
//       style={{
//         padding: "6px 12px",
//         backgroundColor: "#673ab7",
//         color: "white",
//         border: "none",
//         borderRadius: "6px",
//         cursor: "pointer",
//         fontSize: "12px",
//       }}
//       onClick={() => window.open(employee.inLocation, "_blank")}
//     >
//       Location
//     </button>
//   ) : '--'}
// </td>
//                 <td style={{ ...tdStyle, ...timeStyle }}>{formatTimeTo12Hour(employee.clockOut)}</td>
// <td style={tdStyle}>
//   {employee.outLocation !== '--' ? (
//     <button
//       style={{
//         padding: "6px 12px",
//         backgroundColor: "#673ab7",
//         color: "white",
//         border: "none",
//         borderRadius: "6px",
//         cursor: "pointer",
//         fontSize: "12px",
//       }}
//       onClick={() => window.open(employee.outLocation, "_blank")}
//     >
//       Location
//     </button>
//   ) : '--'}
// </td>
//                 <td style={{ ...tdStyle, ...timeStyle }}>{employee.late}</td>
//                 <td style={{ ...tdStyle, ...timeStyle }}>{employee.earlyLeaving}</td>
//                 <td style={{ ...tdStyle, ...timeStyle }}>{employee.totalWork}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
 
//       <div style={paginationStyle}>
//         <div style={{ fontSize: "14px", color: "#6b7280" }}>
//           Showing {filteredData.length > 0 ? startIndex + 1 : 0} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} records
//         </div>
 
//         <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             style={{
//               ...solidPurpleButtonStyle,
//               ...(currentPage === 1 ? disabledButtonStyle : {}),
//             }}
//           >
//             Previous
//           </button>
 
//           {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//             <button
//               key={page}
//               onClick={() => handlePageChange(page)}
//               style={{
//                 ...pageButtonStyle,
//                 ...(currentPage === page ? activePageStyle : {}),
//               }}
//             >
//               {page}
//             </button>
//           ))}
 
//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages || totalPages === 0}
//             style={{
//               ...solidPurpleButtonStyle,
//               ...(currentPage === totalPages || totalPages === 0 ? disabledButtonStyle : {}),
//             }}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }
 








// import { useState, useEffect } from "react"
// import axiosInstance from "../../utils/axiosInstance";
 
// export default function Attendance1({ onNavigate }) {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [entriesPerPage, setEntriesPerPage] = useState(10)
//   const [currentPage, setCurrentPage] = useState(1)
//   const [attendanceData, setAttendanceData] = useState([]);
 
// useEffect(() => {
//     const fetchAttendanceData = async () => {
//       try {
//         const response = await axiosInstance.get("api/attendance_overview/");
//        if (response.data.status === "success" && Array.isArray(response.data.data)) {
//   const formatted = response.data.data.map((item, index) => ({
//     id: index,
//     name: item.full_name,
//     email: item.email,
//     date: item.login_date,
//     clockIn: item.clock_in || '--',
//     clockOut: item.clock_out || '--',
//     inLocation: item.clock_in_google_maps_url || '--',
//     outLocation: item.clock_out_google_maps_url || '--',
//     late: item.late_mark || '--',
//     earlyLeaving: item.is_half_day || '--',
//     totalWork: item.total_work || '--',
//     avatar: item.avatar,
//     status: item.attendance_status,
//   }));
//   setAttendanceData(formatted);
// } else {
//   setAttendanceData([]); // fallback to empty array
// }

//       } catch (error) {
//         console.error("Error fetching attendance data:", error);
//       }
//     };
 
//     fetchAttendanceData();
//   }, []);
 
//   // --- NEW: Function to format date to dd/mm/yyyy ---
//   const formatDateToDDMMYYYY = (dateString) => {
//     if (!dateString) return '--';
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) return '--';
 
//       const day = String(date.getDate()).padStart(2, '0');
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const year = date.getFullYear();
//       return `${day}/${month}/${year}`;
//     } catch (error) {
//       return '--';
//     }
//   };
 
//   const formatTimeTo12Hour = (timeString) => {
//     if (!timeString || typeof timeString !== 'string') {
//       return "--";
//     }
//     const parts = timeString.split(':');
//     let hours = parseInt(parts[0], 10);
//     let minutes = parseInt(parts[1], 10);
 
//     if (isNaN(hours) || isNaN(minutes)) {
//       return "--";
//     }
 
//     const ampm = hours >= 12 ? 'PM' : 'AM';
//     hours = hours % 12;
//     hours = hours ? hours : 12;
 
//     const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
//     const formattedHours = hours < 10 ? '0' + hours : hours;
 
//     return `${formattedHours}:${formattedMinutes} ${ampm}`;
//   };
 
//   // --- MODIFIED: Search logic now checks all relevant columns ---
//   const filteredData = attendanceData.filter(employee => {
//     if (!searchTerm) return true; // If search is empty, show all results
 
//     const searchTermLower = searchTerm.toLowerCase();
 
//     // An array of all values to search through for each employee
//     const searchableFields = [
//       employee.name,
//       employee.email,
//       formatDateToDDMMYYYY(employee.date), // Search the formatted date
//       employee.status,
//       formatTimeTo12Hour(employee.clockIn), // Search the formatted time
//       formatTimeTo12Hour(employee.clockOut), // Search the formatted time
//       employee.late,
//       employee.earlyLeaving,
//       employee.totalWork,
//     ];
 
//     // Check if any field contains the search term
//     return searchableFields.some(field =>
//       String(field ?? '').toLowerCase().includes(searchTermLower)
//     );
//   });
 
 
//   // Reset to page 1 when filters change for better UX
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, entriesPerPage]);
 
 
//   const totalPages = Math.ceil(filteredData.length / entriesPerPage)
//   const startIndex = (currentPage - 1) * entriesPerPage
//   const endIndex = startIndex + entriesPerPage
//   const currentData = filteredData.slice(startIndex, endIndex)
 
//   const handlePageChange = (page) => {
//     setCurrentPage(page)
//   }
 
//   // --- STYLES ---
//   const containerStyle = {
//     padding: "24px",
//     backgroundColor: "#ffffff",
//     minHeight: "100vh",
//     fontFamily: "Arial, sans-serif",
//   }
 
//   const headerStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "24px",
//     paddingBottom: "16px",
//     borderBottom: "2px solid #e5e7eb",
//   }
 
//   const titleStyle = {
//     fontSize: "24px",
//     fontWeight: "600",
//     color: "#1f2937",
//     margin: 0,
//   }
 
//   const controlsContainerStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: '20px',
//     flexWrap: "wrap",
//     gap: '16px'
//   }
 
//   const controlGroupStyle = {
//     display: "flex",
//     alignItems: "center",
//     gap: '12px',
//     flexWrap: "wrap",
//   }
 
//   const searchInputContainerStyle = {
//     position: 'relative',
//     display: 'flex',
//     alignItems: 'center',
//   }
 
//   const searchIconStyle = {
//     position: 'absolute',
//     left: '10px',
//     color: '#9ca3af',
//     width: '16px',
//     height: '16px',
//   }
 
//   const inputStyle = {
//     border: "1px solid #d1d5db",
//     borderRadius: "6px",
//     padding: "8px 12px",
//     fontSize: "14px",
//     outline: "none",
//     transition: "border-color 0.2s ease",
//   };
 
//   const searchInputStyle = {
//     ...inputStyle,
//     paddingLeft: '32px',
//     width: '250px', // A bit wider for general search
//   }
 
//   const tableContainerStyle = {
//     overflowX: "auto",
//     border: "1px solid #e5e7eb",
//     borderRadius: "12px",
//     backgroundColor: "white",
//     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
//   }
 
//   const tableStyle = {
//     width: "100%",
//     borderCollapse: "collapse",
//   }
 
//   const thStyle = {
//     padding: "16px",
//     textAlign: "left",
//     fontSize: "12px",
//     fontWeight: "600",
//     color: "#6b7280",
//     textTransform: "uppercase",
//     letterSpacing: "0.05em",
//     backgroundColor: "#f3f4f6",
//     borderBottom: "1px solid #e5e7eb",
//   }
 
//   const tdStyle = {
//     padding: "16px",
//     borderBottom: "1px solid #f3f4f6",
//     fontSize: "14px",
//   }
 
//   const nameStyle = {
//     fontWeight: "500",
//     color: "#1f2937",
//     marginBottom: "4px",
//   }
 
//   const emailStyle = {
//     color: "#3b82f6",
//     fontSize: "13px",
//   }
 
//   const statusBadgeStyle = {
//     display: "inline-flex",
//     padding: "4px 12px",
//     fontSize: "12px",
//     fontWeight: "600",
//     borderRadius: "20px",
//     backgroundColor: "#d1fae5",
//     color: "#065f46",
//   }
 
//   const timeStyle = {
//     color: "#3b82f6",
//     fontWeight: "500",
//   }
 
//   const paginationStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: "24px",
//     padding: "16px",
//     backgroundColor: "#f9fafb",
//     borderRadius: "8px",
//   }
 
//   const pageButtonStyle = {
//     padding: "8px 12px",
//     fontSize: "14px",
//     border: "1px solid #d1d5db",
//     borderRadius: "6px",
//     backgroundColor: "white",
//     cursor: "pointer",
//     margin: "0 2px",
//     transition: "all 0.2s ease",
//   }
 
//   const activePageStyle = {
//     backgroundColor: "#673ab7",
//     color: "white",
//     borderColor: "#673ab7",
//   }
 
//   const disabledButtonStyle = {
//     opacity: 0.5,
//     cursor: "not-allowed",
//   }
 
//   const solidPurpleButtonStyle = {
//     ...pageButtonStyle,
//     backgroundColor: '#673ab7',
//     color: 'white',
//     border: '1px solid #673ab7',
//   }
 
//   return (
//     <div style={containerStyle}>
//       <div style={headerStyle}>
//         <h1 style={titleStyle}>Daily Attendance Report</h1>
//       </div>
 
//       <div style={controlsContainerStyle}>
//         <div style={controlGroupStyle}>
//           <span style={{ fontSize: "14px", color: "#6b7280" }}>Show</span>
//           <select
//             value={entriesPerPage}
//             onChange={(e) => setEntriesPerPage(Number(e.target.value))}
//             style={inputStyle}
//           >
//             <option value={10}>10</option>
//             <option value={25}>25</option>
//             <option value={50}>50</option>
//             <option value={100}>100</option>
//           </select>
//           <span style={{ fontSize: "14px", color: "#6b7280" }}>entries</span>
//         </div>
 
//         <div style={controlGroupStyle}>
//           <div style={searchInputContainerStyle}>
//             <svg style={searchIconStyle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
//             </svg>
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Search" // Updated placeholder
//               style={searchInputStyle}
//               onFocus={(e) => (e.target.style.borderColor = "#673ab7")}
//               onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
//             />
//           </div>
//         </div>
//       </div>
 
 
//       <div style={tableContainerStyle}>
//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th style={thStyle}>Sr. No.</th>
//               <th style={thStyle}>Employee</th>
//               <th style={thStyle}>Date</th>
//               <th style={thStyle}>Status</th>
//               <th style={thStyle}>Punch In</th>
//               <th style={thStyle}>In Location</th>
//               <th style={thStyle}>Punch Out</th>
//               <th style={thStyle}>Out Location</th>
//               <th style={thStyle}>Late</th>
//                <th style={thStyle}>Early Mark</th>
//               <th style={thStyle}>Half Day</th>
//               <th style={thStyle}>Total Work</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentData.map((employee, index) => (
//               <tr
//                 key={employee.id}
//                 onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9fafb")}
//                 onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
//               >
//                 <td style={tdStyle}>{startIndex + index + 1}</td>
//                 <td style={tdStyle}>
//                   <div style={{ display: "flex", alignItems: "center" }}>
//                     <div>
//                       <div style={nameStyle}>{employee.name}</div>
//                       {employee.email && <div style={emailStyle}>{employee.email}</div>}
//                     </div>
//                   </div>
//                 </td>
//                 <td style={tdStyle}>{formatDateToDDMMYYYY(employee.date)}</td>
//                 <td style={tdStyle}>
//                   <span style={statusBadgeStyle}>{employee.status}</span>
//                 </td>
//                 <td style={{ ...tdStyle, ...timeStyle }}>{formatTimeTo12Hour(employee.clockIn)}</td>
//                 {/* MODIFIED: Use clockInGoogleMapsUrl */}
//                                {/* MODIFIED: Use inLocation */}
//                 <td style={tdStyle}>
//                   {employee.inLocation && employee.inLocation !== '--' ? ( // Check for both existence and non-default value
//                     <button
//                       style={{
//                         padding: "6px 12px",
//                         backgroundColor: "#673ab7",
//                         color: "white",
//                         border: "none",
//                         borderRadius: "6px",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                       }}
//                       onClick={() => window.open(employee.inLocation, "_blank")}
//                     >
//                       Location
//                     </button>
//                   ) : '--'}
//                 </td>
//                 <td style={{ ...tdStyle, ...timeStyle }}>{formatTimeTo12Hour(employee.clockOut)}</td>
//                 {/* MODIFIED: Use outLocation */}
//                 <td style={tdStyle}>
//                   {employee.outLocation && employee.outLocation !== '--' ? ( // Check for both existence and non-default value
//                     <button
//                       style={{
//                         padding: "6px 12px",
//                         backgroundColor: "#673ab7",
//                         color: "white",
//                         border: "none",
//                         borderRadius: "6px",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                       }}
//                       onClick={() => window.open(employee.outLocation, "_blank")}
//                     >
//                       Location
//                     </button>
//                   ) : '--'}
//                 </td>
//                 <td style={{ ...tdStyle, ...timeStyle }}>{formatTimeTo12Hour(employee.clockOut)}</td>
//                 {/* MODIFIED: Use clockOutGoogleMapsUrl */}
//                 <td style={tdStyle}>
//                   {employee.clockOutGoogleMapsUrl ? (
//                     <button
//                       style={{
//                         padding: "6px 12px",
//                         backgroundColor: "#673ab7",
//                         color: "white",
//                         border: "none",
//                         borderRadius: "6px",
//                         cursor: "pointer",
//                         fontSize: "12px",
//                       }}
//                       onClick={() => window.open(employee.clockOutGoogleMapsUrl, "_blank")}
//                     >
//                       Location
//                     </button>
//                   ) : '--'}
//                 </td>
//                 <td style={{ ...tdStyle, ...timeStyle }}>{employee.late}</td>
//                 <td style={{ ...tdStyle, ...timeStyle }}>{employee.earlyLeaving}</td>
//                 <td style={{ ...tdStyle, ...timeStyle }}>{employee.totalWork}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
 
//       <div style={paginationStyle}>
//         <div style={{ fontSize: "14px", color: "#6b7280" }}>
//           Showing {filteredData.length > 0 ? startIndex + 1 : 0} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} records
//         </div>
 
//         <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             style={{
//               ...solidPurpleButtonStyle,
//               ...(currentPage === 1 ? disabledButtonStyle : {}),
//             }}
//           >
//             Previous
//           </button>
 
//           {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//             <button
//               key={page}
//               onClick={() => handlePageChange(page)}
//               style={{
//                 ...pageButtonStyle,
//                 ...(currentPage === page ? activePageStyle : {}),
//               }}
//             >
//               {page}
//             </button>
//           ))}
 
//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages || totalPages === 0}
//             style={{
//               ...solidPurpleButtonStyle,
//               ...(currentPage === totalPages || totalPages === 0 ? disabledButtonStyle : {}),
//             }}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }















// import { useState, useEffect } from "react"
// import axiosInstance from "../../utils/axiosInstance";
 
// export default function Attendance1({ onNavigate }) {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [entriesPerPage, setEntriesPerPage] = useState(10)
//   const [currentPage, setCurrentPage] = useState(1)
//   const [attendanceData, setAttendanceData] = useState([]);
 
//   useEffect(() => {
//     const fetchAttendanceData = async () => {
//       try {
//         const response = await axiosInstance.get("api/attendance_overview/");
//         if (response.data.status === "success" && Array.isArray(response.data.data)) {
//           const formatted = response.data.data.map((item, index) => ({
//             id: index,
//             name: item.full_name,
//             email: item.email,
//             date: item.login_date,
//             clockIn: item.clock_in || '--',
//             clockOut: item.clock_out || '--',
//             inLocation: item.clock_in_google_maps_url || '--',
//             outLocation: item.clock_out_google_maps_url || '--',
//             late: item.late_mark === 'Y' ? 'Yes' : 'No', // Map 'Y' to 'Yes', otherwise 'No'
//             earlyLeaving: item.early_mark === 'Y' ? 'Yes' : 'No', // Map 'Y' to 'Yes', otherwise 'No'
//             halfDay: item.is_half_day === 'Y' ? 'Yes' : 'No', // Map 'Y' to 'Yes', otherwise 'No'
//             totalWork: item.total_work || '--',
//             avatar: item.avatar,
//             status: item.attendance_status,
//           }));
//           setAttendanceData(formatted);
//         } else {
//           setAttendanceData([]); // fallback to empty array
//         }
//       } catch (error) {
//         console.error("Error fetching attendance data:", error);
//       }
//     };
 
//     fetchAttendanceData();
//   }, []);
 
//   // --- NEW: Function to format date to dd/mm/yyyy ---
//   const formatDateToDDMMYYYY = (dateString) => {
//     if (!dateString) return '--';
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) return '--';
 
//       const day = String(date.getDate()).padStart(2, '0');
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const year = date.getFullYear();
//       return `${day}/${month}/${year}`;
//     } catch (error) {
//       return '--';
//     }
//   };
 
//   const formatTimeTo12Hour = (timeString) => {
//     if (!timeString || typeof timeString !== 'string' || timeString === '--') {
//       return "--";
//     }
//     const parts = timeString.split(':');
//     let hours = parseInt(parts[0], 10);
//     let minutes = parseInt(parts[1], 10);
 
//     if (isNaN(hours) || isNaN(minutes)) {
//       return "--";
//     }
 
//     const ampm = hours >= 12 ? 'PM' : 'AM';
//     hours = hours % 12;
//     hours = hours ? hours : 12;
 
//     const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
//     // Removed leading zero for hours if it's 1-9 to match common 12-hour format (e.g., 9:00 AM instead of 09:00 AM)
//     // If you prefer '09:00 AM', change `hours` to `String(hours).padStart(2, '0')`
//     return `${hours}:${formattedMinutes} ${ampm}`;
//   };
 
//   // --- MODIFIED: Search logic now checks all relevant columns ---
//   const filteredData = attendanceData.filter(employee => {
//     if (!searchTerm) return true; // If search is empty, show all results
 
//     const searchTermLower = searchTerm.toLowerCase();
 
//     // An array of all values to search through for each employee
//     const searchableFields = [
//       employee.name,
//       employee.email,
//       formatDateToDDMMYYYY(employee.date), // Search the formatted date
//       employee.status,
//       formatTimeTo12Hour(employee.clockIn), // Search the formatted time
//       formatTimeTo12Hour(employee.clockOut), // Search the formatted time
//       employee.late,
//       employee.earlyLeaving,
//       employee.halfDay,
//       employee.totalWork,
//     ];
 
//     // Check if any field contains the search term
//     return searchableFields.some(field =>
//       String(field ?? '').toLowerCase().includes(searchTermLower)
//     );
//   });
 
 
//   // Reset to page 1 when filters change for better UX
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, entriesPerPage]);
 
 
//   const totalPages = Math.ceil(filteredData.length / entriesPerPage)
//   const startIndex = (currentPage - 1) * entriesPerPage
//   const endIndex = startIndex + entriesPerPage
//   const currentData = filteredData.slice(startIndex, endIndex)
 
//   const handlePageChange = (page) => {
//     setCurrentPage(page)
//   }
 
//   // --- STYLES ---
//   const containerStyle = {
//     padding: "24px",
//     backgroundColor: "#ffffff",
//     minHeight: "100vh",
//     fontFamily: "Arial, sans-serif",
//   }
 
//   const headerStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "24px",
//     paddingBottom: "16px",
//     borderBottom: "2px solid #e5e7eb",
//   }
 
//   const titleStyle = {
//     fontSize: "24px",
//     fontWeight: "600",
//     color: "#1f2937",
//     margin: 0,
//   }
 
//   const controlsContainerStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: '20px',
//     flexWrap: "wrap",
//     gap: '16px'
//   }
 
//   const controlGroupStyle = {
//     display: "flex",
//     alignItems: "center",
//     gap: '12px',
//     flexWrap: "wrap",
//   }
 
//   const searchInputContainerStyle = {
//     position: 'relative',
//     display: 'flex',
//     alignItems: 'center',
//   }
 
//   const searchIconStyle = {
//     position: 'absolute',
//     left: '10px',
//     color: '#9ca3af',
//     width: '16px',
//     height: '16px',
//   }
 
//   const inputStyle = {
//     border: "1px solid #d1d5db",
//     borderRadius: "6px",
//     padding: "8px 12px",
//     fontSize: "14px",
//     outline: "none",
//     transition: "border-color 0.2s ease",
//   };
 
//   const searchInputStyle = {
//     ...inputStyle,
//     paddingLeft: '32px',
//     width: '250px', // A bit wider for general search
//   }
 
//   const tableContainerStyle = {
//     overflowX: "auto",
//     border: "1px solid #e5e7eb",
//     borderRadius: "12px",
//     backgroundColor: "white",
//     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
//   }
 
//   const tableStyle = {
//     width: "100%",
//     borderCollapse: "collapse",
//   }
 
//   const thStyle = {
//     padding: "16px",
//     textAlign: "left",
//     fontSize: "12px",
//     fontWeight: "600",
//     color: "#6b7280",
//     textTransform: "uppercase",
//     letterSpacing: "0.05em",
//     backgroundColor: "#f3f4f6",
//     borderBottom: "1px solid #e5e7eb",
//   }
 
//   const tdStyle = {
//     padding: "16px",
//     borderBottom: "1px solid #f3f4f6",
//     fontSize: "14px",
//   }
 
//   const nameStyle = {
//     fontWeight: "500",
//     color: "#1f2937",
//     marginBottom: "4px",
//   }
 
//   const emailStyle = {
//     color: "#3b82f6",
//     fontSize: "13px",
//   }
 
//   const statusBadgeStyle = {
//     display: "inline-flex",
//     padding: "4px 12px",
//     fontSize: "12px",
//     fontWeight: "600",
//     borderRadius: "20px",
//     backgroundColor: "#d1fae5",
//     color: "#065f46",
//   }

//   const statusBadgePresentStyle = {
//     ...statusBadgeStyle,
//     backgroundColor: "#d1fae5", // Green for Present
//     color: "#065f46",
//   };
  
//   const statusBadgeAbsentStyle = {
//     ...statusBadgeStyle,
//     backgroundColor: "#fee2e2", // Red for Absent
//     color: "#ef4444",
//   };
  
//   const statusBadgeHalfDayStyle = {
//     ...statusBadgeStyle,
//     backgroundColor: "#fef9c3", // Yellow for Half Day (if you want to show a badge for half day status as well)
//     color: "#f59e0b",
//   };
 
//   const timeStyle = {
//     color: "#3b82f6",
//     fontWeight: "500",
//   }
 
//   const paginationStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: "24px",
//     padding: "16px",
//     backgroundColor: "#f9fafb",
//     borderRadius: "8px",
//   }
 
//   const pageButtonStyle = {
//     padding: "8px 12px",
//     fontSize: "14px",
//     border: "1px solid #d1d5db",
//     borderRadius: "6px",
//     backgroundColor: "white",
//     cursor: "pointer",
//     margin: "0 2px",
//     transition: "all 0.2s ease",
//   }
 
//   const activePageStyle = {
//     backgroundColor: "#673ab7",
//     color: "white",
//     borderColor: "#673ab7",
//   }
 
//   const disabledButtonStyle = {
//     opacity: 0.5,
//     cursor: "not-allowed",
//   }
 
//   const solidPurpleButtonStyle = {
//     ...pageButtonStyle,
//     backgroundColor: '#673ab7',
//     color: 'white',
//     border: '1px solid #673ab7',
//   }
 
//   return (
//     <div style={containerStyle}>
//       <div style={headerStyle}>
//         <h1 style={titleStyle}>Daily Attendance Report</h1>
//       </div>
 
//       <div style={controlsContainerStyle}>
//         <div style={controlGroupStyle}>
//           <span style={{ fontSize: "14px", color: "#6b7280" }}>Show</span>
//           <select
//             value={entriesPerPage}
//             onChange={(e) => setEntriesPerPage(Number(e.target.value))}
//             style={inputStyle}
//           >
//             <option value={10}>10</option>
//             <option value={25}>25</option>
//             <option value={50}>50</option>
//             <option value={100}>100</option>
//           </select>
//           <span style={{ fontSize: "14px", color: "#6b7280" }}>entries</span>
//         </div>
 
//         <div style={controlGroupStyle}>
//           <div style={searchInputContainerStyle}>
//             <svg style={searchIconStyle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
//             </svg>
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Search all columns..."
//               style={searchInputStyle}
//               onFocus={(e) => (e.target.style.borderColor = "#673ab7")}
//               onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
//             />
//           </div>
//         </div>
//       </div>
 
 
//       <div style={tableContainerStyle}>
//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th style={thStyle}>Sr. No.</th>
//               <th style={thStyle}>Employee</th>
//               <th style={thStyle}>Date</th>
//               <th style={thStyle}>Status</th>
//               <th style={thStyle}>Punch In</th>
//               <th style={thStyle}>In Location</th>
//               <th style={thStyle}>Punch Out</th>
//               <th style={thStyle}>Out Location</th>
//               <th style={thStyle}>Late</th>
//               <th style={thStyle}>Early Leaving</th>
//               <th style={thStyle}>Half Day</th>
//               <th style={thStyle}>Total Work</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentData.length > 0 ? (
//               currentData.map((employee, index) => (
//                 <tr
//                   key={employee.id}
//                   onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9fafb")}
//                   onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
//                 >
//                   <td style={tdStyle}>{startIndex + index + 1}</td>
//                   <td style={tdStyle}>
//                     <div style={{ display: "flex", alignItems: "center" }}>
//                       {/* Optional: Add avatar image if `employee.avatar` is a full URL or path */}
//                       {/* {employee.avatar && (
//                         <img 
//                           src={employee.avatar} 
//                           alt={employee.name} 
//                           style={{ width: '32px', height: '32px', borderRadius: '50%', marginRight: '8px' }} 
//                         />
//                       )} */}
//                       <div>
//                         <div style={nameStyle}>{employee.name}</div>
//                         {employee.email && <div style={emailStyle}>{employee.email}</div>}
//                       </div>
//                     </div>
//                   </td>
//                   <td style={tdStyle}>{formatDateToDDMMYYYY(employee.date)}</td>
//                   <td style={tdStyle}>
//                     <span 
//                       style={
//                         employee.status === 'Present' ? statusBadgePresentStyle : 
//                         employee.status === 'Absent' ? statusBadgeAbsentStyle : 
//                         statusBadgeStyle // Default for other statuses
//                       }
//                     >
//                       {employee.status}
//                     </span>
//                   </td>
//                   <td style={{ ...tdStyle, ...timeStyle }}>{formatTimeTo12Hour(employee.clockIn)}</td>
//                   <td style={tdStyle}>
//                     {employee.inLocation && employee.inLocation !== '--' ? (
//                       <button
//                         style={{
//                           padding: "6px 12px",
//                           backgroundColor: "#673ab7",
//                           color: "white",
//                           border: "none",
//                           borderRadius: "6px",
//                           cursor: "pointer",
//                           fontSize: "12px",
//                         }}
//                         onClick={() => window.open(employee.inLocation, "_blank")}
//                       >
//                         Location
//                       </button>
//                     ) : '--'}
//                   </td>
//                   <td style={{ ...tdStyle, ...timeStyle }}>{formatTimeTo12Hour(employee.clockOut)}</td>
//                   <td style={tdStyle}>
//                     {employee.outLocation && employee.outLocation !== '--' ? (
//                       <button
//                         style={{
//                           padding: "6px 12px",
//                           backgroundColor: "#673ab7",
//                           color: "white",
//                           border: "none",
//                           borderRadius: "6px",
//                           cursor: "pointer",
//                           fontSize: "12px",
//                         }}
//                         onClick={() => window.open(employee.outLocation, "_blank")}
//                       >
//                         Location
//                       </button>
//                     ) : '--'}
//                   </td>
//                   <td style={tdStyle}>{employee.late}</td>
//                   <td style={tdStyle}>{employee.earlyLeaving}</td>
//                   <td style={tdStyle}>{employee.halfDay}</td> {/* Corrected field name */}
//                   <td style={tdStyle}>{employee.totalWork}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="12" style={{ ...tdStyle, textAlign: 'center', color: '#6b7280' }}>
//                   No attendance records found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
 
//       <div style={paginationStyle}>
//         <div style={{ fontSize: "14px", color: "#6b7280" }}>
//           Showing {filteredData.length > 0 ? startIndex + 1 : 0} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} records
//         </div>
 
//         <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             style={{
//               ...solidPurpleButtonStyle,
//               ...(currentPage === 1 ? disabledButtonStyle : {}),
//             }}
//           >
//             Previous
//           </button>
 
//           {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//             <button
//               key={page}
//               onClick={() => handlePageChange(page)}
//               style={{
//                 ...pageButtonStyle,
//                 ...(currentPage === page ? activePageStyle : {}),
//               }}
//             >
//               {page}
//             </button>
//           ))}
 
//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages || totalPages === 0}
//             style={{
//               ...solidPurpleButtonStyle,
//               ...(currentPage === totalPages || totalPages === 0 ? disabledButtonStyle : {}),
//             }}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }













// import { useState, useEffect } from "react"
// import axiosInstance from "../../utils/axiosInstance";
 
// export default function Attendance1({ onNavigate }) {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [entriesPerPage, setEntriesPerPage] = useState(10)
//   const [currentPage, setCurrentPage] = useState(1)
//   const [attendanceData, setAttendanceData] = useState([]);
 
//   useEffect(() => {
//     const fetchAttendanceData = async () => {
//       try {
//         const response = await axiosInstance.get("api/attendance_overview/");
//         if (response.data.status === "success" && Array.isArray(response.data.data)) {
//           const formatted = response.data.data.map((item, index) => ({
//             id: index,
//             name: item.full_name,
//             email: item.email,
//             date: item.login_date,
//             clockIn: item.clock_in || '--',
//             clockOut: item.clock_out || '--',
//             inLocation: item.clock_in_google_maps_url || '--',
//             outLocation: item.clock_out_google_maps_url || '--',
//             late: item.late_mark === 'Y' ? 'Yes' : 'No',
//             earlyLeaving: item.early_mark === 'Y' ? 'Yes' : 'No',
//             halfDay: item.is_half_day === 'Y' ? 'Yes' : 'No',
//             totalWork: item.total_work || '--',
//             avatar: item.avatar,
//             status: item.attendance_status,
//           }));
//           setAttendanceData(formatted);
//         } else {
//           setAttendanceData([]);
//         }
//       } catch (error) { // CORRECTED LINE: Removed the '=>'
//         console.error("Error fetching attendance data:", error);
//       }
//     };
 
//     fetchAttendanceData();
//   }, []);
 
//   // --- Function to format date to dd/mm/yyyy ---
//   const formatDateToDDMMYYYY = (dateString) => {
//     if (!dateString) return '--';
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) return '--';
 
//       const day = String(date.getDate()).padStart(2, '0');
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const year = date.getFullYear();
//       return `${day}/${month}/${year}`;
//     } catch (error) {
//       return '--';
//     }
//   };
 
//   // --- Function to format time to 12-hour format ---
//   const formatTimeTo12Hour = (timeString) => {
//     if (!timeString || typeof timeString !== 'string' || timeString === '--') {
//       return "--";
//     }
//     const parts = timeString.split(':');
//     let hours = parseInt(parts[0], 10);
//     let minutes = parseInt(parts[1], 10);
 
//     if (isNaN(hours) || isNaN(minutes)) {
//       return "--";
//     }
 
//     const ampm = hours >= 12 ? 'PM' : 'AM';
//     hours = hours % 12;
//     hours = hours ? hours : 12;
 
//     const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
//     return `${hours}:${formattedMinutes} ${ampm}`;
//   };
 
//   // --- Search logic checks all relevant columns ---
//   const filteredData = attendanceData.filter(employee => {
//     if (!searchTerm) return true;
 
//     const searchTermLower = searchTerm.toLowerCase();
 
//     const searchableFields = [
//       employee.name,
//       employee.email,
//       formatDateToDDMMYYYY(employee.date),
//       employee.status,
//       formatTimeTo12Hour(employee.clockIn),
//       formatTimeTo12Hour(employee.clockOut),
//       employee.late,
//       employee.earlyLeaving,
//       employee.halfDay,
//       employee.totalWork,
//     ];
 
//     return searchableFields.some(field =>
//       String(field ?? '').toLowerCase().includes(searchTermLower)
//     );
//   });
 
//   // Reset to page 1 when filters change for better UX
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchTerm, entriesPerPage]);
 
//   const totalPages = Math.ceil(filteredData.length / entriesPerPage);
//   const startIndex = (currentPage - 1) * entriesPerPage;
//   const endIndex = startIndex + entriesPerPage;
//   const currentData = filteredData.slice(startIndex, endIndex);
 
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };
 
//   // --- STYLES ---
//   const containerStyle = {
//     padding: "24px",
//     backgroundColor: "#ffffff",
//     minHeight: "100vh",
//     fontFamily: "Arial, sans-serif",
//   };
 
//   const headerStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "24px",
//     paddingBottom: "16px",
//     borderBottom: "2px solid #e5e7eb",
//   };
 
//   const titleStyle = {
//     fontSize: "24px",
//     fontWeight: "600",
//     color: "#8C257C",
//     margin: 0,
//   };
 
//   const controlsContainerStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: '20px',
//     flexWrap: "wrap",
//     gap: '16px',
//   };
 
//   const controlGroupStyle = {
//     display: "flex",
//     alignItems: "center",
//     gap: '12px',
//     flexWrap: "wrap",
//   };
 
//   const searchInputContainerStyle = {
//     position: 'relative',
//     display: 'flex',
//     alignItems: 'center',
//   };
 
//   const searchIconStyle = {
//     position: 'absolute',
//     left: '10px',
//     color: '#9ca3af',
//     width: '16px',
//     height: '16px',
//   };
 
//   const inputStyle = {
//     border: "1px solid #d1d5db",
//     borderRadius: "6px",
//     padding: "8px 12px",
//     fontSize: "14px",
//     outline: "none",
//     transition: "border-color 0.2s ease",
//   };
 
//   const searchInputStyle = {
//     ...inputStyle,
//     paddingLeft: '32px',
//     width: '250px',
//   };
 
//   const tableContainerStyle = {
//     overflowX: "auto",
//     border: "1px solid #e5e7eb",
//     borderRadius: "12px",
//     backgroundColor: "white",
//     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
//   };
 
//   const tableStyle = {
//     width: "100%",
//     borderCollapse: "collapse",
//   };
 
//   const thStyle = {
//     padding: "16px",
//     textAlign: "left",
//     fontSize: "12px",
//     fontWeight: "600",
//     color: "#ffffff", // White text for contrast
//     textTransform: "uppercase",
//     letterSpacing: "0.05em",
//     backgroundColor: "#8C257C", // Brand Purple
//     borderBottom: "1px solid #e5e7eb",
//   };
 
//   const tdStyle = {
//     padding: "16px",
//     borderBottom: "1px solid #f3f4f6",
//     fontSize: "14px",
//   };
 
//   const nameStyle = {
//     fontWeight: "500",
//     color: "#1f2937",
//     marginBottom: "4px",
//   };
 
//   const emailStyle = {
//     color: "#F58E35", // Brand Orange
//     fontSize: "13px",
//   };
 
//   const statusBadgeStyle = {
//     display: "inline-flex",
//     padding: "4px 12px",
//     fontSize: "12px",
//     fontWeight: "600",
//     borderRadius: "20px",
//   };
 
//   const statusBadgePresentStyle = {
//     ...statusBadgeStyle,
//     backgroundColor: "#d1fae5",
//     color: "#065f46",
//   };
 
//   const statusBadgeAbsentStyle = {
//     ...statusBadgeStyle,
//     backgroundColor: "#fee2e2",
//     color: "#ef4444",
//   };
 
//   const timeStyle = {
//     color: "#F58E35", // Brand Orange
//     fontWeight: "500",
//   };
 
//   const paginationContainerStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: "24px",
//     padding: "16px 0",
//   };
 
//   const pageButtonStyle = {
//     padding: "8px 12px",
//     fontSize: "14px",
//     border: "1px solid #d1d5db",
//     borderRadius: "6px",
//     backgroundColor: "white",
//     cursor: "pointer",
//     margin: "0 2px",
//     transition: "all 0.2s ease",
//   };
 
//   const activePageStyle = {
//     backgroundColor: "#8C257C", // Brand Purple
//     color: "white",
//     borderColor: "#8C257C",
//   };
 
//   const disabledButtonStyle = {
//     opacity: 0.5,
//     cursor: "not-allowed",
//   };
 
//   const solidPurpleButtonStyle = {
//     ...pageButtonStyle,
//     backgroundColor: '#8C257C', // Brand Purple
//     color: 'white',
//     border: '1px solid #8C257C',
//   };
 
//   return (
//     <div style={containerStyle}>
//       <div style={headerStyle}>
//         <h1 style={titleStyle}>Daily Attendance Report</h1>
//       </div>
 
//       <div style={controlsContainerStyle}>
//         <div style={controlGroupStyle}>
//           <span style={{ fontSize: "14px", color: "#6b7280" }}>Show</span>
//           <select
//             value={entriesPerPage}
//             onChange={(e) => setEntriesPerPage(Number(e.target.value))}
//             style={inputStyle}
//           >
//             <option value={10}>10</option>
//             <option value={25}>25</option>
//             <option value={50}>50</option>
//             <option value={100}>100</option>
//           </select>
//           <span style={{ fontSize: "14px", color: "#6b7280" }}>entries</span>
//         </div>
 
//         <div style={controlGroupStyle}>
//           <div style={searchInputContainerStyle}>
//             <svg style={searchIconStyle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
//             </svg>
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Search all columns..."
//               style={searchInputStyle}
//               onFocus={(e) => (e.target.style.borderColor = "#8C257C")}
//               onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
//             />
//           </div>
//         </div>
//       </div>
 
//       <div style={tableContainerStyle}>
//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th style={thStyle}>Sr. No.</th>
//               <th style={thStyle}>Employee</th>
//               <th style={thStyle}>Date</th>
//               <th style={thStyle}>Status</th>
//               <th style={thStyle}>Punch In</th>
//               <th style={thStyle}>In Location</th>
//               <th style={thStyle}>Punch Out</th>
//               <th style={thStyle}>Out Location</th>
//               <th style={thStyle}>Late</th>
//               <th style={thStyle}>Early Leaving</th>
//               <th style={thStyle}>Half Day</th>
//               <th style={thStyle}>Total Work</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentData.length > 0 ? (
//               currentData.map((employee, index) => (
//                 <tr
//                   key={employee.id}
//                   onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9fafb")}
//                   onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
//                 >
//                   <td style={tdStyle}>{startIndex + index + 1}</td>
//                   <td style={tdStyle}>
//                     <div style={{ display: "flex", alignItems: "center" }}>
//                       <div>
//                         <div style={nameStyle}>{employee.name}</div>
//                         {employee.email && <div style={emailStyle}>{employee.email}</div>}
//                       </div>
//                     </div>
//                   </td>
//                   <td style={tdStyle}>{formatDateToDDMMYYYY(employee.date)}</td>
//                   <td style={tdStyle}>
//                     <span
//                       style={
//                         employee.status === 'Present' ? statusBadgePresentStyle :
//                         employee.status === 'Absent' ? statusBadgeAbsentStyle :
//                         statusBadgeStyle
//                       }
//                     >
//                       {employee.status}
//                     </span>
//                   </td>
//                   <td style={{ ...tdStyle, ...timeStyle }}>{formatTimeTo12Hour(employee.clockIn)}</td>
//                   <td style={tdStyle}>
//                     {employee.inLocation && employee.inLocation !== '--' ? (
//                       <button
//                         style={{
//                           padding: "6px 12px",
//                           backgroundColor: "#8C257C",
//                           color: "white",
//                           border: "none",
//                           borderRadius: "6px",
//                           cursor: "pointer",
//                           fontSize: "12px",
//                         }}
//                         onClick={() => window.open(employee.inLocation, "_blank")}
//                       >
//                         Location
//                       </button>
//                     ) : '--'}
//                   </td>
//                   <td style={{ ...tdStyle, ...timeStyle }}>{formatTimeTo12Hour(employee.clockOut)}</td>
//                   <td style={tdStyle}>
//                     {employee.outLocation && employee.outLocation !== '--' ? (
//                       <button
//                         style={{
//                           padding: "6px 12px",
//                           backgroundColor: "#8C257C",
//                           color: "white",
//                           border: "none",
//                           borderRadius: "6px",
//                           cursor: "pointer",
//                           fontSize: "12px",
//                         }}
//                         onClick={() => window.open(employee.outLocation, "_blank")}
//                       >
//                         Location
//                       </button>
//                     ) : '--'}
//                   </td>
//                   <td style={tdStyle}>{employee.late}</td>
//                   <td style={tdStyle}>{employee.earlyLeaving}</td>
//                   <td style={tdStyle}>{employee.halfDay}</td>
//                   <td style={tdStyle}>{employee.totalWork}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="12" style={{ ...tdStyle, textAlign: 'center', color: '#6b7280' }}>
//                   No attendance records found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
 
//       <div style={paginationContainerStyle}>
//         <div style={{ fontSize: "14px", color: "#6b7280" }}>
//           Showing {filteredData.length > 0 ? startIndex + 1 : 0} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} records
//         </div>
 
//         <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             style={{
//               ...solidPurpleButtonStyle,
//               ...(currentPage === 1 ? disabledButtonStyle : {}),
//             }}
//           >
//             Previous
//           </button>
 
//           {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//             <button
//               key={page}
//               onClick={() => handlePageChange(page)}
//               style={{
//                 ...pageButtonStyle,
//                 ...(currentPage === page ? activePageStyle : {}),
//               }}
//             >
//               {page}
//             </button>
//           ))}
 
//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages || totalPages === 0}
//             style={{
//               ...solidPurpleButtonStyle,
//               ...(currentPage === totalPages || totalPages === 0 ? disabledButtonStyle : {}),
//             }}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }





import React, { useState, useEffect, useMemo, useCallback } from 'react';
import axiosInstance from "../../utils/axiosInstance";
import {
  Box,
  Button,
  CardContent,
  Chip,
  CircularProgress,
  FormControl,
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
  Pagination,
  Skeleton,
} from '@mui/material';

const THEME_PURPLE = '#8C257C';
const THEME_ORANGE = '#F58E35';
const THEME_PURPLE_HOVER = '#6d1d60';

export default function Attendance1() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchAttendanceData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("api/attendance_overview/");
      if (response.data.status === "success" && Array.isArray(response.data.data)) {
        const formatted = response.data.data.map((item, index) => ({
          id: index,
          name: item.full_name,
          email: item.email,
          date: item.login_date,
          clockIn: item.clock_in || '--',
          clockOut: item.clock_out || '--',
          inLocation: item.clock_in_google_maps_url || '--',
          outLocation: item.clock_out_google_maps_url || '--',
          late: item.late_mark === 'Y' ? 'Yes' : 'No',
          earlyLeaving: item.early_mark === 'Y' ? 'Yes' : 'No',
          halfDay: item.is_half_day === 'Y' ? 'Yes' : 'No',
          totalWork: item.total_work || '--',
          status: item.attendance_status,
        }));
        setAttendanceData(formatted);
      } else {
        setAttendanceData([]);
        setError("Could not parse attendance data.");
      }
    } catch (error) {
      console.error("Error fetching attendance data:", error);
      setError("Failed to fetch attendance data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAttendanceData();
  }, [fetchAttendanceData]);
  
  useEffect(() => {
    setPage(0);
  }, [searchTerm, rowsPerPage]);

  const formatDateToDDMMYYYY = (dateString) => {
    if (!dateString) return '--';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '--';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTimeTo12Hour = (timeString) => {
    if (!timeString || typeof timeString !== 'string' || timeString === '--') return "--";
    const [hoursStr, minutesStr] = timeString.split(':');
    let hours = parseInt(hoursStr, 10);
    let minutes = parseInt(minutesStr, 10);
    if (isNaN(hours) || isNaN(minutes)) return "--";
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${formattedMinutes} ${ampm}`;
  };

  const filteredData = useMemo(() => {
    if (!searchTerm) return attendanceData;
    const searchTermLower = searchTerm.toLowerCase();
    return attendanceData.filter(employee =>
      Object.values(employee).some(value =>
        String(value).toLowerCase().includes(searchTermLower)
      )
    );
  }, [attendanceData, searchTerm]);

  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const startEntry = filteredData.length > 0 ? page * rowsPerPage + 1 : 0;
  const endEntry = Math.min((page + 1) * rowsPerPage, filteredData.length);

  const handlePageChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const getStatusChip = (status) => {
    if (status === 'Present') return <Chip label="Present" size="small" sx={{ backgroundColor: '#d1fae5', color: '#065f46', fontWeight: 'bold' }} />;
    if (status === 'Absent') return <Chip label="Absent" size="small" color="error" sx={{fontWeight: 'bold'}}/>;
    return <Chip label={status || "N/A"} size="small" />;
  };

  return (
    <CardContent sx={{ p: { xs: 1.5, sm: 3 } }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" fontWeight="bold" sx={{ color: THEME_PURPLE }}>
          Daily Attendance Report
        </Typography>
      </Box>
      <br />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Box />
        <TextField
          size="small"
          placeholder="Search records..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: { xs: '100%', sm: 300 } }}
        />
      </Box>

      <Box>
        {loading && attendanceData.length === 0 ? <Box display="flex" justifyContent="center" p={5}><CircularProgress /></Box> : error ? <Paper sx={{p:3, textAlign:'center', color:'red'}}>{error}</Paper> : (
          <Paper variant="outlined">
            <TableContainer>
              <Table size="small">
                <TableHead sx={{ backgroundColor: THEME_PURPLE, '& .MuiTableCell-root': { color: 'white', fontWeight: 'bold' } }}>
                  <TableRow>
                    <TableCell>SR. NO.</TableCell>
                    <TableCell>EMPLOYEE</TableCell>
                    <TableCell>DATE</TableCell>
                    <TableCell>STATUS</TableCell>
                    <TableCell>PUNCH IN</TableCell>
                    <TableCell>IN LOCATION</TableCell>
                    <TableCell>PUNCH OUT</TableCell>
                    <TableCell>OUT LOCATION</TableCell>
                    <TableCell>LATE</TableCell>
                    <TableCell>EARLY LEAVING</TableCell>
                    <TableCell>HALF DAY</TableCell>
                    <TableCell>TOTAL WORK</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    Array.from(new Array(rowsPerPage)).map((_, index) => (
                      <TableRow key={index}>
                        {[...Array(12)].map((_, i) => <TableCell key={i}><Skeleton /></TableCell>)}
                      </TableRow>
                    ))
                  ) : paginatedData.length > 0 ? paginatedData.map((employee, index) => (
                    <TableRow key={employee.id} hover>
                      <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" fontWeight="bold">{employee.name}</Typography>
                          <Typography variant="caption" color="text.secondary">{employee.email}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{formatDateToDDMMYYYY(employee.date)}</TableCell>
                      <TableCell>{getStatusChip(employee.status)}</TableCell>
                      <TableCell>{formatTimeTo12Hour(employee.clockIn)}</TableCell>
                      <TableCell>
                        {employee.inLocation !== '--' ? (
                          <Button size="small" variant="contained" sx={{backgroundColor: THEME_PURPLE, '&:hover': {backgroundColor: THEME_PURPLE_HOVER}}} onClick={() => window.open(employee.inLocation, "_blank")}>
                            Location
                          </Button>
                        ) : '--'}
                      </TableCell>
                      <TableCell>{formatTimeTo12Hour(employee.clockOut)}</TableCell>
                      <TableCell>
                        {employee.outLocation !== '--' ? (
                          <Button size="small" variant="contained" sx={{backgroundColor: THEME_PURPLE, '&:hover': {backgroundColor: THEME_PURPLE_HOVER}}} onClick={() => window.open(employee.outLocation, "_blank")}>
                            Location
                          </Button>
                        ) : '--'}
                      </TableCell>
                      <TableCell>{employee.late}</TableCell>
                      <TableCell>{employee.earlyLeaving}</TableCell>
                      <TableCell>{employee.halfDay}</TableCell>
                      <TableCell>{employee.totalWork}</TableCell>
                    </TableRow>
                  )) : <TableRow><TableCell colSpan={12} align="center" sx={{ py: 5 }}>No attendance records available.</TableCell></TableRow>}
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
                filteredData.length > 0 && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <FormControl variant="outlined" size="small">
                        <Select
                          value={rowsPerPage}
                          onChange={handleChangeRowsPerPage}
                          sx={{ backgroundColor: THEME_PURPLE, color: 'white', borderRadius: '4px', '&:hover': { backgroundColor: THEME_PURPLE_HOVER }, '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, '& .MuiSvgIcon-root': { color: 'white' } }}
                        >
                          {[10, 25, 50, 100].map((value) => ( <MenuItem key={value} value={value}>{value}</MenuItem> ))}
                        </Select>
                      </FormControl>
                      <Typography variant="body2" color="text.secondary">
                        {`Showing ${startEntry} to ${endEntry} of ${filteredData.length} results`}
                      </Typography>
                    </Box>
                    <Pagination
                      count={Math.ceil(filteredData.length / rowsPerPage)}
                      page={page + 1}
                      onChange={handlePageChange}
                      showFirstButton showLastButton
                      sx={{
                        '& .MuiPaginationItem-root:hover': { backgroundColor: THEME_ORANGE, color: 'white' },
                        '& .MuiPaginationItem-page': {
                          color: THEME_PURPLE,
                          '&.Mui-selected': {
                            backgroundColor: THEME_PURPLE,
                            color: 'white',
                            '&:hover': { backgroundColor: THEME_ORANGE }
                          },
                        },
                        '& .MuiPaginationItem-icon': { color: THEME_PURPLE }
                      }}
                    />
                  </Box>
                )
              )}
            </Box>
          </Paper>
        )}
      </Box>
    </CardContent>
  );
}