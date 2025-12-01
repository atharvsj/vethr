// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from "@mui/material";

// export default function HolidayView() {
//   const [entries, setEntries] = useState("10");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState("");

//   const holidayData = [
//     {
//       id: 1,
//       date: "2024-01-01",
//       day: "Monday",
//       holiday: "New Year",
//       type: "Restricted Holiday",
//     },
//     {
//       id: 2,
//       date: "2024-01-26",
//       day: "Friday",
//       holiday: "Republic Day",
//       type: "National Holiday",
//     },
//     {
//       id: 3,
//       date: "2024-03-25",
//       day: "Monday",
//       holiday: "Holi",
//       type: "Restricted Holiday",
//     },
//     {
//       id: 4,
//       date: "2024-08-15",
//       day: "Thursday",
//       holiday: "Independence Day",
//       type: "National Holiday",
//     },
//     {
//       id: 5,
//       date: "2024-10-02",
//       day: "Wednesday",
//       holiday: "Gandhi Jayanti",
//       type: "National Holiday",
//     },
//     {
//       id: 6,
//       date: "2024-12-25",
//       day: "Wednesday",
//       holiday: "Christmas",
//       type: "Restricted Holiday",
//     },
//   ];

//   const filteredData = holidayData.filter(
//     (holiday) =>
//       holiday.holiday.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       holiday.date.includes(searchTerm) ||
//       holiday.day.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       holiday.type.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   return (
//     <Box sx={{ mt: 2 }}>
//       <Typography variant="h4" sx={{ mb: 2 }}>
//         Holidays
//       </Typography>
//       <Paper sx={{ width: "100%", mb: 2 }}>
//         <Box
//           sx={{
//             p: 2,
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <FormControl sx={{ minWidth: 120 }}>
//             <InputLabel id="entries-select-label">Show entries</InputLabel>
//             <Select
//               labelId="entries-select-label"
//               id="entries-select"
//               value={entries}
//               label="Show entries"
//               onChange={(e) => setEntries(e.target.value)}
//             >
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={25}>25</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//             </Select>
//           </FormControl>
//           <TextField
//             label="Search"
//             variant="outlined"
//             size="small"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </Box>
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>DATE</TableCell>
//                 <TableCell>DAY</TableCell>
//                 <TableCell>HOLIDAY</TableCell>
//                 <TableCell>TYPE</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredData
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((holiday) => (
//                   <TableRow key={holiday.id}>
//                     <TableCell>{holiday.date}</TableCell>
//                     <TableCell>{holiday.day}</TableCell>
//                     <TableCell>{holiday.holiday}</TableCell>
//                     <TableCell>
//                       <Box
//                         sx={{
//                           px: 1,
//                           py: 0.5,
//                           borderRadius: "16px",
//                           display: "inline-block",
//                           bgcolor:
//                             holiday.type === "National Holiday"
//                               ? "primary.main"
//                               : "success.main",
//                           color: "white",
//                         }}
//                       >
//                         {holiday.type}
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
//           <Button
//             onClick={() => handleChangePage(null, page - 1)}
//             disabled={page === 0}
//           >
//             Previous
//           </Button>
//           <Button
//             onClick={() => handleChangePage(null, page + 1)}
//             disabled={page >= Math.ceil(filteredData.length / rowsPerPage) - 1}
//           >
//             Next
//           </Button>
//         </Box>
//       </Paper>
//     </Box>
//   );
// }



import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TextField, FormControl,
  InputLabel, Select, MenuItem
} from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';

export default function HolidayView() {
  const [entries, setEntries] = useState('10');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('https://tdtlworld.com/hrms-backend/api/holiday_list', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.status === 'success' && Array.isArray(response.data.data)) {
          const enrichedData = response.data.data.map(item => {
            const date = item.start_date;
            const day = dayjs(date).format('dddd');
            const isNational = ['Republic', 'Independence', 'Gandhi'].some(keyword =>
              item.event_title.toLowerCase().includes(keyword.toLowerCase())
            );

            return {
              date,
              day,
              holiday: item.event_title,
              type: isNational ? 'Published' : 'Restricted'
            };
          });
          setHolidays(enrichedData);
        }
      } catch (error) {
        console.error('Error fetching holiday data:', error);
      }
    };

    fetchHolidays();
  }, []);

  const filteredData = holidays.filter(holiday =>
    (holiday.holiday?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (holiday.date || '').includes(searchTerm) ||
    (holiday.day?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (holiday.type?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeEntries = (e) => {
    const newValue = e.target.value;
    setEntries(newValue);
    setRowsPerPage(parseInt(newValue, 10));
    setPage(0); // Reset to first page on entries change
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Holidays</Typography>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="entries-select-label">Show entries</InputLabel>
            <Select
              labelId="entries-select-label"
              id="entries-select"
              value={entries}
              label="Show entries"
              onChange={handleChangeEntries}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>DATE</TableCell>
                <TableCell>DAY</TableCell>
                <TableCell>HOLIDAY</TableCell>
                <TableCell>TYPE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((holiday, index) => (
                  <TableRow key={index}>
                    <TableCell>{holiday.date}</TableCell>
                    <TableCell>{holiday.day}</TableCell>
                    <TableCell>{holiday.holiday}</TableCell>
                    <TableCell>
                      <Box sx={{
                        px: 1.5,
                        py: 0.5,
                        borderRadius: '16px',
                        display: 'inline-block',
                        bgcolor: holiday.type === 'Published' ? '#4caf50' : '#f44336',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '0.875rem'
                      }}>
                        {holiday.type}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            onClick={() => handleChangePage(null, page - 1)}
            disabled={page === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() => handleChangePage(null, page + 1)}
            disabled={page >= Math.ceil(filteredData.length / rowsPerPage) - 1}
          >
            Next
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
