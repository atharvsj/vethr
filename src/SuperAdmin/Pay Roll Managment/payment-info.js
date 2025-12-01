"use client"

import { useState, useEffect } from "react"
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Grid,
  Alert,
} from "@mui/material"

export default function PaymentInfo() {
  const [paymentRecords, setPaymentRecords] = useState([])
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [dialogType, setDialogType] = useState(null)

  useEffect(() => {
    const finalizedPayslips = JSON.parse(localStorage.getItem("finalizedPayslips") || "[]")
    const recordsWithType = finalizedPayslips.map((record) => ({
      ...record,
      payslipType: "Monthly Salary",
    }))
    setPaymentRecords(recordsWithType)
  }, [])

  const handleViewSalaryStructure = (record) => {
    setSelectedRecord(record)
    setDialogType("salary")
  }

  const handleViewPayslip = (record) => {
    setSelectedRecord(record)
    setDialogType("payslip")
  }

  const closeDialog = () => {
    setSelectedRecord(null)
    setDialogType(null)
  }

  if (paymentRecords.length === 0) {
    return (
      <Alert severity="info">
        No finalized payment records found. Please finalize payslips in the Payslip Finalization tab first.
      </Alert>
    )
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Payment Information
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Employee Payment Records
          </Typography>

          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee Name</TableCell>
                  <TableCell>Employee ID</TableCell>
                  <TableCell>Payslip Type</TableCell>
                  <TableCell align="right">Basic Salary</TableCell>
                  <TableCell align="right">Net Salary</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paymentRecords.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell>{record.employeeName}</TableCell>
                    <TableCell>{record.employeeId}</TableCell>
                    <TableCell>{record.payslipType}</TableCell>
                    <TableCell align="right">₹{record.basic.toFixed(2)}</TableCell>
                    <TableCell align="right">₹{record.netSalary.toFixed(2)}</TableCell>
                    <TableCell>
                      <Chip
                        label={record.status === "finalized" ? "Finalized" : "Draft"}
                        color={record.status === "finalized" ? "success" : "warning"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1, flexDirection: "column" }}>
                        <Button size="small" variant="outlined" onClick={() => handleViewSalaryStructure(record)}>
                          Salary Structure
                        </Button>
                        <Button size="small" variant="contained" onClick={() => handleViewPayslip(record)}>
                          Pay Slip
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Salary Structure Dialog */}
      <Dialog open={dialogType === "salary"} onClose={closeDialog} maxWidth="md" fullWidth>
        <DialogTitle>Salary Structure - {selectedRecord?.employeeName}</DialogTitle>
        <DialogContent>
          {selectedRecord && (
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Earnings</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Amount (₹)</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Deductions</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Amount (₹)</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Basic Salary</TableCell>
                    <TableCell align="right">{selectedRecord.basic.toFixed(2)}</TableCell>
                    <TableCell>PF</TableCell>
                    <TableCell align="right">{selectedRecord.pf.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>HRA</TableCell>
                    <TableCell align="right">{selectedRecord.hra.toFixed(2)}</TableCell>
                    <TableCell>ESI</TableCell>
                    <TableCell align="right">{selectedRecord.esi.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Medical</TableCell>
                    <TableCell align="right">{selectedRecord.medical.toFixed(2)}</TableCell>
                    <TableCell>TDS</TableCell>
                    <TableCell align="right">{selectedRecord.tds.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Conveyance</TableCell>
                    <TableCell align="right">{selectedRecord.conveyance.toFixed(2)}</TableCell>
                    <TableCell>MLWF</TableCell>
                    <TableCell align="right">{selectedRecord.mlwf.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Bonus</TableCell>
                    <TableCell align="right">{selectedRecord.bonus.toFixed(2)}</TableCell>
                    <TableCell>Other Deduction</TableCell>
                    <TableCell align="right">{selectedRecord.otherDeduction.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Gratuity</TableCell>
                    <TableCell align="right">{selectedRecord.gratuity.toFixed(2)}</TableCell>
                    <TableCell>Advance</TableCell>
                    <TableCell align="right">{selectedRecord.advance.toFixed(2)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Total Earnings</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>{selectedRecord.totalEarnings.toFixed(2)}</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Total Deductions</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>{selectedRecord.totalDeductions.toFixed(2)}</strong>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}></TableCell>
                    <TableCell>
                      <strong>Net Salary</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>₹{selectedRecord.netSalary.toFixed(2)}</strong>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Payslip Dialog */}
      <Dialog open={dialogType === "payslip"} onClose={closeDialog} maxWidth="md" fullWidth>
        <DialogTitle>Pay Slip - {selectedRecord?.employeeName}</DialogTitle>
        <DialogContent>
          {selectedRecord && (
            <Box sx={{ p: 3, border: "2px solid #000", borderRadius: 1, bgcolor: "background.paper" }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6" gutterBottom>
                    Vetrina Healthcare Pvt. Ltd.
                  </Typography>
                  <Typography variant="body2">
                    Pay Slip For Month: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" align="right">
                    Salary Payment Month
                  </Typography>
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    <strong>Employee ID:</strong> {selectedRecord.employeeId}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Employee Name:</strong> {selectedRecord.employeeName}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Department:</strong> Finance
                  </Typography>
                  <Typography variant="body2">
                    <strong>Date of Joining:</strong> 01/01/2020
                  </Typography>
                  <Typography variant="body2">
                    <strong>Designation:</strong> Finance Manager
                  </Typography>
                  <Typography variant="body2">
                    <strong>Location:</strong> Pune
                  </Typography>
                  <Typography variant="body2">
                    <strong>Payable Days:</strong> 30
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2">
                    <strong>Bank Name:</strong> ICICI Bank
                  </Typography>
                  <Typography variant="body2">
                    <strong>Bank A/c No:</strong> 123456789
                  </Typography>
                  <Typography variant="body2">
                    <strong>PF UAN:</strong> 123456789012
                  </Typography>
                  <Typography variant="body2">
                    <strong>UAN No:</strong> 123456789012
                  </Typography>
                  <Typography variant="body2">
                    <strong>ESIC No:</strong> 1234567890
                  </Typography>
                  <Typography variant="body2">
                    <strong>PAN No:</strong> ABCDE1234F
                  </Typography>
                </Grid>
              </Grid>

              <TableContainer sx={{ mt: 3, border: "1px solid #000" }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ border: "1px solid #000" }}>
                        <strong>Earning Title</strong>
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #000" }} align="right">
                        <strong>Current Month</strong>
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #000" }}>
                        <strong>Deduction Title</strong>
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #000" }} align="right">
                        <strong>Current Month</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ border: "1px solid #000" }}>Basic</TableCell>
                      <TableCell sx={{ border: "1px solid #000" }} align="right">
                        {selectedRecord.basic.toFixed(2)}
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #000" }}>PF</TableCell>
                      <TableCell sx={{ border: "1px solid #000" }} align="right">
                        {selectedRecord.pf.toFixed(2)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ border: "1px solid #000" }}>HRA</TableCell>
                      <TableCell sx={{ border: "1px solid #000" }} align="right">
                        {selectedRecord.hra.toFixed(2)}
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #000" }}>TDS</TableCell>
                      <TableCell sx={{ border: "1px solid #000" }} align="right">
                        {selectedRecord.tds.toFixed(2)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ border: "1px solid #000" }}>Medical</TableCell>
                      <TableCell sx={{ border: "1px solid #000" }} align="right">
                        {selectedRecord.medical.toFixed(2)}
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #000" }}>Other Deduction</TableCell>
                      <TableCell sx={{ border: "1px solid #000" }} align="right">
                        {selectedRecord.otherDeduction.toFixed(2)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ border: "1px solid #000" }}>Conveyance</TableCell>
                      <TableCell sx={{ border: "1px solid #000" }} align="right">
                        {selectedRecord.conveyance.toFixed(2)}
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #000" }}>MLWF</TableCell>
                      <TableCell sx={{ border: "1px solid #000" }} align="right">
                        {selectedRecord.mlwf.toFixed(2)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ border: "1px solid #000" }}>Arrears</TableCell>
                      <TableCell sx={{ border: "1px solid #000" }} align="right">
                        0.00
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #000" }}>Advance</TableCell>
                      <TableCell sx={{ border: "1px solid #000" }} align="right">
                        {selectedRecord.advance.toFixed(2)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ border: "1px solid #000" }}>
                        <strong>Total</strong>
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #000" }} align="right">
                        <strong>{selectedRecord.totalEarnings.toFixed(2)}</strong>
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #000" }}>
                        <strong>Total</strong>
                      </TableCell>
                      <TableCell sx={{ border: "1px solid #000" }} align="right">
                        <strong>{selectedRecord.totalDeductions.toFixed(2)}</strong>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2">
                  <strong>Total Earnings:</strong> ₹{selectedRecord.totalEarnings.toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  <strong>Total Deductions:</strong> ₹{selectedRecord.totalDeductions.toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  <strong>Take Home:</strong> ₹{selectedRecord.netSalary.toFixed(2)}
                </Typography>
              </Box>

              <Typography variant="body2" sx={{ mt: 2 }}>
                <strong>Amount in Words:</strong> {/* You can add number to words conversion here */}
              </Typography>

              <Box sx={{ mt: 3, textAlign: "center" }}>
                <Typography variant="body2">
                  <strong>
                    Vetrina Healthcare Pvt. Ltd., Corporate Office - Punjai Pride, 1st Floor, Shivshambho Nagar, Lane
                    3A, Katraj Kondhwa Road, Katraj, Pune - 411046.
                  </strong>
                </Typography>
                <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
                  This is an electronically generated pay slip and does not require any signature.
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Close</Button>
          <Button variant="contained" onClick={() => window.print()}>
            Print
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
