import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
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
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

// Sample promotion data
const samplePromotions = [
  {
    id: 1,
    employeeName: "John Doe",
    employeeEmail: "john.doe@example.com",
    promotionTitle: "Senior Software Engineer",
    interviewer: "Alice Johnson",
    promotionDate: "2024-12-01",
    remarks: "Excellent performance and leadership skills.",
  },
  {
    id: 2,
    employeeName: "Jane Smith",
    employeeEmail: "jane.smith@example.com",
    promotionTitle: "Lead Designer",
    interviewer: "Bob Lee",
    promotionDate: "2024-12-05",
    remarks: "Highly creative and innovative work.",
  },
  {
    id: 3,
    employeeName: "Sam Wilson",
    employeeEmail: "sam.wilson@example.com",
    promotionTitle: "Project Manager",
    interviewer: "Charlie Brown",
    promotionDate: "2024-12-10",
    remarks: "Great project management and team collaboration.",
  },
  // Add more promotions as needed
];

export default function Promotions() {
  const [promotions] = useState(samplePromotions);
  const [searchQuery, setSearchQuery] = useState("");
  const [openRemarksDialog, setOpenRemarksDialog] = useState(false);
  const [selectedRemarks, setSelectedRemarks] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Handle opening the remarks dialog
  const handleViewRemarks = (remarks) => {
    setSelectedRemarks(remarks);
    setOpenRemarksDialog(true);
  };

  const handleCloseRemarksDialog = () => {
    setOpenRemarksDialog(false);
    setSelectedRemarks(null);
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

  // Filter promotions based on the search query
  const filteredPromotions = promotions.filter(
    (promotion) =>
      promotion.employeeName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      promotion.employeeEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get paginated promotions
  const paginatedPromotions = filteredPromotions.slice(
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
        Promotions List
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
          label="Search by Employee Name or Email"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ width: { xs: "100%", sm: "300px" }, maxWidth: "400px" }} // Responsive width for search bar
        />
      </Box>

      {/* Promotions Table */}
      <TableContainer
        component={Paper}
        sx={{ maxWidth: "100%", overflowX: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Employee</strong>
              </TableCell>
              <TableCell>
                <strong>Promotion Title</strong>
              </TableCell>
              <TableCell>
                <strong>Interviewer</strong>
              </TableCell>
              <TableCell>
                <strong>Promotion Date</strong>
              </TableCell>
              <TableCell>
                <strong>Remarks</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPromotions.map((promotion) => (
              <TableRow key={promotion.id}>
                <TableCell>
                  {promotion.employeeName} <br /> {promotion.employeeEmail}
                </TableCell>
                <TableCell>{promotion.promotionTitle}</TableCell>
                <TableCell>{promotion.interviewer}</TableCell>
                <TableCell>{promotion.promotionDate}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleViewRemarks(promotion.remarks)}
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
        count={filteredPromotions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 2 }}
      />

      {/* Remarks Dialog */}
      <Dialog
        open={openRemarksDialog}
        onClose={handleCloseRemarksDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Promotion Remarks</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="textSecondary">
            {selectedRemarks ? selectedRemarks : "No remarks available."}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRemarksDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
