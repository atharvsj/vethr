// import React, { useState } from 'react';
// import {
//     Box,
//     Typography,
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TablePagination,
//     TableRow,
//     TextField,
//     InputAdornment,
//     Select,
//     MenuItem,
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';

// const columns = [
//     'SR. NO.',
//     'EMPLOYEE ID',
//     'EMPLOYEE NAME',
//     'DIVISION',
//     'ALLOCATED TOTAL LEAVE',
//     'LEAVE UTILISED',
//     'LEAVE BALANCE',
// ];

// // Dummy data
// const createRow = (id, name, division, allocated, used, balance) => ({
//     id, name, division, allocated, used, balance
// });

// const data = [
//     createRow('V0001', 'Mangesh Ghadigaonkar', '', 32.5, 0, 32.5),
//     createRow('V0006', 'Kumar Patil', '', 32.5, 28, 4.5),
//     createRow('V0017', 'Ganesh Mohite', '', 32.5, 41, -8.5),
//     createRow('V0020', 'Rupali Mali', '', 32.5, 12, 20.5),
//     createRow('V0075', 'Shailesh Jadhav', '', 32.5, 6, 26.5),
//     createRow('V0077', 'Akshada Chavan', '', 32.5, 53.5, -21),
//     createRow('V0089', 'Yogesh Bisen', '', 32.5, 17, 15.5),
//     createRow('V0123', 'Ashish Shahare', '', 32.5, 3, 29.5),
//     createRow('V0130', 'Ashwini Deshpande', '', 32.5, 4, 28.5),
//     createRow('V0155', 'Ashok Bhange', '', 32.5, 29, 3.5),
// ];

// export default function EmployeePendingLeaveReport() {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [rowsPerPage, setRowsPerPage] = useState(10);
//     const [page, setPage] = useState(0);

//     const filteredData = data.filter(
//         (row) =>
//             row.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             row.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     const handleChangePage = (_, newPage) => setPage(newPage);
//     const handleChangeRowsPerPage = (e) => {
//         setRowsPerPage(+e.target.value);
//         setPage(0);
//     };

//     return (
//         <Box p={3}>
//             <Typography variant="h6" gutterBottom>
//                 Employee Pending Leave Report
//             </Typography>

//             <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                 <Select
//                     size="small"
//                     value={rowsPerPage}
//                     onChange={handleChangeRowsPerPage}
//                 >
//                     {[10, 25, 50, 100].map((count) => (
//                         <MenuItem key={count} value={count}>
//                             Show {count} entries
//                         </MenuItem>
//                     ))}
//                 </Select>

//                 <TextField
//                     size="small"
//                     placeholder="Search"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     InputProps={{
//                         startAdornment: (
//                             <InputAdornment position="start">
//                                 <SearchIcon />
//                             </InputAdornment>
//                         ),
//                     }}
//                 />
//             </Box>

