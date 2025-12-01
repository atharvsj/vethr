import React, { useState } from "react";
import {
    Box,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Paper,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    TablePagination,
} from "@mui/material";

const anniversaryData = [
    { name: "Abhijeet Kadam", doj: "05-06-2024", dept: "Sales", role: "Vetzone Supervisor" },
    { name: "Achal Bhadane", doj: "27-06-2024", dept: "Production", role: "Production Supervisor" },
    { name: "Aditya Shinde", doj: "05-06-2024", dept: "Sales", role: "Vetzone Supervisor" },
    { name: "Ajay Kumar Azad", doj: "08-06-2024", dept: "Sales", role: "Area Sales Manager" },
    { name: "Akshay Patil", doj: "2023-06-05", dept: "Sales", role: "Veterinary Sales Officer" },
    { name: "Aman Soni", doj: "27-06-2024", dept: "Sales", role: "Veterinary Sales Officer" },
    { name: "Ankit Kumar", doj: "27-06-2024", dept: "Sales", role: "Veterinary Sales Officer" },
    { name: "Ashish Singh", doj: "05-06-2024", dept: "Sales", role: "Veterinary Sales Officer" },
    { name: "Brijesh Kumar", doj: "05-06-2024", dept: "Sales", role: "Veterinary Sales Officer" },
    { name: "Chekuri Basavayya", doj: "27-06-2024", dept: "Sales", role: "Veterinary Sales Officer" },
    // Add more data as needed
];

const WorkAnniversary = () => {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("");

    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const filteredData = anniversaryData.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    const paginatedData = filteredData.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <Box p={2}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
                Work Anniversary In Month
            </Typography>

            <Paper>
                <Box
                    p={2}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    flexWrap="wrap"
                    gap={2}
                >
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                        <InputLabel id="entries-label">Show</InputLabel>
                        <Select
                            labelId="entries-label"
                            value={rowsPerPage}
                            onChange={handleRowsPerPageChange}
                            label="Show"
                        >
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={15}>15</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        size="small"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Box>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#f5f7fa" }}>
                                <TableCell><strong>NAME OF EMPLOYEE</strong></TableCell>
                                <TableCell><strong>DATE OF JOINING</strong></TableCell>
                                <TableCell><strong>DEPARTMENT</strong></TableCell>
                                <TableCell><strong>DESIGNATION</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedData.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.doj}</TableCell>
                                    <TableCell>{row.dept}</TableCell>
                                    <TableCell>{row.role}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    px={2}
                    py={1}
                >
                    <Typography variant="body2">
                        Showing {page * rowsPerPage + 1} to{" "}
                        {Math.min((page + 1) * rowsPerPage, filteredData.length)} of {filteredData.length} entries
                    </Typography>

                    <TablePagination
                        component="div"
                        count={filteredData.length}
                        page={page}
                        onPageChange={handlePageChange}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[]}
                    />
                </Box>
            </Paper>

            {/* Confirmation Pending Section */}
            {/* <Box mt={4}>
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
            </Box> */}
        </Box>
    );
};

export default WorkAnniversary;
