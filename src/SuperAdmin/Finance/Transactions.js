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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DatePicker } from "@mui/lab";

function Transactions() {
  const [transaction, setTransaction] = useState({
    accountTitle: "",
    date: new Date(),
    activity: "credit",
    type: "cash",
    amount: "",
    referenceNo: "",
  });

  const [transactionsList, setTransactionsList] = useState([
    {
      id: 1,
      accountTitle: "Savings Account",
      date: new Date(),
      activity: "credit",
      type: "online",
      amount: "1000",
      referenceNo: "ABC123",
    },
    {
      id: 2,
      accountTitle: "Business Account",
      date: new Date(),
      activity: "debit",
      type: "cash",
      amount: "500",
      referenceNo: "",
    },
    {
      id: 3,
      accountTitle: "Investment Account",
      date: new Date(),
      activity: "credit",
      type: "online",
      amount: "1500",
      referenceNo: "XYZ789",
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });
  };

  const handleDateChange = (date) => {
    setTransaction({ ...transaction, date });
  };

  const handleAddTransaction = () => {
    const newTransaction = { ...transaction, id: transactionsList.length + 1 };
    setTransactionsList([...transactionsList, newTransaction]);
    setTransaction({
      accountTitle: "",
      date: new Date(),
      activity: "credit",
      type: "cash",
      amount: "",
      referenceNo: "",
    });
  };

  const handleEditTransaction = (id) => {
    const transactionToEdit = transactionsList.find((tran) => tran.id === id);
    setTransaction(transactionToEdit);
    handleDeleteTransaction(id);
  };

  const handleDeleteTransaction = (id) => {
    setTransactionsList(transactionsList.filter((tran) => tran.id !== id));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Transactions
      </Typography>

      <Grid container spacing={2}>
        {/* Add New Transaction Form */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Add New Transaction
              </Typography>
              <TextField
                label="Account Title"
                name="accountTitle"
                value={transaction.accountTitle}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <DatePicker
                label="Date"
                value={transaction.date}
                onChange={handleDateChange}
                renderInput={(params) => (
                  <TextField {...params} fullWidth sx={{ mb: 2 }} />
                )}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel shrink>Activity</InputLabel>
                <Select
                  name="activity"
                  value={transaction.activity}
                  onChange={handleInputChange}
                  label="Activity"
                  InputLabelProps={{ shrink: true }}
                >
                  <MenuItem value="credit">Credit</MenuItem>
                  <MenuItem value="debit">Debit</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel shrink>Type</InputLabel>
                <Select
                  name="type"
                  value={transaction.type}
                  onChange={handleInputChange}
                  label="Type"
                  InputLabelProps={{ shrink: true }}
                >
                  <MenuItem value="cash">Cash</MenuItem>
                  <MenuItem value="online">Online</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Amount"
                name="amount"
                value={transaction.amount}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              {transaction.type === "online" && (
                <TextField
                  label="Reference No"
                  name="referenceNo"
                  value={transaction.referenceNo}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
              )}
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddCircleIcon />}
                onClick={handleAddTransaction}
                fullWidth
                sx={{ mt: 2 }}
              >
                Add Transaction
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* List All Transactions */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                List All Transactions
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Account Title</TableCell>
                      <TableCell>Activity</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Reference No</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactionsList.map((tran) => (
                      <TableRow key={tran.id}>
                        <TableCell>{tran.accountTitle}</TableCell>
                        <TableCell>{tran.activity}</TableCell>
                        <TableCell>{tran.type}</TableCell>
                        <TableCell>{tran.amount}</TableCell>
                        <TableCell>
                          {tran.type === "online" ? tran.referenceNo : "-"}
                        </TableCell>
                        <TableCell>{tran.date.toLocaleDateString()}</TableCell>
                        <TableCell>
                          <IconButton
                            color="primary"
                            onClick={() => handleEditTransaction(tran.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleDeleteTransaction(tran.id)}
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

export default Transactions;