//             <Paper>
//                 <TableContainer>
//                     <Table size="small">
//                         <TableHead>
//                             <TableRow>
//                                 {columns.map((col, idx) => (
//                                     <TableCell key={idx} align="center">
//                                         {col}
//                                     </TableCell>
//                                 ))}
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {filteredData
//                                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                                 .map((row, idx) => (
//                                     <TableRow key={idx}>
//                                         <TableCell align="center">{page * rowsPerPage + idx + 1}</TableCell>
//                                         <TableCell align="center">{row.id}</TableCell>
//                                         <TableCell align="center">{row.name}</TableCell>
//                                         <TableCell align="center">{row.division || '-'}</TableCell>
//                                         <TableCell align="center">{row.allocated}</TableCell>
//                                         <TableCell align="center">{row.used}</TableCell>
//                                         <TableCell align="center">{row.balance}</TableCell>
//                                     </TableRow>
//                                 ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>

//                 <TablePagination
//                     component="div"
//                     count={filteredData.length}
//                     page={page}
//                     onPageChange={handleChangePage}
//                     rowsPerPage={rowsPerPage}
//                     onRowsPerPageChange={handleChangeRowsPerPage}
//                     rowsPerPageOptions={[10, 25, 50, 100]}
//                 />
//             </Paper>
//         </Box>
//     );
// }






import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    InputAdornment,
    Select,
    MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const columns = [
    'SR. NO.',
    'EMPLOYEE ID',
    'EMPLOYEE NAME',
    'DIVISION',
    'ALLOCATED TOTAL LEAVE',
    'LEAVE UTILISED',
    'LEAVE BALANCE',
];

const createRow = (id, name, division, allocated, used, balance) => ({
    id, name, division, allocated, used, balance,
});

const data = [
    createRow('V0001', 'Mangesh Ghadigaonkar', '', 32.5, 0, 32.5),
    createRow('V0006', 'Kumar Patil', '', 32.5, 28, 4.5),
    createRow('V0017', 'Ganesh Mohite', '', 32.5, 41, -8.5),
    createRow('V0020', 'Rupali Mali', '', 32.5, 12, 20.5),
    createRow('V0075', 'Shailesh Jadhav', '', 32.5, 6, 26.5),
    createRow('V0077', 'Akshada Chavan', '', 32.5, 53.5, -21),
    createRow('V0089', 'Yogesh Bisen', '', 32.5, 17, 15.5),
    createRow('V0123', 'Ashish Shahare', '', 32.5, 3, 29.5),
    createRow('V0130', 'Ashwini Deshpande', '', 32.5, 4, 28.5),
    createRow('V0155', 'Ashok Bhange', '', 32.5, 29, 3.5),
];

export default function EmployeePendingLeaveReport() {
    const [searchQuery, setSearchQuery] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);

    const filteredData = data.filter(
        (row) =>
            row.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleChangePage = (_, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(+e.target.value);
        setPage(0);
    };

    return (
        <Box p={3}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
                Employee Pending Leave Report
            </Typography>

            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Select
                    size="small"
                    value={rowsPerPage}
                    onChange={handleChangeRowsPerPage}
                >
                    {[10, 25, 50, 100].map((count) => (
                        <MenuItem key={count} value={count}>
                            Show {count} entries
                        </MenuItem>
                    ))}
                </Select>

                <TextField
                    size="small"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            <Paper sx={{ overflowX: 'auto' }}>
                <TableContainer>
                    <Table stickyHeader size="small">
                        <TableHead>
                            <TableRow>
                                {columns.map((col, idx) => (
                                    <TableCell
                                        key={idx}
                                        align="center"
                                        sx={{
                                            fontWeight: 600,
                                            backgroundColor: '#e3f2fd',
                                            border: '1px solid #ccc',
                                        }}
                                    >
                                        {col}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, idx) => (
                                    <TableRow
                                        key={idx}
                                        sx={{
                                            backgroundColor: (page * rowsPerPage + idx) % 2 === 0 ? '#ffffff' : '#f9f9f9',
                                        }}
                                    >
                                        <TableCell align="center" sx={{ border: '1px solid #ddd' }}>
                                            {page * rowsPerPage + idx + 1}
                                        </TableCell>
                                        <TableCell align="center" sx={{ border: '1px solid #ddd' }}>{row.id}</TableCell>
                                        <TableCell align="center" sx={{ border: '1px solid #ddd' }}>{row.name}</TableCell>
                                        <TableCell align="center" sx={{ border: '1px solid #ddd' }}>{row.division || '-'}</TableCell>
                                        <TableCell align="center" sx={{ border: '1px solid #ddd' }}>{row.allocated}</TableCell>
                                        <TableCell align="center" sx={{ border: '1px solid #ddd' }}>{row.used}</TableCell>
                                        <TableCell align="center" sx={{ border: '1px solid #ddd' }}>{row.balance}</TableCell>
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
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[10, 25, 50, 100]}
                />
            </Paper>
        </Box>
    );
}
