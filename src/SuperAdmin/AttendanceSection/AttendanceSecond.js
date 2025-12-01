"use client"

import { useState } from "react"

export default function Attendance2({ onNavigate }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [entriesPerPage, setEntriesPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [hoveredRow, setHoveredRow] = useState(null)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  const [onDutyData, setOnDutyData] = useState([
    {
      id: 1,
      name: "Umesh Hinagmire",
      email: "",
      date: "2025-06-14",
      clockIn: "17:13",
      clockOut: "",
      reason: "Check IN",
      status: "Pending",
      avatar: "/placeholder.svg?height=32&width=32",
      details: {
        location: "Office Building A",
        department: "IT Department",
        manager: "John Smith",
        notes: "Late arrival due to traffic",
        requestedBy: "Self",
        submittedAt: "2025-06-14 17:13:00",
      },
    },
    {
      id: 2,
      name: "Yatin Patil",
      email: "NA",
      date: "2025-06-14",
      clockIn: "15:02",
      clockOut: "18:38",
      reason: "Check OUT",
      status: "Pending",
      avatar: "/placeholder.svg?height=32&width=32",
      details: {
        location: "Office Building B",
        department: "Marketing",
        manager: "Sarah Johnson",
        notes: "Regular working hours",
        requestedBy: "Self",
        submittedAt: "2025-06-14 15:02:00",
      },
    },
    {
      id: 3,
      name: "Vrusha Pawar",
      email: "",
      date: "2025-06-14",
      clockIn: "13:33",
      clockOut: "",
      reason: "Check IN",
      status: "Pending",
      avatar: "/placeholder.svg?height=32&width=32",
      details: {
        location: "Office Building A",
        department: "HR Department",
        manager: "Mike Wilson",
        notes: "Half day work",
        requestedBy: "Self",
        submittedAt: "2025-06-14 13:33:00",
      },
    },
    {
      id: 4,
      name: "Rahul Misal",
      email: "rahulmisal1405@gmail.com",
      date: "2025-06-14",
      clockIn: "11:35",
      clockOut: "",
      reason: "Check IN",
      status: "Pending",
      avatar: "/placeholder.svg?height=32&width=32",
      details: {
        location: "Office Building C",
        department: "Finance",
        manager: "Lisa Brown",
        notes: "Regular check-in",
        requestedBy: "Self",
        submittedAt: "2025-06-14 11:35:00",
      },
    },
    {
      id: 5,
      name: "Rahul Rathod",
      email: "rahulrathod1319@gmail.com",
      date: "2025-06-14",
      clockIn: "11:34",
      clockOut: "",
      reason: "Check IN",
      status: "Pending",
      avatar: "/placeholder.svg?height=32&width=32",
      details: {
        location: "Office Building A",
        department: "Operations",
        manager: "Tom Davis",
        notes: "On-time arrival",
        requestedBy: "Self",
        submittedAt: "2025-06-14 11:34:00",
      },
    },
    {
      id: 6,
      name: "Tejas Devkate",
      email: "",
      date: "2025-06-14",
      clockIn: "10:57",
      clockOut: "21:45",
      reason: "Check OUT",
      status: "Pending",
      avatar: "/placeholder.svg?height=32&width=32",
      details: {
        location: "Office Building B",
        department: "Development",
        manager: "Alex Johnson",
        notes: "Extended working hours",
        requestedBy: "Self",
        submittedAt: "2025-06-14 10:57:00",
      },
    },
    {
      id: 7,
      name: "Yogesh Bisen",
      email: "",
      date: "2025-06-14",
      clockIn: "10:55",
      clockOut: "",
      reason: "Check IN",
      status: "Pending",
      avatar: "/placeholder.svg?height=32&width=32",
      details: {
        location: "Office Building A",
        department: "Quality Assurance",
        manager: "Emma Wilson",
        notes: "Regular attendance",
        requestedBy: "Self",
        submittedAt: "2025-06-14 10:55:00",
      },
    },
    {
      id: 8,
      name: "Ragala Sairam",
      email: "sairamragala21@gmail.com",
      date: "2025-06-14",
      clockIn: "10:34",
      clockOut: "",
      reason: "Check IN",
      status: "Pending",
      avatar: "/placeholder.svg?height=32&width=32",
      details: {
        location: "Office Building C",
        department: "Support",
        manager: "David Lee",
        notes: "Early arrival",
        requestedBy: "Self",
        submittedAt: "2025-06-14 10:34:00",
      },
    },
    {
      id: 9,
      name: "Shubham Lokhande",
      email: "lokhandeshubham1999@gmail.com",
      date: "2025-06-14",
      clockIn: "10:31",
      clockOut: "",
      reason: "Check IN",
      status: "Pending",
      avatar: "/placeholder.svg?height=32&width=32",
      details: {
        location: "Office Building A",
        department: "Research",
        manager: "Jennifer Taylor",
        notes: "Punctual arrival",
        requestedBy: "Self",
        submittedAt: "2025-06-14 10:31:00",
      },
    },
    {
      id: 10,
      name: "Milind Gurav",
      email: "",
      date: "2025-06-14",
      clockIn: "10:26",
      clockOut: "",
      reason: "Check IN",
      status: "Pending",
      avatar: "/placeholder.svg?height=32&width=32",
      details: {
        location: "Office Building B",
        department: "Administration",
        manager: "Robert Clark",
        notes: "Standard check-in",
        requestedBy: "Self",
        submittedAt: "2025-06-14 10:26:00",
      },
    },
  ])

  const filteredData = onDutyData.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredData.length / entriesPerPage)
  const startIndex = (currentPage - 1) * entriesPerPage
  const endIndex = startIndex + entriesPerPage
  const currentData = filteredData.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee)
    setShowDetailsModal(true)
  }

  const handleAccept = (employeeId) => {
    setOnDutyData((prevData) => prevData.map((emp) => (emp.id === employeeId ? { ...emp, status: "Approved" } : emp)))
    setShowDetailsModal(false)
    setSelectedEmployee(null)
  }

  const handleReject = (employeeId) => {
    setOnDutyData((prevData) => prevData.map((emp) => (emp.id === employeeId ? { ...emp, status: "Rejected" } : emp)))
    setShowDetailsModal(false)
    setSelectedEmployee(null)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return { backgroundColor: "#fef3c7", color: "#d97706" }
      case "Approved":
        return { backgroundColor: "#d1fae5", color: "#065f46" }
      case "Rejected":
        return { backgroundColor: "#fee2e2", color: "#dc2626" }
      default:
        return { backgroundColor: "#f3f4f6", color: "#6b7280" }
    }
  }

  const getReasonColor = (reason) => {
    return { color: "#dc2626", fontWeight: "500" }
  }

  // Styles
  const containerStyle = {
    padding: "24px",
    backgroundColor: "#ffffff",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  }

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    paddingBottom: "16px",
    borderBottom: "2px solid #e5e7eb",
  }

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "600",
    color: "#1f2937",
    margin: 0,
  }

  const buttonStyle = {
    backgroundColor: "#4f46e5",
    color: "white",
    padding: "12px 24px",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 4px rgba(79, 70, 229, 0.2)",
  }

  const controlsStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    padding: "16px",
    backgroundColor: "#f9fafb",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
  }

  const selectStyle = {
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    padding: "8px 12px",
    fontSize: "14px",
    backgroundColor: "white",
    cursor: "pointer",
    outline: "none",
  }

  const inputStyle = {
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    padding: "8px 12px",
    fontSize: "14px",
    width: "250px",
    outline: "none",
    transition: "border-color 0.2s ease",
  }

  const tableContainerStyle = {
    overflowX: "auto",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    backgroundColor: "white",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
  }

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  }

  const thStyle = {
    padding: "16px",
    textAlign: "left",
    fontSize: "12px",
    fontWeight: "600",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    backgroundColor: "#f9fafb",
    borderBottom: "1px solid #e5e7eb",
  }

  const tdStyle = {
    padding: "16px",
    borderBottom: "1px solid #f3f4f6",
    fontSize: "14px",
    position: "relative",
  }

  const avatarStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "12px",
    border: "2px solid #e5e7eb",
  }

  const nameStyle = {
    fontWeight: "500",
    color: "#1f2937",
    marginBottom: "4px",
  }

  const emailStyle = {
    color: "#3b82f6",
    fontSize: "13px",
  }

  const actionButtonsStyle = {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    marginRight: "8px",
  }

  const actionButtonStyle = {
    padding: "6px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }

  const viewButtonStyle = {
    ...actionButtonStyle,
    backgroundColor: "#dbeafe",
    color: "#1d4ed8",
  }

  const editButtonStyle = {
    ...actionButtonStyle,
    backgroundColor: "#dcfce7",
    color: "#16a34a",
  }

  const deleteButtonStyle = {
    ...actionButtonStyle,
    backgroundColor: "#fee2e2",
    color: "#dc2626",
  }

  const modalOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  }

  const modalStyle = {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "24px",
    width: "90%",
    maxWidth: "600px",
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  }

  const modalHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    paddingBottom: "16px",
    borderBottom: "1px solid #e5e7eb",
  }

  const closeButtonStyle = {
    background: "none",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    color: "#6b7280",
    padding: "4px",
  }

  const detailsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px",
    marginBottom: "20px",
  }

  const detailItemStyle = {
    marginBottom: "12px",
  }

  const labelStyle = {
    display: "block",
    fontSize: "12px",
    fontWeight: "600",
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: "4px",
  }

  const valueStyle = {
    fontSize: "14px",
    color: "#1f2937",
  }

  const notesStyle = {
    backgroundColor: "#f9fafb",
    padding: "12px",
    borderRadius: "6px",
    fontSize: "14px",
    color: "#1f2937",
    border: "1px solid #e5e7eb",
  }

  const actionButtonsContainerStyle = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    paddingTop: "16px",
    borderTop: "1px solid #e5e7eb",
  }

  const rejectButtonStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 20px",
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
  }

  const acceptButtonStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 20px",
    backgroundColor: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
  }

  const paginationStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "24px",
    padding: "16px",
    backgroundColor: "#f9fafb",
    borderRadius: "8px",
  }

  const pageButtonStyle = {
    padding: "8px 12px",
    fontSize: "14px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    backgroundColor: "white",
    cursor: "pointer",
    margin: "0 2px",
    transition: "all 0.2s ease",
  }

  const activePageStyle = {
    backgroundColor: "#4f46e5",
    color: "white",
    borderColor: "#4f46e5",
  }

  const disabledButtonStyle = {
    opacity: 0.5,
    cursor: "not-allowed",
  }

  // SVG Icons
  const EyeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
    </svg>
  )

  const EditIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </svg>
  )

  const DeleteIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
    </svg>
  )

  const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  )

  const CheckIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  )

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>On Duty Report</h1>
        <button
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#4338ca"
            e.target.style.transform = "translateY(-1px)"
            e.target.style.boxShadow = "0 4px 8px rgba(79, 70, 229, 0.3)"
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#4f46e5"
            e.target.style.transform = "translateY(0)"
            e.target.style.boxShadow = "0 2px 4px rgba(79, 70, 229, 0.2)"
          }}
          onClick={() => onNavigate("attendance1")}
        >
          Attendance
        </button>
      </div>

      {/* Controls */}
      <div style={controlsStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "14px", color: "#6b7280" }}>Show</span>
          <select
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            style={selectStyle}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span style={{ fontSize: "14px", color: "#6b7280" }}>entries</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "14px", color: "#6b7280" }}>Search:</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={inputStyle}
            placeholder="Search employees..."
            onFocus={(e) => (e.target.style.borderColor = "#4f46e5")}
            onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
          />
        </div>
      </div>

      {/* Table */}
      <div style={tableContainerStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Employee</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Clock In</th>
              <th style={thStyle}>Clock Out</th>
              <th style={thStyle}>Reason</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((employee) => (
              <tr
                key={employee.id}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f9fafb"
                  setHoveredRow(employee.id)
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"
                  setHoveredRow(null)
                }}
              >
                <td style={tdStyle}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {hoveredRow === employee.id && (
                      <div style={actionButtonsStyle}>
                        <button
                          onClick={() => handleViewDetails(employee)}
                          style={viewButtonStyle}
                          onMouseEnter={(e) => (e.target.style.backgroundColor = "#bfdbfe")}
                          onMouseLeave={(e) => (e.target.style.backgroundColor = "#dbeafe")}
                          title="View Details"
                        >
                          <EyeIcon />
                        </button>
                        <button
                          style={editButtonStyle}
                          onMouseEnter={(e) => (e.target.style.backgroundColor = "#bbf7d0")}
                          onMouseLeave={(e) => (e.target.style.backgroundColor = "#dcfce7")}
                          title="Edit"
                        >
                          <EditIcon />
                        </button>
                        <button
                          style={deleteButtonStyle}
                          onMouseEnter={(e) => (e.target.style.backgroundColor = "#fecaca")}
                          onMouseLeave={(e) => (e.target.style.backgroundColor = "#fee2e2")}
                          title="Delete"
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    )}
                    <img src={employee.avatar || "/placeholder.svg"} alt="User" style={avatarStyle} />
                    <div>
                      <div style={nameStyle}>{employee.name}</div>
                      {employee.email && employee.email !== "NA" && <div style={emailStyle}>{employee.email}</div>}
                      {employee.email === "NA" && <div style={{ ...emailStyle, color: "#6b7280" }}>NA</div>}
                    </div>
                  </div>
                </td>
                <td style={tdStyle}>{employee.date}</td>
                <td style={tdStyle}>{employee.clockIn}</td>
                <td style={tdStyle}>{employee.clockOut || "-"}</td>
                <td style={tdStyle}>
                  <span style={getReasonColor(employee.reason)}>{employee.reason}</span>
                </td>
                <td style={tdStyle}>
                  <span
                    style={{
                      display: "inline-flex",
                      padding: "4px 12px",
                      fontSize: "12px",
                      fontWeight: "600",
                      borderRadius: "20px",
                      ...getStatusColor(employee.status),
                    }}
                  >
                    {employee.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={paginationStyle}>
        <div style={{ fontSize: "14px", color: "#6b7280" }}>
          Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              ...pageButtonStyle,
              ...(currentPage === 1 ? disabledButtonStyle : {}),
            }}
          >
            Previous
          </button>

          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            let page
            if (totalPages <= 5) {
              page = i + 1
            } else if (currentPage <= 3) {
              page = i + 1
            } else if (currentPage >= totalPages - 2) {
              page = totalPages - 4 + i
            } else {
              page = currentPage - 2 + i
            }

            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                style={{
                  ...pageButtonStyle,
                  ...(currentPage === page ? activePageStyle : {}),
                }}
              >
                {page}
              </button>
            )
          })}

          {totalPages > 5 && currentPage < totalPages - 2 && (
            <>
              <span style={{ padding: "0 8px", fontSize: "14px", color: "#6b7280" }}>...</span>
              <button onClick={() => handlePageChange(totalPages)} style={pageButtonStyle}>
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              ...pageButtonStyle,
              ...(currentPage === totalPages ? disabledButtonStyle : {}),
            }}
          >
            Next
          </button>
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedEmployee && (
        <div style={modalOverlayStyle} onClick={() => setShowDetailsModal(false)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeaderStyle}>
              <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#1f2937", margin: 0 }}>Employee Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                style={closeButtonStyle}
                onMouseEnter={(e) => (e.target.style.color = "#374151")}
                onMouseLeave={(e) => (e.target.style.color = "#6b7280")}
              >
                <CloseIcon />
              </button>
            </div>

            <div>
              {/* Employee Info */}
              <div style={{ display: "flex", alignItems: "center", marginBottom: "24px" }}>
                <img
                  src={selectedEmployee.avatar || "/placeholder.svg"}
                  alt="Employee"
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    marginRight: "16px",
                    border: "3px solid #e5e7eb",
                  }}
                />
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: "500", color: "#1f2937", margin: "0 0 4px 0" }}>
                    {selectedEmployee.name}
                  </h3>
                  {selectedEmployee.email && selectedEmployee.email !== "NA" && (
                    <p style={{ color: "#3b82f6", margin: 0, fontSize: "14px" }}>{selectedEmployee.email}</p>
                  )}
                </div>
              </div>

              {/* Details Grid */}
              <div style={detailsGridStyle}>
                <div>
                  <div style={detailItemStyle}>
                    <label style={labelStyle}>Date</label>
                    <p style={valueStyle}>{selectedEmployee.date}</p>
                  </div>
                  <div style={detailItemStyle}>
                    <label style={labelStyle}>Clock In</label>
                    <p style={valueStyle}>{selectedEmployee.clockIn}</p>
                  </div>
                  <div style={detailItemStyle}>
                    <label style={labelStyle}>Clock Out</label>
                    <p style={valueStyle}>{selectedEmployee.clockOut || "Not recorded"}</p>
                  </div>
                  <div style={detailItemStyle}>
                    <label style={labelStyle}>Reason</label>
                    <p style={{ ...valueStyle, ...getReasonColor(selectedEmployee.reason) }}>
                      {selectedEmployee.reason}
                    </p>
                  </div>
                  <div style={detailItemStyle}>
                    <label style={labelStyle}>Current Status</label>
                    <span
                      style={{
                        display: "inline-flex",
                        padding: "4px 12px",
                        fontSize: "12px",
                        fontWeight: "600",
                        borderRadius: "20px",
                        ...getStatusColor(selectedEmployee.status),
                      }}
                    >
                      {selectedEmployee.status}
                    </span>
                  </div>
                </div>

                <div>
                  <div style={detailItemStyle}>
                    <label style={labelStyle}>Location</label>
                    <p style={valueStyle}>{selectedEmployee.details.location}</p>
                  </div>
                  <div style={detailItemStyle}>
                    <label style={labelStyle}>Department</label>
                    <p style={valueStyle}>{selectedEmployee.details.department}</p>
                  </div>
                  <div style={detailItemStyle}>
                    <label style={labelStyle}>Manager</label>
                    <p style={valueStyle}>{selectedEmployee.details.manager}</p>
                  </div>
                  <div style={detailItemStyle}>
                    <label style={labelStyle}>Requested By</label>
                    <p style={valueStyle}>{selectedEmployee.details.requestedBy}</p>
                  </div>
                  <div style={detailItemStyle}>
                    <label style={labelStyle}>Submitted At</label>
                    <p style={valueStyle}>{selectedEmployee.details.submittedAt}</p>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>Notes</label>
                <div style={notesStyle}>{selectedEmployee.details.notes}</div>
              </div>

              {/* Action Buttons */}
              {selectedEmployee.status === "Pending" && (
                <div style={actionButtonsContainerStyle}>
                  <button
                    onClick={() => handleReject(selectedEmployee.id)}
                    style={rejectButtonStyle}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#b91c1c")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#dc2626")}
                  >
                    <CloseIcon />
                    Reject
                  </button>
                  <button
                    onClick={() => handleAccept(selectedEmployee.id)}
                    style={acceptButtonStyle}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#15803d")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#16a34a")}
                  >
                    <CheckIcon />
                    Accept
                  </button>
                </div>
              )}

              {selectedEmployee.status !== "Pending" && (
                <div style={{ paddingTop: "16px", borderTop: "1px solid #e5e7eb" }}>
                  <p style={{ fontSize: "14px", color: "#6b7280", textAlign: "center", margin: 0 }}>
                    This attendance record has been {selectedEmployee.status.toLowerCase()}.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
