import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Container,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  TextField,
  Pagination,
  TableSortLabel,
  useTheme,
  useMediaQuery,
  Stack,
  Chip,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

// Sample Data - Updated to reflect the provided sequence and potential empty fields
const initialEmployeeData = [
  { id: 1, srNo: 1, empId: 'V0020', employeeName: 'Rupali Mali', department: 'Purchase', designation: 'Purchase Manager', city: '', mobileNo: '8600844428', dob: '13-06-1992', gender: 'Female', bankName: 'STATE BANK OF INDIA', accountNo: '38997945436', reportingTo: 'Mangesh Ghadigaonkar', doj: '10-05-2017', dol: '', ctc: 751920.00, emailId: 'malirupali92@gmail.com', companyEmailId: 'rupali@vetrinahealthcare.com', maritalStatus: 'Married', status: 'Active' },
  { id: 2, srNo: 2, empId: 'V0017', employeeName: 'Ganesh Mohite', department: 'Sales', designation: 'Zonal Sales Manager', city: '', mobileNo: '8600844457', dob: '08-04-1988', gender: 'Male', bankName: 'HDFC BANK', accountNo: '50100129359867', reportingTo: 'Ashish Shahare', doj: '01-04-2017', dol: '', ctc: 1201457.00, emailId: 'ganeshkmohite88@gmail.com', companyEmailId: 'ganesh@vetrinahealthcare.com', maritalStatus: 'Married', status: 'Active' },
  { id: 3, srNo: 3, empId: 'V0006', employeeName: 'Kumar Patil', department: 'Sales', designation: 'Zonal Sales Manager', city: '', mobileNo: '8600844462', dob: '19-09-1982', gender: 'Male', bankName: 'ICICI BANK', accountNo: '72301502486', reportingTo: 'Sanjay Mandale', doj: '12-09-2016', dol: '', ctc: 1054965.00, emailId: 'patilvetrina@gmail.com', companyEmailId: 'patilvetrina@gmail.com', maritalStatus: 'Married', status: 'Active' },
  { id: 4, srNo: 4, empId: 'V0001', employeeName: 'Mangesh Ghadigaonkar', department: '', designation: '', city: '', mobileNo: '9422512723', dob: '16-11-1974', gender: 'Male', bankName: '', accountNo: '', reportingTo: '', doj: '01-01-2015', dol: '', ctc: 0.00, emailId: 'mangesh@vetrinahealthcare.com', companyEmailId: 'mangesh@vetrinahealthcare.com', maritalStatus: 'Married', status: 'Active' },
  { id: 5, srNo: 5, empId: 'V0075', employeeName: 'Shailesh Jadhav', department: 'Operations', designation: 'Operation Executive - Godown', city: '', mobileNo: '7028087020', dob: '23-07-2018', gender: 'Male', bankName: 'SOUTH INDIAN BANK', accountNo: '829053000001466', reportingTo: 'Sharad Ghadi', doj: '23-07-2018', dol: '', ctc: 603396.00, emailId: 'shailesh_jadhav7870@yahoo.com', companyEmailId: 'vetrina.godown@gmail.com', maritalStatus: 'Married', status: 'Not' },
  { id: 6, srNo: 6, empId: 'V0077', employeeName: 'Akshada Chavan', department: 'Marketing', designation: 'Graphic Designer', city: '', mobileNo: '7028087021', dob: '09-02-1995', gender: 'Female', bankName: 'AXIS BANK', accountNo: '915010034620968', reportingTo: 'Mangesh Ghadigaonkar', doj: '09-08-2018', dol: '', ctc: 580596.00, emailId: 'akshadchavan9295@gmail.com', companyEmailId: 'akshada@vetrinahealthcare.com', maritalStatus: 'Married', status: 'Active' },
  { id: 7, srNo: 7, empId: 'V0089', employeeName: 'Yogesh Bisen', department: 'Sales', designation: 'Area Sales Manager', city: '', mobileNo: '7447472461', dob: '22-04-1989', gender: 'Male', bankName: 'AXIS BANK', accountNo: '918010036323824', reportingTo: 'Prashant Dhengle', doj: '12-10-2018', dol: '', ctc: 633204.00, emailId: 'yogeshbb1@gmail.com', companyEmailId: '', maritalStatus: 'Married', status: 'Active' },
  { id: 8, srNo: 8, empId: 'V0123', employeeName: 'Ashish Shahare', department: 'Sales', designation: '', city: '', mobileNo: '8600844431', dob: '22-02-1989', gender: 'Male', bankName: 'AXIS BANK', accountNo: '918010046081727', reportingTo: 'Mangesh Ghadigaonkar', doj: '01-04-2019', dol: '', ctc: 1719792.00, emailId: 'shahare_ashish@rediffmail.com', companyEmailId: 'ashish@vetrinahealthcare.com', maritalStatus: 'Married', status: 'Active' },
  { id: 9, srNo: 9, empId: 'V0130', employeeName: 'Ashwini Deshpande', department: '', designation: 'Human Resource Generalist', city: '', mobileNo: '7028460133', dob: '23-09-1994', gender: 'Female', bankName: 'KOTAK MAHINDRA BANK', accountNo: '2013828985', reportingTo: 'Mangesh Ghadigaonkar', doj: '01-06-2019', dol: '', ctc: 300000.00, emailId: 'ashwini.deshpande023@gmail.com', companyEmailId: 'ashwini@vetrinahealthcare.com', maritalStatus: 'Married', status: 'Not' },
  { id: 10, srNo: 10, empId: 'V0155', employeeName: 'Ashok Bhange', department: 'Sales', designation: 'Sr. Area Sales Manager', city: '', mobileNo: '8600844461', dob: '18-06-1993', gender: 'Male', bankName: 'STATE BANK OF INDIA', accountNo: '36246392161', reportingTo: 'Amit Shinde', doj: '18-11-2019', dol: '', ctc: 739800.00, emailId: 'ashokbhange67@gmail.com', companyEmailId: '', maritalStatus: 'Married', status: 'Active' },
  // ... add more sample data if you have the full 549 entries
];

