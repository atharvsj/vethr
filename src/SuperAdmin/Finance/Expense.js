import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DatePicker } from "@mui/lab";

function Expense() {
  const [expense, setExpense] = useState({
    accountTitle: "",
    payee: "",
    amount: "",
    category: "",
    referenceNo: "",
    paymentMethod: "",
    date: new Date(),
  });

  const [expensesList, setExpensesList] = useState([
    {
      id: 1,
      accountTitle: "Office Supplies",
      payee: "ABC Stationery",
      amount: "1500",
      category: "Office",
      referenceNo: "12345",
      paymentMethod: "Credit Card",
      date: new Date("2024-11-01"),
    },
    {
      id: 2,
      accountTitle: "Travel Expenses",
      payee: "XYZ Airlines",
      amount: "5000",
      category: "Travel",
      referenceNo: "67890",
      paymentMethod: "Debit Card",
      date: new Date("2024-11-05"),
    },
    {
      id: 3,
      accountTitle: "Employee Salary",
      payee: "John Doe",
      amount: "30000",
      category: "Salary",
      referenceNo: "11223",
      paymentMethod: "Bank Transfer",
      date: new Date("2024-11-10"),
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleDateChange = (date) => {
    setExpense({ ...expense, date });
  };

  const handleAddExpense = () => {
    const newExpense = { ...expense, id: expensesList.length + 1 };
    setExpensesList([...expensesList, newExpense]);
    setExpense({
      accountTitle: "",
      payee: "",
      amount: "",
      category: "",
      referenceNo: "",
      paymentMethod: "",
      date: new Date(),
    });
  };

  const handleEditExpense = (id) => {
    const expenseToEdit = expensesList.find((exp) => exp.id === id);
    setExpense(expenseToEdit);
    handleDeleteExpense(id);
  };

  const handleDeleteExpense = (id) => {
    setExpensesList(expensesList.filter((exp) => exp.id !== id));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Expenses
      </Typography>

      <Grid container spacing={2}>
        {/* Add New Expense Form */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Add New Expense
              </Typography>
              <TextField
                label="Account Title"
                name="accountTitle"
                value={expense.accountTitle}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Payee"
                name="payee"
                value={expense.payee}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Amount"
                name="amount"
                value={expense.amount}
                onChange={handleInputChange}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">INR</InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Category"
                name="category"
                value={expense.category}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Reference No"
                name="referenceNo"
                value={expense.referenceNo}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Payment Method"
                name="paymentMethod"
                value={expense.paymentMethod}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <DatePicker
                label="Date"
                value={expense.date}
                onChange={handleDateChange}
                renderInput={(params) => (
                  <TextField {...params} fullWidth sx={{ mb: 2 }} />
                )}
              />
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddCircleIcon />}
                onClick={handleAddExpense}
                fullWidth
                sx={{ mt: 2 }}
              >
                Add Expense
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* List All Expenses */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                List All Expenses
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Account Title</TableCell>
                      <TableCell>Payee</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {expensesList.map((exp) => (
                      <TableRow key={exp.id}>
                        <TableCell>{exp.accountTitle}</TableCell>
                        <TableCell>{exp.payee}</TableCell>
                        <TableCell>{exp.amount}</TableCell>
                        <TableCell>{exp.date.toLocaleDateString()}</TableCell>
                        <TableCell>
                          <IconButton
                            color="primary"
                            onClick={() => handleEditExpense(exp.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleDeleteExpense(exp.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Expense;
