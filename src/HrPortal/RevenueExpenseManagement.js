import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.common.white,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
  },
}));

const months = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

export default function RevenueExpenseManagement() {
  const [revenueExpenses, setRevenueExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [formData, setFormData] = useState({
    month: new Date().getMonth() + 1,
    year: currentYear,
    revenue: "",
    expense: "",
    type: "both", // both, revenue, or expense
  });

  const accessToken = localStorage.getItem("accessToken");
  const headers = { Authorization: `Bearer ${accessToken}` };

  // Fetch data
  useEffect(() => {
    fetchRevenueExpenses();
  }, []);

  const fetchRevenueExpenses = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://tdtlworld.com/hrms-backend/api/save_hr_revenue_expense/",
        { headers }
      );
      setRevenueExpenses(response.data || []);
    } catch (error) {
      console.error("Failed to fetch revenue/expense data:", error);
      setSnackbar({
        open: true,
        message: "Failed to load revenue/expense data",
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDialog = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setFormData({
        month: item.month,
        year: item.year,
        revenue: item.revenue || "",
        expense: item.expense || "",
        type: item.revenue && item.expense ? "both" : item.revenue ? "revenue" : "expense",
      });
    } else {
      setEditingId(null);
      setFormData({
        month: new Date().getMonth() + 1,
        year: currentYear,
        revenue: "",
        expense: "",
        type: "both",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    // Validation
    if (!formData.month || !formData.year) {
      setSnackbar({
        open: true,
        message: "Please select month and year",
        severity: "warning",
      });
      return;
    }

    if (formData.type === "both" && (!formData.revenue || !formData.expense)) {
      setSnackbar({
        open: true,
        message: "Please enter both revenue and expense",
        severity: "warning",
      });
      return;
    }

    if (
      formData.type === "revenue" &&
      !formData.revenue
    ) {
      setSnackbar({
        open: true,
        message: "Please enter revenue amount",
        severity: "warning",
      });
      return;
    }

    if (
      formData.type === "expense" &&
      !formData.expense
    ) {
      setSnackbar({
        open: true,
        message: "Please enter expense amount",
        severity: "warning",
      });
      return;
    }

    try {
      const payload = {
        month: formData.month,
        year: formData.year,
        revenue: formData.type === "both" || formData.type === "revenue" ? parseFloat(formData.revenue) : null,
        expense: formData.type === "both" || formData.type === "expense" ? parseFloat(formData.expense) : null,
      };

      if (editingId) {
        // Update
        await axios.patch(
          `https://tdtlworld.com/hrms-backend/api/save_hr_revenue_expense/${editingId}/`,
          payload,
          { headers }
        );
        setSnackbar({
          open: true,
          message: "Revenue/Expense updated successfully",
          severity: "success",
        });
      } else {
        // Create
        await axios.post(
          "https://tdtlworld.com/hrms-backend/api/save_hr_revenue_expense/",
          payload,
          { headers }
        );
        setSnackbar({
          open: true,
          message: "Revenue/Expense saved successfully",
          severity: "success",
        });
      }

      handleCloseDialog();
      fetchRevenueExpenses();
    } catch (error) {
      console.error("Save failed:", error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to save data",
        severity: "error",
      });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(
          `https://tdtlworld.com/hrms-backend/api/save_hr_revenue_expense/${id}/`,
          { headers }
        );
        setSnackbar({
          open: true,
          message: "Record deleted successfully",
          severity: "success",
        });
        fetchRevenueExpenses();
      } catch (error) {
        console.error("Delete failed:", error);
        setSnackbar({
          open: true,
          message: "Failed to delete record",
          severity: "error",
        });
      }
    }
  };

  const getMonthName = (month) => {
    return months.find((m) => m.value === month)?.label || "Unknown";
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          Revenue & Expense Management
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage monthly revenue and expense records for HR analytics
        </Typography>
      </Box>

      {/* Add Button */}
      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{
            backgroundColor: "#8C257C",
            "&:hover": { backgroundColor: "#6d1d60" },
          }}
        >
          Add New Record
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Month</StyledTableCell>
              <StyledTableCell align="center">Year</StyledTableCell>
              <StyledTableCell align="right">Revenue (₹)</StyledTableCell>
              <StyledTableCell align="right">Expense (₹)</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {revenueExpenses.length > 0 ? (
              revenueExpenses.map((item) => (
                <StyledTableRow key={item.id}>
                  <TableCell align="center">
                    {getMonthName(item.month)}
                  </TableCell>
                  <TableCell align="center">{item.year}</TableCell>
                  <TableCell align="right">
                    {item.revenue ? `₹${item.revenue.toLocaleString("en-IN")}` : "-"}
                  </TableCell>
                  <TableCell align="right">
                    {item.expense ? `₹${item.expense.toLocaleString("en-IN")}` : "-"}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(item)}
                      sx={{ color: "#8C257C" }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(item.id)}
                      sx={{ color: "#F58E35" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">
                    No records found. Click "Add New Record" to create one.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingId ? "Edit Revenue & Expense" : "Add Revenue & Expense"}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Month</InputLabel>
                <Select
                  name="month"
                  value={formData.month}
                  onChange={handleInputChange}
                  label="Month"
                >
                  {months.map((m) => (
                    <MenuItem key={m.value} value={m.value}>
                      {m.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Year</InputLabel>
                <Select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  label="Year"
                >
                  {years.map((y) => (
                    <MenuItem key={y} value={y}>
                      {y}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  label="Type"
                >
                  <MenuItem value="both">Both Revenue & Expense</MenuItem>
                  <MenuItem value="revenue">Revenue Only</MenuItem>
                  <MenuItem value="expense">Expense Only</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {(formData.type === "both" || formData.type === "revenue") && (
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Revenue (₹)"
                  type="number"
                  name="revenue"
                  value={formData.revenue}
                  onChange={handleInputChange}
                  placeholder="Enter revenue amount"
                  inputProps={{ step: "0.01" }}
                />
              </Grid>
            )}

            {(formData.type === "both" || formData.type === "expense") && (
              <Grid item xs={12} sm={formData.type === "both" ? 6 : 12}>
                <TextField
                  fullWidth
                  label="Expense (₹)"
                  type="number"
                  name="expense"
                  value={formData.expense}
                  onChange={handleInputChange}
                  placeholder="Enter expense amount"
                  inputProps={{ step: "0.01" }}
                />
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              backgroundColor: "#8C257C",
              "&:hover": { backgroundColor: "#6d1d60" },
            }}
          >
            {editingId ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
      

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

