import React, { useState } from "react";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    TablePagination,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";

// Sample data
const birthdayData = [
    { name: "Alakonda Reddy", dob: "1991-06-08", dept: "Sales", role: "Veterinary Sales Officer" },
    { name: "Aniket Navagire", dob: "1998-06-28", dept: "Sales", role: "Vetzone Supervisor" },
    { name: "Ashok Bhange", dob: "1993-06-18", dept: "Sales", role: "Sr. Area Sales Manager" },
    { name: "Irshad Inamdar", dob: "1988-06-22", dept: "Sales", role: "Vetzone Supervisor" },
    { name: "Johnson T", dob: "1992-06-23", dept: "Sales", role: "Veterinary Sales Officer" },
    { name: "MANSING BHANUSE", dob: "1993-06-04", dept: "Sales", role: "Vetzone Supervisor" },
    { name: "Mohit Chatrath", dob: "1993-06-08", dept: "Sales", role: "Area Sales Manager" },
    { name: "Nagaraju Bembari", dob: "1988-06-10", dept: "Sales", role: "Area Sales Manager" },
    { name: "Neha Kshirsagar", dob: "1991-06-25", dept: "QA AND QC", role: "QA/QC Executive" },
    { name: "Omkar Bastawadkar", dob: "2000-06-10", dept: "Sales", role: "Veterinary Sales Officer" },
    { name: "Extra Employee", dob: "1995-06-12", dept: "Sales", role: "Junior Manager" },
    { name: "Another One", dob: "1990-06-15", dept: "Sales", role: "Team Lead" },
    // add more if needed
];

const BirthdayTable = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredData = birthdayData.filter((row) =>
        row.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box p={3}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
                Birthdays In Month
            </Typography>

            <Paper>
                <Box p={2} display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                        <InputLabel id="rows-label">Show</InputLabel>
                        <Select
                            labelId="rows-label"
                            value={rowsPerPage}
                            onChange={handleChangeRowsPerPage}
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
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Box>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#f5f7fa" }}>
                                <TableCell><strong>NAME OF EMPLOYEE</strong></TableCell>
                                <TableCell><strong>DATE OF BIRTH</strong></TableCell>
                                <TableCell><strong>DEPARTMENT</strong></TableCell>
                                <TableCell><strong>DESIGNATION</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.dob}</TableCell>
                                        <TableCell>{row.dept}</TableCell>
                                        <TableCell>{row.role}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box display="flex" justifyContent="space-between" alignItems="center" px={2}>
                    <Typography variant="body2">
                        Showing {page * rowsPerPage + 1} to{" "}
                        {Math.min((page + 1) * rowsPerPage, filteredData.length)} of {filteredData.length} entries
                    </Typography>

                    <TablePagination
                        component="div"
                        count={filteredData.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[]}
                    />
                </Box>
            </Paper>
        </Box>
    );
};

export default BirthdayTable;
