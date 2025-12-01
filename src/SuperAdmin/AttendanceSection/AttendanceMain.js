"use client"

import { useState } from "react"
import Attendance1 from "./AttendanceFirst"
import Attendance2 from "./AttendanceSecond"

export default function AttendanceApp() {
  const [currentPage, setCurrentPage] = useState("attendance1")

  const navigateToPage = (page) => {
    setCurrentPage(page)
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "Arial, sans-serif" }}>
      {currentPage === "attendance1" && <Attendance1 onNavigate={navigateToPage} />}
      {currentPage === "attendance2" && <Attendance2 onNavigate={navigateToPage} />}
    </div>
  )
}