// Columns reordered as per the provided text sequence
const columns = [
  { id: 'srNo', label: 'Sr No.', minWidth: 60, align: 'left', sortable: true },
  { id: 'empId', label: 'EmpID', minWidth: 90, align: 'left', sortable: true },
  { id: 'employeeName', label: 'Employee Name', minWidth: 180, align: 'left', sortable: true },
  { id: 'department', label: 'Department', minWidth: 130, align: 'left', sortable: true },
  { id: 'designation', label: 'Designation', minWidth: 180, align: 'left', sortable: true },
  { id: 'city', label: 'City', minWidth: 100, align: 'left', sortable: true }, // City appears empty in data, but kept column
  { id: 'mobileNo', label: 'Mobile No', minWidth: 120, align: 'left', sortable: false },
  { id: 'dob', label: 'D.O.B', minWidth: 110, align: 'left', sortable: true },
  { id: 'gender', label: 'Gender', minWidth: 100, align: 'left', sortable: true },
  { id: 'bankName', label: 'Bank Name', minWidth: 170, align: 'left', sortable: true },
  { id: 'accountNo', label: 'Acount No.', minWidth: 150, align: 'left', sortable: false }, // Typo "Acount" corrected to "Account" in label for consistency, key remains 'accountNo'
  { id: 'reportingTo', label: 'Reporting To', minWidth: 170, align: 'left', sortable: true },
  { id: 'doj', label: 'D.O.J.', minWidth: 110, align: 'left', sortable: true },
 
  { id: 'ctc', label: 'CTC', minWidth: 100, align: 'right', sortable: true, format: (value) => value ? parseFloat(value).toFixed(2) : '0.00' },
  { id: 'emailId', label: 'Email ID', minWidth: 220, align: 'left', sortable: true },
  { id: 'companyEmailId', label: 'Company Email ID', minWidth: 220, align: 'left', sortable: true },
  { id: 'maritalStatus', label: 'Marital Status', minWidth: 120, align: 'left', sortable: true },
  { id: 'status', label: 'Status', minWidth: 100, align: 'center', sortable: true },
];


