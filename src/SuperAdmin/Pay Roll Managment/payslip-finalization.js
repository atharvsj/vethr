"use client"

import { useState, useEffect } from "react"
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from "@mui/material"

export default function PayslipFinalization() {
  const [salaryStructures, setSalaryStructures] = useState([])
  const [selectedStructure, setSelectedStructure] = useState(null)
  const [confirmDialog, setConfirmDialog] = useState(false)
  const [previewDialog, setPreviewDialog] = useState(false)

  useEffect(() => {
    const structures = JSON.parse(localStorage.getItem("salaryStructures") || "[]")
    setSalaryStructures(structures)
  }, [])

  const handleFinalize = (structure) => {
    setSelectedStructure(structure)
    setConfirmDialog(true)
  }

  const confirmFinalization = () => {
    if (!selectedStructure) return

    const updatedStructures = salaryStructures.map((structure) =>
      structure.employeeId === selectedStructure.employeeId
        ? {
            ...structure,
            status: "finalized",
            finalizedDate: new Date().toISOString().split("T")[0],
          }
        : structure,
    )

    setSalaryStructures(updatedStructures)
    localStorage.setItem("salaryStructures", JSON.stringify(updatedStructures))

    // Also save to finalized payslips
    const finalizedPayslips = JSON.parse(localStorage.getItem("finalizedPayslips") || "[]")
    const finalizedStructure = {
      ...selectedStructure,
      status: "finalized",
      finalizedDate: new Date().toISOString().split("T")[0],
    }
    finalizedPayslips.push(finalizedStructure)
    localStorage.setItem("finalizedPayslips", JSON.stringify(finalizedPayslips))

    setConfirmDialog(false)
    setSelectedStructure(null)
  }

  const handlePreview = (structure) => {
    setSelectedStructure(structure)
    setPreviewDialog(true)
  }

  if (salaryStructures.length === 0) {
    return (
      <Alert severity="info">
        No salary structures found. Please calculate salaries in the Salary Calculation tab first.
      </Alert>
    )
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Payslip Finalization
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Pending Salary Structures for Finalization
          </Typography>

          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee ID</TableCell>
                  <TableCell>Employee Name</TableCell>
                  <TableCell align="right">Gross Salary</TableCell>
                  <TableCell align="right">Net Salary</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {salaryStructures.map((structure, index) => (
                  <TableRow key={index}>
                    <TableCell>{structure.employeeId}</TableCell>
                    <TableCell>{structure.employeeName}</TableCell>
                    <TableCell align="right">₹{structure.grossSalary.toFixed(2)}</TableCell>
                    <TableCell align="right">₹{structure.netSalary.toFixed(2)}</TableCell>
                    <TableCell>
                      <Chip
                        label={structure.status === "finalized" ? "Finalized" : "Draft"}
                        color={structure.status === "finalized" ? "success" : "warning"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Button size="small" variant="outlined" onClick={() => handlePreview(structure)}>
                          Preview
                        </Button>
                        {structure.status !== "finalized" && (
                          <Button
                            size="small"
                            variant="contained"
                            color="success"
                            onClick={() => handleFinalize(structure)}
                          >
                            Finalize
                          </Button>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialog} onClose={() => setConfirmDialog(false)}>
        <DialogTitle>Confirm Finalization</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to finalize the payslip for {selectedStructure?.employeeName}? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog(false)}>Cancel</Button>
          <Button onClick={confirmFinalization} variant="contained" color="success">
            Finalize
          </Button>
        </DialogActions>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={previewDialog} onClose={() => setPreviewDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Payslip Preview - {selectedStructure?.employeeName}</DialogTitle>
        <DialogContent>
          {selectedStructure && (
            <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: 1, bgcolor: "background.paper" }}>
              <Typography variant="h6" align="center" gutterBottom>
                Vetrina Healthcare Pvt. Ltd.
              </Typography>
              <Typography variant="body2" align="center" gutterBottom>
                Pay Slip For Month: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </Typography>

              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    <strong>Employee ID:</strong> {selectedStructure.employeeId}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Employee Name:</strong> {selectedStructure.employeeName}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    <strong>Gross Salary:</strong> ₹{selectedStructure.grossSalary.toFixed(2)}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Net Salary:</strong> ₹{selectedStructure.netSalary.toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>

              <TableContainer sx={{ mt: 2 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <strong>Earnings</strong>
                      </TableCell>
                      <TableCell align="right">
                        <strong>Amount</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Deductions</strong>
                      </TableCell>
                      <TableCell align="right">
                        <strong>Amount</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Basic</TableCell>
                      <TableCell align="right">₹{selectedStructure.basic.toFixed(2)}</TableCell>
                      <TableCell>PF</TableCell>
                      <TableCell align="right">₹{selectedStructure.pf.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>HRA</TableCell>
                      <TableCell align="right">₹{selectedStructure.hra.toFixed(2)}</TableCell>
                      <TableCell>TDS</TableCell>
                      <TableCell align="right">₹{selectedStructure.tds.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Medical</TableCell>
                      <TableCell align="right">₹{selectedStructure.medical.toFixed(2)}</TableCell>
                      <TableCell>Other Deduction</TableCell>
                      <TableCell align="right">₹{selectedStructure.otherDeduction.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Conveyance</TableCell>
                      <TableCell align="right">₹{selectedStructure.conveyance.toFixed(2)}</TableCell>
                      <TableCell>MLWF</TableCell>
                      <TableCell align="right">₹{selectedStructure.mlwf.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell>Advance</TableCell>
                      <TableCell align="right">₹{selectedStructure.advance.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Total</strong>
                      </TableCell>
                      <TableCell align="right">
                        <strong>₹{selectedStructure.totalEarnings.toFixed(2)}</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Total</strong>
                      </TableCell>
                      <TableCell align="right">
                        <strong>₹{selectedStructure.totalDeductions.toFixed(2)}</strong>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
