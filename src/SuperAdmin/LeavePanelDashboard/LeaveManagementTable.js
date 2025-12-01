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
    TextField,
    TablePagination,
    Select,
    MenuItem,
    Chip
} from "@mui/material";

const leaveData = [
    { name: "Akash Gore", dept: "Sales", date: "2025-06-05", end: "2025-06-05", days: 1, reason: "medical", status: "Pending" },
    { name: "Ashok Bhange", dept: "Sales", date: "2025-06-14", end: "2025-06-17", days: 4, reason: "medical problem", status: "Pending" },
    { name: "Chetan Bose", dept: "Sales", date: "2025-06-03", end: "2025-06-03", days: 1, reason: "hospital issue", status: "Pending" },
    { name: "Ganesh Mohite", dept: "Sales", date: "2025-06-11", end: "2025-06-11", days: 1, reason: "Sickness", status: "Pending" },
    { name: "Haresh Dharne", dept: "Marketing", date: "2025-06-05", end: "2025-06-05", days: 1, reason: "not feeling well.", status: "Pending" },
    { name: "Janhavi Phadtare", dept: "Marketing", date: "2025-06-02", end: "2025-06-03", days: 2, reason: "Family function", status: "Approved" },
    { name: "Janhavi Phadtare", dept: "Marketing", date: "2025-06-04", end: "2025-06-04", days: 1, reason: "Family function", status: "Pending" },
    { name: "Janhavi Phadtare", dept: "Marketing", date: "2025-06-07", end: "2025-06-07", days: 1, reason: "Was not feeling well", status: "Pending" },
    { name: "Kumar Patil", dept: "Sales", date: "2025-06-06", end: "2025-06-06", days: 1, reason: "personal", status: "Pending" },
    { name: "Kumar Patil", dept: "Sales", date: "2025-06-10", end: "2025-06-10", days: 1, reason: "Personal", status: "Pending" },
];

const LeaveTable = () => {
    const [search, setSearch] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);

    const filteredData = leaveData.filter((row) =>
        row.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper
            elevation={1}
            sx={{
                p: 2,
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                backgroundColor: "#fff",
                overflow: "hidden",
                mt: 4,

            }}
        >
            <Typography variant="h6" gutterBottom>
                Leave Department wise on - <strong>Jun 2025</strong>
            </Typography>

            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Select
                    size="small"
                    value={rowsPerPage}
                    onChange={handleChangeRowsPerPage}
                >
                    {[5, 10, 25].map((num) => (
                        <MenuItem key={num} value={num}>
                            {num}
                        </MenuItem>
                    ))}
                </Select>

                <TextField
                    size="small"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Box>

            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>EMPLOYEE NAME</b></TableCell>
                            <TableCell><b>DEPARTMENT</b></TableCell>
                            <TableCell><b>DATE</b></TableCell>
                            <TableCell><b>NO. OF DAYS</b></TableCell>
                            <TableCell><b>REASON</b></TableCell>
                            <TableCell><b>STATUS</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.dept}</TableCell>
                                    <TableCell>{row.date} - {row.end}</TableCell>
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
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={filteredData.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default LeaveTable;