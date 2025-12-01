import React, { useState } from "react";
import {
    Box,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    TextField,
    Chip,
} from "@mui/material";

const approvals = [
    {
        name: "Akash Gore",
        date: "05-06-2025 To 05-06-2025",
        days: 1,
        reason: "medical",
        status: "Pending",
    },
    {
        name: "Ashok Bhange",
        date: "14-06-2025 To 17-06-2025",
        days: 4,
        reason: "medical problem",
        status: "Pending",
    },
    {
        name: "Chetan Bose",
        date: "03-06-2025 To 03-06-2025",
        days: 1,
        reason: "hospital issue",
        status: "Pending",
    },
    {
        name: "Ganesh Mohite",
        date: "11-06-2025 To 11-06-2025",
        days: 1,
        reason: "Sickness",
        status: "Pending",
    },
    {
        name: "Haresh Dharne",
        date: "05-06-2025 To 05-06-2025",
        days: 1,
        reason: "not feeling well.",
        status: "Pending",
    },
    {
        name: "Janhavi Phadtare",
        date: "04-06-2025 To 04-06-2025",
        days: 1,
        reason: "Family function",
        status: "Pending",
    },
    {
        name: "Janhavi Phadtare",
        date: "07-06-2025 To 07-06-2025",
        days: 1,
        reason: "Was not feeling well",
        status: "Pending",
    },
    {
        name: "Kumar Patil",
        date: "06-06-2025 To 06-06-2025",
        days: 1,
        reason: "personal",
        status: "Pending",
    },
    {
        name: "Kumar Patil",
        date: "10-06-2025 To 10-06-2025",
        days: 1,
        reason: "Personal",
        status: "Pending",
    },
    {
        name: "Milind Gurav",
        date: "04-06-2025 To 04-06-2025",
        days: 1,
        reason: "seak",
        status: "Pending",
    },
];

const PendingApprovalsTable = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState("");

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filtered = approvals.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Paper
            elevation={3}
            sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 3,
                backgroundColor: "#fff",
                width: "100%",
                mt: 4,
            }}
        >
            <Typography variant="h6" gutterBottom>
                Pending Approvals in – <b>Jun 2025</b>
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", mb: 2 }}>
                <TextField
                    label="Search"
                    size="small"
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{ width: { xs: "100%", sm: "250px" }, mb: { xs: 2, sm: 0 } }}
                />
            </Box>

            <Box sx={{ overflowX: "auto" }}>
                <TableContainer>
                    <Table stickyHeader>
                        <TableHead sx={{ backgroundColor: "#f5f7fa" }}>
                            <TableRow>
                                <TableCell><b>EMPLOYEE NAME</b></TableCell>
                                <TableCell><b>DATE</b></TableCell>
                                <TableCell><b>NO. OF DAYS</b></TableCell>
                                <TableCell><b>REASON</b></TableCell>
                                <TableCell><b>STATUS</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filtered
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.date}</TableCell>
                                        <TableCell>{row.days}</TableCell>
                                        <TableCell>{row.reason}</TableCell>
                                        <TableCell>
                                            <Chip label={row.status} color="warning" size="small" />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            {filtered.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        No results found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <TablePagination
                component="div"
                count={filtered.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Paper>
    );
};

export default PendingApprovalsTable;
