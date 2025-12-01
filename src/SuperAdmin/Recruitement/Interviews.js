import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";

// Sample interviews data
const sampleInterviews = [
  {
    id: 1,
    jobTitle: "Software Engineer",
    selectedCandidates: "John Doe",
    modeOfInterview: "Online",
    interviewTime: "2024-12-05 10:00 AM",
    interviewer: "Alice Johnson",
    status: "Scheduled",
    createdAt: "2024-11-30",
  },
  {
    id: 2,
    jobTitle: "UI/UX Designer",
    selectedCandidates: "Jane Smith",
    modeOfInterview: "In-Person",
    interviewTime: "2024-12-06 2:00 PM",
    interviewer: "Bob Lee",
    status: "Completed",
    createdAt: "2024-11-28",
  },
  {
    id: 3,
    jobTitle: "Project Manager",
    selectedCandidates: "Sam Wilson",
    modeOfInterview: "Online",
    interviewTime: "2024-12-07 11:00 AM",
    interviewer: "Charlie Brown",
    status: "Scheduled",
    createdAt: "2024-11-29",
  },
  // Add more interview entries as needed
];

export default function Interviews() {
  const [interviews] = useState(sampleInterviews);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Handle the search filter
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0); // Reset to the first page when the search changes
  };

  // Handle the page change in the table pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle the rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter interviews based on the search query
  const filteredInterviews = interviews.filter(
    (interview) =>
      interview.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interview.selectedCandidates
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  // Get paginated interviews
  const paginatedInterviews = filteredInterviews.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        p: 3,
      }}
    >
      <Typography variant="h4" sx={{ mb: 3 }} align="center">
        Interviews List
      </Typography>

      {/* Search Bar aligned to the right */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          mb: 3,
        }}
      >
        <TextField
          label="Search by Job Title or Candidate Name"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ width: { xs: "100%", sm: "300px" }, maxWidth: "400px" }} // Responsive width for search bar
        />
      </Box>

      {/* Interviews Table */}
      <TableContainer
        component={Paper}
        sx={{ maxWidth: "100%", overflowX: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Job Title</strong>
              </TableCell>
              <TableCell>
                <strong>Selected Candidates</strong>
              </TableCell>
              <TableCell>
                <strong>Mode of Interview</strong>
              </TableCell>
              <TableCell>
                <strong>Interview Time</strong>
              </TableCell>
              <TableCell>
                <strong>Interviewer</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell>
                <strong>Created At</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedInterviews.map((interview) => (
              <TableRow key={interview.id}>
                <TableCell>{interview.jobTitle}</TableCell>
                <TableCell>{interview.selectedCandidates}</TableCell>
                <TableCell>{interview.modeOfInterview}</TableCell>
                <TableCell>{interview.interviewTime}</TableCell>
                <TableCell>{interview.interviewer}</TableCell>
                <TableCell>{interview.status}</TableCell>
                <TableCell>{interview.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredInterviews.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 2 }}
      />
    </Box>
  );
}
