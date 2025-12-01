import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

// Sample Data (This will be replaced with actual API data or state management later)
const initialCases = [
  {
    id: 1,
    employee: "John Doe",
    caseType: "Misconduct",
    caseDate: "2023-10-15",
    subject: "Late for Work",
    caseBy: "HR",
  },
  {
    id: 2,
    employee: "Jane Smith",
    caseType: "Harassment",
    caseDate: "2023-11-05",
    subject: "Inappropriate Behavior",
    caseBy: "Manager",
  },
  {
    id: 3,
    employee: "Bob Johnson",
    caseType: "Absenteeism",
    caseDate: "2023-09-28",
    subject: "Unapproved Leave",
    caseBy: "HR",
  },
  {
    id: 4,
    employee: "Alice Brown",
    caseType: "Performance Issue",
    caseDate: "2023-11-20",
    subject: "Low Sales",
    caseBy: "Manager",
  },
  {
    id: 5,
    employee: "Charlie Davis",
    caseType: "Theft",
    caseDate: "2023-08-30",
    subject: "Stolen Equipment",
    caseBy: "Security",
  },
  {
    id: 6,
    employee: "Eve White",
    caseType: "Misconduct",
    caseDate: "2023-07-12",
    subject: "Fighting in Office",
    caseBy: "HR",
  },
  {
    id: 7,
    employee: "David Wilson",
    caseType: "Absenteeism",
    caseDate: "2023-10-25",
    subject: "Unauthorized Absence",
    caseBy: "HR",
  },
  {
    id: 8,
    employee: "Grace Lee",
    caseType: "Harassment",
    caseDate: "2023-09-10",
    subject: "Verbal Abuse",
    caseBy: "Manager",
  },
  {
    id: 9,
    employee: "Oscar Scott",
    caseType: "Performance Issue",
    caseDate: "2023-06-05",
    subject: "Failed Targets",
    caseBy: "Manager",
  },
  {
    id: 10,
    employee: "Ivy Clark",
    caseType: "Misconduct",
    caseDate: "2023-05-01",
    subject: "Unprofessional Behavior",
    caseBy: "HR",
  },
  {
    id: 11,
    employee: "Liam Martinez",
    caseType: "Theft",
    caseDate: "2023-02-25",
    subject: "Stealing Supplies",
    caseBy: "Security",
  },
];

export default function DisciplinaryCases() {
  const [cases, setCases] = useState(initialCases);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showDialog, setShowDialog] = useState(false); // State to toggle Dialog visibility
  const [newCase, setNewCase] = useState({
    employee: "",
    caseType: "",
    caseDate: "",
    subject: "",
    caseBy: "",
  });

  // Predefined case types
  const caseTypes = [
    "Misconduct",
    "Harassment",
    "Absenteeism",
    "Performance Issue",
    "Theft",
  ];

  // Filter the cases based on search query
  const filteredCases = cases.filter((row) => {
    return (
      row.employee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.caseType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddNewCase = () => {
    setShowDialog(true); // Open the dialog form
  };

  const handleCloseDialog = () => {
    setShowDialog(false); // Close the dialog
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCase({ ...newCase, [name]: value });
  };

  const handleSubmit = () => {
    const newCaseData = {
      id: cases.length + 1, // Increment ID based on length (for demo purposes)
      ...newCase,
    };
    setCases([newCaseData, ...cases]); // Add new case to the top of the list
    handleCloseDialog(); // Close the form after submitting
    setNewCase({
      employee: "",
      caseType: "",
      caseDate: "",
      subject: "",
      caseBy: "",
    }); // Reset form
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Disciplinary Cases
      </Typography>

      {/* Search Bar */}
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", marginBottom: 2 }}
      >
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ width: { xs: "100%", sm: "50%", md: "30%" } }}
        />
      </Box>

      {/* Button to add a new case */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddNewCase}
        sx={{ marginBottom: 2 }}
      >
        Add New Case
      </Button>

      {/* Dialog for Add New Case Form */}
      <Dialog
        open={showDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Case</DialogTitle>
        <DialogContent>
          <TextField
            label="Employee"
            variant="outlined"
            fullWidth
            name="employee"
            value={newCase.employee}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />

          {/* Case Type Dropdown */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Case Type</InputLabel>
            <Select
              label="Case Type"
              name="caseType"
              value={newCase.caseType}
              onChange={handleInputChange}
            >
              {caseTypes.map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Subject"
            variant="outlined"
            fullWidth
            name="subject"
            value={newCase.subject}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Case By"
            variant="outlined"
            fullWidth
            name="caseBy"
            value={newCase.caseBy}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />

          {/* Case Date Input */}
          <TextField
            label="Case Date"
            variant="outlined"
            type="date"
            fullWidth
            name="caseDate"
            value={newCase.caseDate}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
            InputLabelProps={{
              shrink: true, // Ensures label stays above the field
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Table with Paginated Data */}
      <TableContainer
        component={Paper}
        sx={{ maxHeight: 500, overflow: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee</TableCell>
              <TableCell>Case Type</TableCell>
              <TableCell>Case Date</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Case By</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCases
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.employee}</TableCell>
                  <TableCell>{row.caseType}</TableCell>
                  <TableCell>{row.caseDate}</TableCell>
                  <TableCell>{row.subject}</TableCell>
                  <TableCell>{row.caseBy}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={filteredCases.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}
