import React, { useState } from "react";
import {
  Typography,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

const OverallAnalysis = ({ employeeId }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSave = () => {
    // Your API save logic here
    console.log("Overall analysis saved.");
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box>
      <Typography variant="h6" align="center" gutterBottom>
        Overall Analysis for Employee ID: {employeeId}
      </Typography>

      {/* 3 Tables side-by-side */}
      <Grid container spacing={2}>
        {/* PhaseWise Performance */}
        <Grid item xs={12} md={4}>
          <Paper elevation={2}>
            <Typography variant="subtitle1" align="center" sx={{ fontWeight: 600, bgcolor: "#eeeeee", py: 1 }}>
              PhaseWise Performance
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#9E9E9E" }}>
                  {["Phase", "LM", "H", "HR", "Total"].map((col) => (
                    <TableCell key={col} align="center" sx={{ color: "#fff", fontWeight: 600 }}>
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">Phase 1</TableCell>
                  <TableCell align="center">8</TableCell>
                  <TableCell align="center">7</TableCell>
                  <TableCell align="center">8</TableCell>
                  <TableCell align="center">23</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        {/* KPI Table */}
        <Grid item xs={12} md={4}>
          <Paper elevation={2}>
            <Typography variant="subtitle1" align="center" sx={{ fontWeight: 600, bgcolor: "#eeeeee", py: 1 }}>
              KPI Table
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#9E9E9E" }}>
                  {["KPI", "Target", "Achieve", "Rating"].map((col) => (
                    <TableCell key={col} align="center" sx={{ color: "#fff", fontWeight: 600 }}>
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">Sales</TableCell>
                  <TableCell align="center">100</TableCell>
                  <TableCell align="center">90</TableCell>
                  <TableCell align="center">9</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        {/* KRA Table */}
        <Grid item xs={12} md={4}>
          <Paper elevation={2}>
            <Typography variant="subtitle1" align="center" sx={{ fontWeight: 600, bgcolor: "#eeeeee", py: 1 }}>
              KRA Table
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#9E9E9E" }}>
                  {["KRA Parameter", "Total Rating"].map((col) => (
                    <TableCell key={col} align="center" sx={{ color: "#fff", fontWeight: 600 }}>
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">Leadership</TableCell>
                  <TableCell align="center">8.5</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>

      {/* Fourth Table */}
      <Box mt={3}>
        <Paper elevation={2}>
          <Typography variant="subtitle1" align="center" sx={{ fontWeight: 600, bgcolor: "#eeeeee", py: 1 }}>
            Total
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#9E9E9E" }}>
                {["Performance analysis of P1 to P4", "KPI+KRA", "Average", "%Achievement"].map((col) => (
                  <TableCell key={col} align="center" sx={{ color: "#fff", fontWeight: 600 }}>
                    {col}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">30</TableCell>
                <TableCell align="center">17.5</TableCell>
                <TableCell align="center">7.3</TableCell>
                <TableCell align="center">86%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </Box>

      {/* Comments Section (Read-Only) */}
      <Box mt={3} px={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Comment by LM"
              multiline
              rows={3}
              variant="outlined"
              value="Shows good leadership and team engagement."
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Comment by Head"
              multiline
              rows={3}
              variant="outlined"
              value="Delivers consistent results under pressure."
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Comment by HR"
              multiline
              rows={3}
              variant="outlined"
              value="Eligible for confirmation based on feedback."
              InputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>

        {/* Save Button */}
        <Box display="flex" justifyContent="center" mt={3}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Overall Analysis
          </Button>
        </Box>
      </Box>

      {/* Snackbar for success message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" variant="filled" sx={{ width: "100%" }}>
          Progress Saved
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OverallAnalysis;
 