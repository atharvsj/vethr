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

const leaves = [
    {
        name: "Janhavi Phadtare",
        type: "Casual Leave (CL)",
        date: "02-06-2025 To 03-06-2025",
        days: 2,
        reason: "Family function",
        status: "Approved",
    },
    {
        name: "Janhavi Phadtare",
        type: "Casual Leave (CL)",
        date: "04-06-2025 To 04-06-2025",
        days: 1,
        reason: "Family function",
        status: "Pending",
    },
    {
        name: "Janhavi Phadtare",
        type: "Casual Leave (CL)",
        date: "07-06-2025 To 07-06-2025",
        days: 1,
        reason: "Was not feeling well",
        status: "Pending",
    },
    {
        name: "Kumar Patil",
        type: "Casual Leave (CL)",
        date: "06-06-2025 To 06-06-2025",
        days: 1,
        reason: "personal",
        status: "Pending",
    },
    {
        name: "Narasimhamurthy N",
        type: "Casual Leave (CL)",
        date: "09-06-2025 To 09-06-2025",
        days: 1,
        reason: "Some emergency personal issue",
        status: "Pending",
    },
    {
        name: "Pavan Ghadigaonkar",
        type: "Privilege Leave (PL)",
        date: "13-06-2025 To 13-06-2025",
        days: 0.5,
        reason: "personal",
        status: "Pending",
    },
    {
        name: "Prakashan K V",
        type: "Casual Leave (CL)",
        date: "02-06-2025 To 02-06-2025",
        days: 1,
        reason: "Personal",
        status: "Pending",
    },
    {
        name: "Pranali Gaikwad",
        type: "Casual Leave (CL)",
        date: "09-06-2025 To 10-06-2025",
        days: 2,
        reason: "festival",
        status: "Pending",
    },
    {
        name: "Rahul Laykar",
        type: "Casual Leave (CL)",
        date: "03-06-2025 To 03-06-2025",
        days: 1,
        reason: "medical checkup",
        status: "Pending",
    },
    {
        name: "Sarita Mohite",
        type: "Casual Leave (CL)",
        date: "02-06-2025 To 02-06-2025",
        days: 1,
        reason: "personal work",
        status: "Pending",
    },
];

const LeaveTypewiseTable = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState("");

    const handleChangePage = (_, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };

    const filtered = leaves.filter((item) =>
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
                Leave Typewise on – <b>Jun 2025</b>
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
                        <TableHead>
                            <TableRow>
                                <TableCell><b>EMPLOYEE NAME</b></TableCell>
                                <TableCell><b>LEAVE TYPE</b></TableCell>
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
                                        <TableCell>{row.type}</TableCell>
                                        <TableCell>{row.date}</TableCell>
                                        <TableCell>{row.days}</TableCell>
                                        <TableCell>{row.reason}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={row.status}
                                                color={row.status === "Approved" ? "success" : "warning"}
                                                size="small"
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            {filtered.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
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

export default LeaveTypewiseTable;