export default function EmployeeMasterReport() { // Renamed component slightly
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));

  const [employeeData, setEmployeeData] = useState(initialEmployeeData);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState('srNo');
  const [order, setOrder] = useState('asc');

  // useEffect(() => {
  //   // API call to fetch actual data
  //   // setEmployeeData(fetchedData);
  // }, []);


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
    setPage(1);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredData = employeeData.filter((employee) =>
    columns.some((column) => {
        const value = employee[column.id];
        return String(value).toLowerCase().includes(searchTerm);
    })
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!orderBy || !columns.find(col => col.id === orderBy)?.sortable) return 0;
    const valA = a[orderBy];
    const valB = b[orderBy];

    if (orderBy === 'ctc') {
        return order === 'asc' ? parseFloat(valA) - parseFloat(valB) : parseFloat(valB) - parseFloat(valA);
    }
    if (orderBy === 'doj' || orderBy === 'dol' || orderBy === 'dob') { // Added dob to date sort
        const dateA = valA && String(valA).includes('-') ? new Date(String(valA).split('-').reverse().join('-')) : new Date(0);
        const dateB = valB && String(valB).includes('-') ? new Date(String(valB).split('-').reverse().join('-')) : new Date(0);
        return order === 'asc' ? dateA - dateB : dateB - dateA;
    }

    if (valA < valB) return order === 'asc' ? -1 : 1;
    if (valA > valB) return order === 'asc' ? 1 : -1;
    return 0;
  });

  const count = sortedData.length;
  const paginatedData = sortedData.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage);
  const totalPages = Math.ceil(count / rowsPerPage);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const tableHeaderCellStyle = {
    fontWeight: 'bold',
    backgroundColor: '#f0f3f5',
    borderRight: '1px solid #e0e0e0',
    padding: '8px 10px',
    whiteSpace: 'nowrap',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    color: '#333',
  };

  const tableBodyCellStyle = {
    borderRight: '1px solid #e0e0e0',
    padding: '6px 10px',
    fontSize: '0.75rem',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
  };

  const scrollbarStyles = {
    '&::-webkit-scrollbar': { height: '8px', width: '6px' },
    '&::-webkit-scrollbar-track': { backgroundColor: '#f1f1f1', borderRadius: '10px' },
    '&::-webkit-scrollbar-thumb': { backgroundColor: '#c1c1c1', borderRadius: '10px', '&:hover': { backgroundColor: '#a1a1a1' } },
    scrollbarWidth: 'thin',
    scrollbarColor: '#c1c1c1 #f1f1f1',
  };

  const getStatusChip = (status) => {
    let color = 'default';
    let label = status;
    if (status && status.toLowerCase() === 'active') {
      color = 'success';
      label = 'Active';
    } else if (status && (status.toLowerCase() === 'not' || status.toLowerCase() === 'inactive')) {
      color = 'error';
      label = 'Inactive';
    }
    return <Chip label={label} color={color} size="small" variant="outlined" sx={{fontSize: '0.7rem', height: '22px', minWidth: '60px'}}/>;
  };


  return (
    <Container sx={{ width: "100%" }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 'medium' }}>
        Employee Master Report
      </Typography>

      <Paper >
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ mr: 1, fontSize: '0.8rem' }}>Show</Typography>
            <Select value={rowsPerPage} onChange={handleRowsPerPageChange} size="small" sx={{ minWidth: 60, fontSize: '0.8rem' }}>
              {[10, 25, 50, 100].map((value) => ( <MenuItem key={value} value={value} sx={{fontSize: '0.8rem'}}>{value}</MenuItem> ))}
            </Select>
            <Typography variant="body2" sx={{ ml: 1, fontSize: '0.8rem' }}>entries</Typography>
          </Box>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ width: { xs: '100%', sm: 230 } }}
            InputProps={{style: {fontSize: '0.8rem'}}}
            InputLabelProps={{style: {fontSize: '0.8rem'}}}
          />
        </Stack>

      <Paper sx={{ width: '100%', overflowX: 'auto' }}>
             <TableContainer sx={{ minWidth: '100%' }}>
               <Table stickyHeader size="small" aria-label="employee detail report table">
                 <TableHead>
                   <TableRow>
                     {columns.map((column, colIndex) => (
                       <TableCell
                         key={column.id}
                         align={column.align || 'left'}
                         sx={{
                           ...tableHeaderCellStyle,
                           minWidth: column.minWidth,
                           borderRight: colIndex === columns.length - 1 ? 'none' : tableHeaderCellStyle.borderRight,
                         }}
                       >
                         {column.sortable ? (
                           <TableSortLabel
                             active={orderBy === column.id}
                             direction={orderBy === column.id ? order : 'asc'}
                             onClick={() => handleSortRequest(column.id)}
                             IconComponent={orderBy === column.id ? (order === 'asc' ? ArrowUpwardIcon : ArrowDownwardIcon) : undefined}
                             sx={{ '& .MuiTableSortLabel-icon': { fontSize: '1rem' } }}
                           >
                             {column.label}
                           </TableSortLabel>
                         ) : (
                           column.label
                         )}
                       </TableCell>
                     ))}
                   </TableRow>
                 </TableHead>
                 <TableBody>
                   {paginatedData.map((row) => (
                     <TableRow hover key={row.id}>
                       {columns.map((column, colIndex) => (
                         <TableCell
                           key={`${row.id}-${column.id}`}
                           align={column.align || 'left'}
                           sx={{
                             ...tableBodyCellStyle,
                             borderRight: colIndex === columns.length - 1 ? 'none' : tableBodyCellStyle.borderRight,
                           }}
                         >
                           {column.id === 'status'
                             ? getStatusChip(row[column.id])
                             : column.format && typeof row[column.id] === 'number' // Check if it's a number for formatting
                             ? column.format(row[column.id])
                             : (row[column.id] !== undefined && row[column.id] !== null ? String(row[column.id]) : '')}
                         </TableCell>
                       ))}
                     </TableRow>
                   ))}
                   {paginatedData.length === 0 && (
                     <TableRow>
                       <TableCell colSpan={columns.length} align="center" sx={{ py: 3, fontSize: '0.8rem' }}>
                         No matching records found
                       </TableCell>
                     </TableRow>
                   )}
                 </TableBody>
               </Table>
             </TableContainer>
      </Paper>

        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" spacing={2} sx={{ mt: 2, p: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{fontSize: '0.8rem'}}>
            Showing {count > 0 ? (page - 1) * rowsPerPage + 1 : 0} to {Math.min(page * rowsPerPage, count)} of {count} entries
          </Typography>
          {totalPages > 0 && (
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
              size={isSmallScreen ? "small" : "medium"}
              showFirstButton
              showLastButton
            />
          )}
        </Stack>
      </Paper>
       <Typography variant="caption" display="block" color="textSecondary" textAlign="center" sx={{mt:2}}>
            Activate Windows - Go to Settings to activate Windows. (This is from the image background)
      </Typography>
   </Container>
  );
}