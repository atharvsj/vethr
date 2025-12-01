// src/components/ConfirmationPending.jsx

import React from "react";
import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

const ConfirmationPending = () => {
    return (
        <Box p={2}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
                Confirmation Pending
            </Typography>
            
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#f5f7fa" }}>
                                <TableCell><strong>DATE</strong></TableCell>
                                <TableCell><strong>EMPLOYEE NAME</strong></TableCell>
                                <TableCell><strong>DEPARTMENT</strong></TableCell>
                                <TableCell><strong>ACTION</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    No pending confirmations
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default ConfirmationPending;
