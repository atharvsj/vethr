// import React from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from "@mui/material";

// const AnnualLeaveReport = () => {
//   const columns = [
//     "SR. NO.",
//     "LEAVE TYPE",
//     "JAN",
//     "FEB",
//     "MAR",
//     "APR",
//     "MAY",
//     "JUN",
//     "JUL",
//     "AUG",
//     "SEP",
//     "OCT",
//     "NOV",
//     "DEC",
//   ];

//   const rows = [
//     [2, "Privilege Leave (PL)", 30, 29, 43, 33, 35, 3, 0, 0, 0, 0, 0, 0],
//     [3, "Casual Leave (CL)", 80, 91, 76, 62, 54, 16, 0, 0, 0, 0, 0, 0],
//     [4, "Medical Leave (ML)", 50, 50, 71, 43, 61, 18, 0, 0, 0, 0, 0, 0],
//     [5, "Maternity Leave", 1, 0, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0],
//     [6, "Privilege Leave", 5, 4, 4, 2, 2, 1, 0, 0, 0, 0, 0, 0],
//     [7, "Total", 175, 174, 195, 140, 154, 38, 0, 0, 0, 0, 0, 0],
//   ];

//   return (
//     <Box p={3}>
//       <Typography variant="h6" fontWeight="bold" mb={2}>
//         Annual Leave Report
//       </Typography>

//       {/* Only this box scrolls horizontally */}
//       <Box sx={{ overflowX: "auto" }}>
//         <TableContainer component={Paper}>
//           <Table stickyHeader sx={{ minWidth: 1200 }}>
//             <TableHead>
//               <TableRow>
//                 {columns.map((col, index) => (
//                   <TableCell key={index} align="center" sx={{ fontWeight: 600 }}>
//                     {col}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {rows.map((row, rIdx) => (
//                 <TableRow key={rIdx}>
//                   {row.map((cell, cIdx) => (
//                     <TableCell key={cIdx} align="center">
//                       {cell}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>
//     </Box>
//   );
// };

// export default AnnualLeaveReport;






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

const AnnualLeaveReport = () => {
  const columns = [
    "SR. NO.",
    "LEAVE TYPE",
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
    "TOTAL",
  ];

  const rows = [
    [2, "Privilege Leave (PL)", 30, 29, 43, 33, 35, 3, 0, 0, 0, 0, 0, 0],
    [3, "Casual Leave (CL)", 80, 91, 76, 62, 54, 16, 0, 0, 0, 0, 0, 0],
    [4, "Medical Leave (ML)", 50, 50, 71, 43, 61, 18, 0, 0, 0, 0, 0, 0],
    [5, "Maternity Leave", 1, 0, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0],
    [6, "Privilege Leave", 5, 4, 4, 2, 2, 1, 0, 0, 0, 0, 0, 0],
    [7, "Total", 175, 174, 195, 140, 154, 38, 0, 0, 0, 0, 0, 0],
  ];

  // Add total for each row
  const rowsWithTotal = rows.map((row) => {
    const monthlyData = row.slice(2); // leave counts from JAN to DEC
    const total = monthlyData.reduce((sum, val) => sum + val, 0);
    return [...row, total];
  });

  return (
    <Box p={3}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Annual Leave Report
      </Typography>

      <Box sx={{ overflowX: "auto" }}>
        <TableContainer component={Paper}>
          <Table stickyHeader sx={{ minWidth: 1300 }} aria-label="Annual Leave Table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                {columns.map((col, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      border: "1px solid #ddd",
                      backgroundColor: "#e3f2fd",
                    }}
                  >
                    {col}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rowsWithTotal.map((row, rIdx) => (
                <TableRow
                  key={rIdx}
                  sx={{
                    backgroundColor: rIdx % 2 === 0 ? "#ffffff" : "#f9f9f9",
                  }}
                >
                  {row.map((cell, cIdx) => (
                    <TableCell
                      key={cIdx}
                      align="center"
                      sx={{ border: "1px solid #ddd" }}
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AnnualLeaveReport;
