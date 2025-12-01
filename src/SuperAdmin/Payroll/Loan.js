import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  TableSortLabel,
} from "@mui/material";
import { Add, Close } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const Loan = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    employee: "",
    monthYear: null,
    amount: "",
    oneTimeDeduct: "",
    monthlyInstallment: "",
    reason: "",
  });

  const [salaryList, setSalaryList] = useState([
    {
      employee: "Kumar Patil",
      email: "patilvetrina@gmail.com",
      amount: 2000,
      paid: 0,
      monthYear: "February, 2024",
      oneTimeDeduct: "Yes",
      emi: 2000,
      createdAt: "12-02-2024",
    },
    {
      employee: "Kumar Patil",
      email: "patilvetrina@gmail.com",
      amount: 2000,
      paid: 0,
      monthYear: "February, 2024",
      oneTimeDeduct: "No",
      emi: 2000,
      createdAt: "28-02-2024",
    },
  ]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("employee"); // Default column to sort by
  const [order, setOrder] = useState("asc"); // Default order is ascending

  const handleAddNew = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    handleReset();
  };

  const handleReset = () => {
    setFormData({
      employee: "",
      monthYear: null,
      amount: "",
      oneTimeDeduct: "No",
      monthlyInstallment: "",
      reason: "",
    });
  };

  const handleSave = () => {
    const newRecord = {
      employee: formData.employee,
      email: "dummyemail@gmail.com",
      amount: parseFloat(formData.amount),
      paid: 0,
      monthYear: formData.monthYear?.format("MMMM, YYYY"),
      oneTimeDeduct: formData.oneTimeDeduct,
      emi: parseFloat(formData.monthlyInstallment),
      createdAt: dayjs().format("DD-MM-YYYY"),
    };
    setSalaryList([...salaryList, newRecord]);
    setShowForm(false);
    handleReset();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortData = (array) => {
    const sortedArray = array.sort((a, b) => {
      if (a[orderBy] < b[orderBy]) {
        return order === "asc" ? -1 : 1;
      }
      if (a[orderBy] > b[orderBy]) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });
    return sortedArray;
  };

  // Filter salaryList based on the search term
  const filteredSalaryList = salaryList.filter((item) =>
    item.employee.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box p={2}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Loan</Typography>
        {!showForm && (
          <Button
            onClick={handleAddNew}
            variant="contained"
            startIcon={<Add />}
            sx={{
              backgroundColor: "#7c3aed",
              borderRadius: "8px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#6b21a8",
              },
            }}
          >
            Add New
          </Button>
        )}
      </Box>

      {/* Form Container */}
      {showForm && (
        <Box mb={4}>
          <Box display="flex" justifyContent="flex-end" mb={1}>
            <Button
              onClick={handleCloseForm}
              startIcon={<Close />}
              variant="outlined"
              sx={{
                borderRadius: "8px",
                textTransform: "none",
                borderColor: "#f87171",
                color: "#f87171",
                "&:hover": {
                  borderColor: "#dc2626",
                  color: "#dc2626",
                },
              }}
            >
              Close
            </Button>
          </Box>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Request Loan</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Employee"
                    fullWidth
                    required
                    value={formData.employee}
                    onChange={(e) => setFormData({ ...formData, employee: e.target.value })}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      views={["year", "month"]}
                      label="Month & Year"
                      value={formData.monthYear}
                      onChange={(newValue) => setFormData({ ...formData, monthYear: newValue })}
                      renderInput={(params) => <TextField fullWidth required {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    label="Amount"
                    fullWidth
                    required
                    InputProps={{ startAdornment: <Box mr={1}>INR</Box> }}
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Select
                    label="One Time Deduction"
                    fullWidth
                    required
                    value={formData.oneTimeDeduct}
                    onChange={(e) => setFormData({ ...formData, oneTimeDeduct: e.target.value })}
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    label="Monthly Installment Amount"
                    fullWidth
                    required
                    InputProps={{ startAdornment: <Box mr={1}>INR</Box> }}
                    value={formData.monthlyInstallment}
                    onChange={(e) => setFormData({ ...formData, monthlyInstallment: e.target.value })}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Reason"
                    multiline
                    minRows={1}
                    fullWidth
                    required
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  />
                </Grid>
              </Grid>

              {/* Form Buttons */}
              <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
                <Button
                  onClick={handleReset}
                  variant="outlined"
                  sx={{
                    color: "#7c3aed",
                    borderColor: "#7c3aed",
                    borderRadius: "8px",
                    textTransform: "none",
                    "&:hover": {
                      borderColor: "#6b21a8",
                    },
                  }}
                >
                  Reset
                </Button>

                <Button
                  onClick={handleSave}
                  variant="contained"
                  sx={{
                    backgroundColor: "#7c3aed",
                    borderRadius: "8px",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#6b21a8",
                    },
                  }}
                >
                  Save
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Table Container */}
      <Card>
        <CardContent>
          {/* Label above the Rows per Page dropdown */}
          <Typography variant="h6" gutterBottom>List All Request Loan</Typography>

          <Box display="flex" justifyContent="space-between" mb={2}>
            <Select
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
              sx={{
                width: "auto",
                fontSize: "0.875rem",
                borderRadius: "8px",
              }}
            >
              <MenuItem value={5}>5 rows</MenuItem>
              <MenuItem value={10}>10 rows</MenuItem>
              <MenuItem value={20}>20 rows</MenuItem>
              <MenuItem value={50}>50 rows</MenuItem>
            </Select>
            <TextField
              label="Search Employee"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ width: "250px" }}
            />
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "employee"}
                      direction={orderBy === "employee" ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, "employee")}
                    >
                      EMPLOYEE
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "amount"}
                      direction={orderBy === "amount" ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, "amount")}
                    >
                      AMOUNT
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "monthYear"}
                      direction={orderBy === "monthYear" ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, "monthYear")}
                    >
                      MONTH/YEAR
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "oneTimeDeduct"}
                      direction={orderBy === "oneTimeDeduct" ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, "oneTimeDeduct")}
                    >
                      ONE TIME DEDUCT
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "emi"}
                      direction={orderBy === "emi" ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, "emi")}
                    >
                      EMI
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortData(filteredSalaryList)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.employee}</TableCell>
                      <TableCell>{row.amount}</TableCell>
                      <TableCell>{row.monthYear}</TableCell>
                      <TableCell>{row.oneTimeDeduct}</TableCell>
                      <TableCell>{row.emi}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
         {/* Pagination */}
