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

function Deposit() {
  const [deposit, setDeposit] = useState({
    accountTitle: "",
    amount: "",
    date: new Date(),
    category: "",
    payer: "",
    paymentMethod: "",
    referenceNo: "",
    description: "",
    attachment: null,
  });

  const [depositsList, setDepositsList] = useState([
    {
      id: 1,
      accountTitle: "Business Account",
      amount: "5000",
      date: new Date("2023-10-01"),
      category: "Sales",
      payer: "Client A",
      paymentMethod: "Cash",
      referenceNo: "REF12345",
      description: "Payment for services",
      attachment: null,
    },
    {
      id: 2,
      accountTitle: "Personal Savings",
      amount: "2000",
      date: new Date("2023-10-15"),
      category: "Investment",
      payer: "Self",
      paymentMethod: "Online",
      referenceNo: "REF67890",
      description: "Monthly savings",
      attachment: null,
    },
    {
      id: 3,
      accountTitle: "Corporate Account",
      amount: "7500",
      date: new Date("2023-11-01"),
      category: "Project",
      payer: "Client B",
      paymentMethod: "Cheque",
      referenceNo: "REF11223",
      description: "Project deposit",
      attachment: null,
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeposit({ ...deposit, [name]: value });
  };

  const handleDateChange = (date) => {
    setDeposit({ ...deposit, date });
  };

  const handleFileChange = (e) => {
    setDeposit({ ...deposit, attachment: e.target.files[0] });
  };

  const handleAddDeposit = () => {
    const newDeposit = { ...deposit, id: depositsList.length + 1 };
    setDepositsList([...depositsList, newDeposit]);
    setDeposit({
      accountTitle: "",
      amount: "",
      date: new Date(),
      category: "",
      payer: "",
      paymentMethod: "",
      referenceNo: "",
      description: "",
      attachment: null,
    });
  };

  const handleEditDeposit = (id) => {
    const depositToEdit = depositsList.find((dep) => dep.id === id);
    setDeposit(depositToEdit);
    handleDeleteDeposit(id);
  };

  const handleDeleteDeposit = (id) => {
    setDepositsList(depositsList.filter((dep) => dep.id !== id));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Deposits
      </Typography>

      <Grid container spacing={2}>
        {/* Add New Deposit Form */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Add New Deposit
              </Typography>
              <TextField
                label="Account Title"
                name="accountTitle"
                value={deposit.accountTitle}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Amount"
                name="amount"
                value={deposit.amount}
                onChange={handleInputChange}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">INR</InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
              <DatePicker
                label="Date"
                value={deposit.date}
                onChange={handleDateChange}
                renderInput={(params) => (
                  <TextField {...params} fullWidth sx={{ mb: 2 }} />
                )}
              />
              <TextField
                label="Category"
                name="category"
                value={deposit.category}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Payer"
                name="payer"
                value={deposit.payer}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Payment Method"
                name="paymentMethod"
                value={deposit.paymentMethod}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Reference No"
                name="referenceNo"
                value={deposit.referenceNo}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Description"
                name="description"
                value={deposit.description}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ mt: 2 }}
              >
                Upload Deposit Attachment
                <input type="file" hidden onChange={handleFileChange} />
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddCircleIcon />}
                onClick={handleAddDeposit}
                fullWidth
                sx={{ mt: 2 }}
              >
                Add Deposit
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* List All Deposits */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                List All Deposits
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Account Title</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {depositsList.map((dep) => (
                      <TableRow key={dep.id}>
                        <TableCell>{dep.accountTitle}</TableCell>
                        <TableCell>{dep.amount}</TableCell>
                        <TableCell>{dep.date.toLocaleDateString()}</TableCell>
                        <TableCell>
                          <IconButton
                            color="primary"
                            onClick={() => handleEditDeposit(dep.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleDeleteDeposit(dep.id)}
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

export default Deposit;
