"use client"

import { useState, useEffect } from "react"
import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
} from "@mui/material"

export default function SalaryCalculation() {
  const [employees] = useState([
    { id: "EMP001", name: "John Doe", designation: "Software Engineer", department: "IT" },
    { id: "EMP002", name: "Jane Smith", designation: "Finance Manager", department: "Finance" },
    { id: "EMP003", name: "Mike Johnson", designation: "HR Manager", department: "HR" },
    { id: "EMP004", name: "Sarah Wilson", designation: "Marketing Executive", department: "Marketing" },
  ])

  const [selectedEmployee, setSelectedEmployee] = useState("")
  const [grossSalary, setGrossSalary] = useState("")
  const [otherDeduction, setOtherDeduction] = useState("")
  const [advance, setAdvance] = useState("")
  const [salaryStructure, setSalaryStructure] = useState(null)
  const [formulas, setFormulas] = useState(null)
  const [calculated, setCalculated] = useState(false)

  useEffect(() => {
    const savedFormulas = localStorage.getItem("payrollFormulas")
    if (savedFormulas) {
      setFormulas(JSON.parse(savedFormulas))
    }
  }, [])

  const calculateSalary = () => {
    if (!selectedEmployee || !grossSalary || !formulas) return

    const employee = employees.find((emp) => emp.id === selectedEmployee)
    if (!employee) return

    const gross = Number(grossSalary)
    const basic = gross * 0.5 // 50% of gross as basic

    // Earnings
    const hra = (basic * formulas.hra) / 100
    const medical = formulas.medical
    const conveyance = formulas.conveyance
    const bonus = (basic * formulas.bonus) / 100
    const gratuity = (basic * formulas.gratuity) / 100
    const totalEarnings = basic + hra + medical + conveyance + bonus + gratuity

    // Deductions
    const pf = (basic * formulas.pf) / 100
    const esi = (gross * formulas.esi) / 100
    const tds = (gross * formulas.tds) / 100
    const mlwf = formulas.mlwf
    const otherDed = Number(otherDeduction) || 0
    const advanceAmt = Number(advance) || 0
    const totalDeductions = pf + esi + tds + mlwf + otherDed + advanceAmt

    const netSalary = totalEarnings - totalDeductions

    const structure = {
      employeeId: employee.id,
      employeeName: employee.name,
      grossSalary: gross,
      basic,
      hra,
      medical,
      conveyance,
      bonus,
      gratuity,
      totalEarnings,
      pf,
      esi,
      tds,
      mlwf,
      otherDeduction: otherDed,
      advance: advanceAmt,
      totalDeductions,
      netSalary,
    }

    setSalaryStructure(structure)
    setCalculated(true)
  }

  const saveSalaryStructure = () => {
    if (!salaryStructure) return

    const existingStructures = JSON.parse(localStorage.getItem("salaryStructures") || "[]")
    const updatedStructures = [...existingStructures, salaryStructure]
    localStorage.setItem("salaryStructures", JSON.stringify(updatedStructures))

    alert("Salary structure saved successfully!")
  }

  if (!formulas) {
    return <Alert severity="warning">Please configure payroll formulas in the Payroll Setup tab first.</Alert>
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Salary Calculation
      </Typography>

      <Grid container spacing={3}>
        {/* Input Section */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Employee Selection
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Select Employee</InputLabel>
                    <Select
                      value={selectedEmployee}
                      onChange={(e) => setSelectedEmployee(e.target.value)}
                      label="Select Employee"
                    >
                      {employees.map((emp) => (
                        <MenuItem key={emp.id} value={emp.id}>
                          {emp.name} ({emp.id})
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Gross Salary"
                    type="number"
                    value={grossSalary}
                    onChange={(e) => setGrossSalary(e.target.value)}
                    InputProps={{ startAdornment: "₹" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Other Deduction"
                    type="number"
                    value={otherDeduction}
                    onChange={(e) => setOtherDeduction(e.target.value)}
                    InputProps={{ startAdornment: "₹" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Advance"
                    type="number"
                    value={advance}
                    onChange={(e) => setAdvance(e.target.value)}
                    InputProps={{ startAdornment: "₹" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={calculateSalary}
                    disabled={!selectedEmployee || !grossSalary}
                  >
                    Calculate Salary
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Salary Structure Display */}
        <Grid item xs={12} md={8}>
          {salaryStructure && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Salary Structure - {salaryStructure.employeeName}
                </Typography>

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
                        <TableCell align="right">{salaryStructure.basic.toFixed(2)}</TableCell>
                        <TableCell>PF</TableCell>
                        <TableCell align="right">{salaryStructure.pf.toFixed(2)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>HRA</TableCell>
                        <TableCell align="right">{salaryStructure.hra.toFixed(2)}</TableCell>
                        <TableCell>ESI</TableCell>
                        <TableCell align="right">{salaryStructure.esi.toFixed(2)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Medical</TableCell>
                        <TableCell align="right">{salaryStructure.medical.toFixed(2)}</TableCell>
                        <TableCell>TDS</TableCell>
                        <TableCell align="right">{salaryStructure.tds.toFixed(2)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Conveyance</TableCell>
                        <TableCell align="right">{salaryStructure.conveyance.toFixed(2)}</TableCell>
                        <TableCell>MLWF</TableCell>
                        <TableCell align="right">{salaryStructure.mlwf.toFixed(2)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Bonus</TableCell>
                        <TableCell align="right">{salaryStructure.bonus.toFixed(2)}</TableCell>
                        <TableCell>Other Deduction</TableCell>
                        <TableCell align="right">{salaryStructure.otherDeduction.toFixed(2)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Gratuity</TableCell>
                        <TableCell align="right">{salaryStructure.gratuity.toFixed(2)}</TableCell>
                        <TableCell>Advance</TableCell>
                        <TableCell align="right">{salaryStructure.advance.toFixed(2)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Total Earnings</strong>
                        </TableCell>
                        <TableCell align="right">
                          <strong>{salaryStructure.totalEarnings.toFixed(2)}</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Total Deductions</strong>
                        </TableCell>
                        <TableCell align="right">
                          <strong>{salaryStructure.totalDeductions.toFixed(2)}</strong>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2}></TableCell>
                        <TableCell>
                          <strong>Net Salary</strong>
                        </TableCell>
                        <TableCell align="right">
                          <strong>₹{salaryStructure.netSalary.toFixed(2)}</strong>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                {calculated && (
                  <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                    <Button variant="contained" color="success" onClick={saveSalaryStructure}>
                      Save Salary Structure
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}