<Box sx={{ mt: 2 }}>
  <Grid container justifyContent="flex-end" alignItems="center" spacing={1}>
    <Grid item>
      <Button
        variant="outlined"
        size="small"
        onClick={() => setPage(page - 1)}
        disabled={page === 0}
        sx={{
          color: '#7C3AED',
          borderColor: '#7C3AED',
          '&:hover': {
            backgroundColor: '#7C3AED',
            borderColor: '#7C3AED',
            color: 'white',
          },
        }}
      >
        Previous
      </Button>
    </Grid>

    <Grid item>
      Page {page + 1} of {Math.max(1, Math.ceil(filteredSalaryList.length / rowsPerPage))}
    </Grid>

    <Grid item>
      <Button
        variant="outlined"
        size="small"
        onClick={() => setPage(page + 1)}
        disabled={page >= Math.ceil(filteredSalaryList.length / rowsPerPage) - 1}
        sx={{
          color: '#7C3AED',
          borderColor: '#7C3AED',
          '&:hover': {
            backgroundColor: '#7C3AED',
            borderColor: '#7C3AED',
            color: 'white',
          },
        }}
      >
        Next
      </Button>
    </Grid>
  </Grid>
</Box>

        </CardContent>
      </Card>
    </Box>
  );
};

export default Loan;
