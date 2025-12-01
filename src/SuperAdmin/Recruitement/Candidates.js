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
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TablePagination,
  Button, // <-- Add this import for Button
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

// Sample candidates with apply date
const sampleCandidates = [
  {
    id: 1,
    jobTitle: "Software Engineer",
    candidateName: "John Doe",
    email: "john.doe@example.com",
    status: "Applied",
    applyDate: "2024-11-01",
    coverLetter: "coverLetter1.pdf",
  },
  {
    id: 2,
    jobTitle: "UI/UX Designer",
    candidateName: "Jane Smith",
    email: "jane.smith@example.com",
    status: "Under Review",
    applyDate: "2024-11-05",
    coverLetter: "coverLetter2.pdf",
  },
  {
    id: 3,
    jobTitle: "Project Manager",
    candidateName: "Sam Wilson",
    email: "sam.wilson@example.com",
    status: "Interview Scheduled",
    applyDate: "2024-11-10",
    coverLetter: "coverLetter3.pdf",
  },
  // Add more candidates as needed
];

export default function Candidates() {
  const [candidates] = useState(sampleCandidates);
  const [searchQuery, setSearchQuery] = useState("");
  const [openCoverLetterDialog, setOpenCoverLetterDialog] = useState(false);
  const [selectedCoverLetter, setSelectedCoverLetter] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Handle opening the cover letter dialog
  const handleViewCoverLetter = (fileName) => {
    setSelectedCoverLetter(fileName);
    setOpenCoverLetterDialog(true);
  };

  const handleCloseCoverLetterDialog = () => {
    setOpenCoverLetterDialog(false);
    setSelectedCoverLetter(null);
  };

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

  // Filter candidates based on the search query
  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.candidateName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get paginated candidates
  const paginatedCandidates = filteredCandidates.slice(
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
        Candidates List
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
          label="Search by Name or Email"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ width: { xs: "100%", sm: "300px" }, maxWidth: "400px" }} // Responsive width for search bar
        />
      </Box>

      {/* Candidate Table */}
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
                <strong>Candidate Name</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell>
                <strong>Apply Date</strong>
              </TableCell>
              <TableCell>
                <strong>Cover Letter</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCandidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell>{candidate.jobTitle}</TableCell>
                <TableCell>{candidate.candidateName}</TableCell>
                <TableCell>{candidate.email}</TableCell>
                <TableCell>{candidate.status}</TableCell>
                <TableCell>{candidate.applyDate}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleViewCoverLetter(candidate.coverLetter)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredCandidates.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 2 }}
      />

      {/* Cover Letter Dialog */}
      <Dialog
        open={openCoverLetterDialog}
        onClose={handleCloseCoverLetterDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Cover Letter</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="textSecondary">
            {selectedCoverLetter
              ? `Cover Letter: ${selectedCoverLetter}`
              : "No cover letter selected."}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCoverLetterDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
