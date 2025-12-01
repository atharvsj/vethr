import React, { useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Box,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

const Phase3 = ({ employeeId }) => {
  const [parameters, setParameters] = useState([
    { id: 1, name: "Communication", lm: "", head: "", hr: "", average: "7.3" },
    { id: 2, name: "Team Work", lm: "", head: "", hr: "", average: "8.0" },
    { id: 3, name: "Technical Skill", lm: "", head: "", hr: "", average: "7.7" },
    { id: 4, name: "Punctuality", lm: "", head: "", hr: "", average: "9.0" },
  ]);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (id, field, value) => {
    const updated = parameters.map((param) =>
      param.id === id ? { ...param, [field]: value } : param
    );
    setParameters(updated);
  };

  const handleSave = () => {
    console.log("Saving data:", parameters);
    // TODO: Add API call here
    setOpenSnackbar(true); // Show popup
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom align="center">
        Phase 3 Content for Employee ID: {employeeId}
      </Typography>

      <Paper elevation={2} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#BDBDBD" }}>
              <TableCell align="center"><strong>Sr No</strong></TableCell>
              <TableCell align="center"><strong>Parameter</strong></TableCell>
              <TableCell align="center"><strong>LM</strong></TableCell>
              <TableCell align="center"><strong>Head</strong></TableCell>
              <TableCell align="center"><strong>HR</strong></TableCell>
              <TableCell align="center"><strong>Average</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parameters.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">
                  <TextField
                    type="number"
                    value={row.lm}
                    onChange={(e) => handleChange(row.id, "lm", e.target.value)}
                    inputProps={{ min: 0, max: 10 }}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    type="number"
                    value={row.head}
                    onChange={(e) => handleChange(row.id, "head", e.target.value)}
                    inputProps={{ min: 0, max: 10 }}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    type="number"
                    value={row.hr}
                    onChange={(e) => handleChange(row.id, "hr", e.target.value)}
                    inputProps={{ min: 0, max: 10 }}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">{row.average}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Box display="flex" justifyContent="center" mt={2}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Phase 3
        </Button>
      </Box>

      {/* Snackbar Notification */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" variant="filled" sx={{ width: "100%" }}>
          Phase 3 saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Phase3;
 