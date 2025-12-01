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
  InputAdornment,
  IconButton,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function Account() {
  const [account, setAccount] = useState({
    title: "",
    balance: "",
    accountNumber: "",
    branchCode: "",
    bankBranch: "",
  });
  const [accountsList, setAccountsList] = useState([
    {
      id: 1,
      title: "Reimbursement",
      accountNumber: "1234567890",
      balance: "₹10,000.00",
      branchCode: "001",
      bankBranch: "Main Branch",
    },
    {
      id: 1,
      title: "Reimbursement",
      accountNumber: "1234567890",
      balance: "₹10,000.00",
      branchCode: "001",
      bankBranch: "Main Branch",
    },
    {
      id: 1,
      title: "Reimbursement",
      accountNumber: "1234567890",
      balance: "₹10,000.00",
      branchCode: "001",
      bankBranch: "Main Branch",
    },
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const handleAddAccount = () => {
    if (isEditing) {
      setAccountsList(
        accountsList.map((acc) =>
          acc.id === editingId ? { ...account, id: editingId } : acc
        )
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      const newAccount = { ...account, id: accountsList.length + 1 };
      setAccountsList([...accountsList, newAccount]);
    }
    setAccount({
      title: "",
      balance: "",
      accountNumber: "",
      branchCode: "",
      bankBranch: "",
    });
  };

  const handleEditAccount = (id) => {
    const accountToEdit = accountsList.find((acc) => acc.id === id);
    setAccount(accountToEdit);
    setIsEditing(true);
    setEditingId(id);
  };

  const handleDeleteAccount = (id) => {
    setAccountsList(accountsList.filter((acc) => acc.id !== id));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Accounts
      </Typography>

      <Grid container spacing={2}>
        {/* Add/Edit Account Form */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {isEditing ? "Edit Account" : "Add New Account"}
              </Typography>
              <TextField
                label="Account Title"
                name="title"
                value={account.title}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Initial Balance"
                name="balance"
                value={account.balance}
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
                label="Account Number"
                name="accountNumber"
                value={account.accountNumber}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Branch Code"
                name="branchCode"
                value={account.branchCode}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Bank Branch"
                name="bankBranch"
                value={account.bankBranch}
                onChange={handleInputChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                startIcon={isEditing ? <EditIcon /> : <AddCircleIcon />}
                onClick={handleAddAccount}
                fullWidth
                sx={{ mt: 2 }}
              >
                {isEditing ? "Update Account" : "Add Account"}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* List All Accounts */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                List All Accounts
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Account Title</TableCell>
                      <TableCell>Account Number</TableCell>
                      <TableCell>Balance</TableCell>
                      <TableCell>Bank Branch</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {accountsList.map((acc) => (
                      <TableRow key={acc.id}>
                        <TableCell>{acc.title}</TableCell>
                        <TableCell>{acc.accountNumber}</TableCell>
                        <TableCell>{acc.balance}</TableCell>
                        <TableCell>{acc.bankBranch}</TableCell>
                        <TableCell>
                          <IconButton
                            color="primary"
                            onClick={() => handleEditAccount(acc.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleDeleteAccount(acc.id)}
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

export default Account;
