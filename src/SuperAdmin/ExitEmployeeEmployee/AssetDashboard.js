"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Paper,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  Tabs,
  Tab,
} from "@mui/material"

const AssetDashboard = () => {
  const [tabValue, setTabValue] = useState(0)
  const [assets, setAssets] = useState([])
  const [allocatedAssets, setAllocatedAssets] = useState([])
  const [returnedAssets, setReturnedAssets] = useState([])
  const [employees, setEmployees] = useState([])
  const [openAssetDialog, setOpenAssetDialog] = useState(false)
  const [openAllocationDialog, setOpenAllocationDialog] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })

  // Asset form states
  const [assetName, setAssetName] = useState("")
  const [assetType, setAssetType] = useState("")
  const [assetId, setAssetId] = useState("")
  const [assetCondition, setAssetCondition] = useState("")

  // Allocation form states
  const [selectedAsset, setSelectedAsset] = useState("")
  const [selectedEmployee, setSelectedEmployee] = useState("")
  const [allocationDate, setAllocationDate] = useState("")

  const assetTypes = ["Laptop", "Desktop", "Mobile Phone", "Tablet", "Monitor", "Keyboard", "Mouse", "Other"]
  const assetConditions = ["New", "Good", "Fair", "Poor"]

  const mockAssets = [
    { id: "AST001", name: "Dell Laptop", type: "Laptop", condition: "New", status: "Available" },
    { id: "AST002", name: "HP Desktop", type: "Desktop", condition: "Good", status: "Allocated" },
    { id: "AST003", name: "iPhone 13", type: "Mobile Phone", condition: "New", status: "Available" },
    { id: "AST004", name: "Samsung Monitor", type: "Monitor", condition: "Good", status: "Allocated" },
  ]

  const mockEmployees = [
    { id: "EMP001", name: "John Doe", department: "IT" },
    { id: "EMP002", name: "Jane Smith", department: "HR" },
    { id: "EMP003", name: "Mike Johnson", department: "Finance" },
  ]

  const mockAllocatedAssets = [
    {
      id: 1,
      assetId: "AST002",
      assetName: "HP Desktop",
      employeeId: "EMP001",
      employeeName: "John Doe",
      allocationDate: "2024-01-01",
      acknowledgmentStatus: "Acknowledged",
      returnStatus: "Not Returned",
    },
    {
      id: 2,
      assetId: "AST004",
      assetName: "Samsung Monitor",
      employeeId: "EMP002",
      employeeName: "Jane Smith",
      allocationDate: "2024-01-05",
      acknowledgmentStatus: "Pending",
      returnStatus: "Not Returned",
    },
  ]

  const mockReturnedAssets = [
    {
      id: 1,
      assetId: "AST005",
      assetName: "Old Laptop",
      employeeId: "EMP003",
      employeeName: "Mike Johnson",
      returnDate: "2024-01-10",
      condition: "Good",
      hrAcceptance: "Pending",
    },
  ]

  useEffect(() => {
    setAssets(mockAssets)
    setEmployees(mockEmployees)
    setAllocatedAssets(mockAllocatedAssets)
    setReturnedAssets(mockReturnedAssets)
  }, [])

  const handleAddAsset = () => {
    if (!assetName || !assetType || !assetId || !assetCondition) {
      setSnackbar({
        open: true,
        message: "Please fill all required fields",
        severity: "error",
      })
      return
    }

    const newAsset = {
      id: assetId,
      name: assetName,
      type: assetType,
      condition: assetCondition,
      status: "Available",
    }

    setAssets([...assets, newAsset])
    setSnackbar({
      open: true,
      message: "Asset added successfully",
      severity: "success",
    })

    // Reset form
    setAssetName("")
    setAssetType("")
    setAssetId("")
    setAssetCondition("")
    setOpenAssetDialog(false)
  }

  const handleAllocateAsset = () => {
    if (!selectedAsset || !selectedEmployee || !allocationDate) {
      setSnackbar({
        open: true,
        message: "Please fill all required fields",
        severity: "error",
      })
      return
    }

    const asset = assets.find((a) => a.id === selectedAsset)
    const employee = employees.find((e) => e.id === selectedEmployee)

    const newAllocation = {
      id: allocatedAssets.length + 1,
      assetId: selectedAsset,
      assetName: asset.name,
      employeeId: selectedEmployee,
      employeeName: employee.name,
      allocationDate: allocationDate,
      acknowledgmentStatus: "Pending",
      returnStatus: "Not Returned",
    }

    setAllocatedAssets([...allocatedAssets, newAllocation])

    // Update asset status
    const updatedAssets = assets.map((a) => (a.id === selectedAsset ? { ...a, status: "Allocated" } : a))
    setAssets(updatedAssets)

    setSnackbar({
      open: true,
      message: "Asset allocated successfully",
      severity: "success",
    })

    // Reset form
    setSelectedAsset("")
    setSelectedEmployee("")
    setAllocationDate("")
    setOpenAllocationDialog(false)
  }

  const handleAcknowledgment = (allocationId) => {
    const updatedAllocations = allocatedAssets.map((allocation) =>
      allocation.id === allocationId ? { ...allocation, acknowledgmentStatus: "Acknowledged" } : allocation,
    )
    setAllocatedAssets(updatedAllocations)
    setSnackbar({
      open: true,
      message: "Asset acknowledgment updated",
      severity: "success",
    })
  }

  const handleHRAcceptance = (returnId) => {
    const updatedReturns = returnedAssets.map((returnAsset) =>
      returnAsset.id === returnId ? { ...returnAsset, hrAcceptance: "Accepted" } : returnAsset,
    )
    setReturnedAssets(updatedReturns)
    setSnackbar({
      open: true,
      message: "Asset return accepted by HR",
      severity: "success",
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "success"
      case "Allocated":
        return "warning"
      case "Acknowledged":
        return "success"
      case "Pending":
        return "warning"
      case "Accepted":
        return "success"
      default:
        return "default"
    }
  }

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>{value === index && <Box sx={{ p: 3 }}>{children}</Box>}</div>
  )

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Asset Dashboard
      </Typography>

      <Paper sx={{ width: "100%" }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="Asset Entry" />
          <Tab label="Asset List" />
          <Tab label="Asset Allocation" />
          <Tab label="Acknowledgment Status" />
          <Tab label="Return Assets" />
          <Tab label="HR Acceptance" />
        </Tabs>

        {/* Asset Entry Tab */}
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom>
            Add New Asset
          </Typography>
          <Button variant="contained" onClick={() => setOpenAssetDialog(true)} sx={{ mb: 2 }}>
            Add Asset
          </Button>
        </TabPanel>

        {/* Asset List Tab */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            Asset Inventory
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Asset ID</TableCell>
                  <TableCell>Asset Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Condition</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell>{asset.id}</TableCell>
                    <TableCell>{asset.name}</TableCell>
                    <TableCell>{asset.type}</TableCell>
                    <TableCell>{asset.condition}</TableCell>
                    <TableCell>
                      <Chip label={asset.status} color={getStatusColor(asset.status)} size="small" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Asset Allocation Tab */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            Allocate Assets to Employees
          </Typography>
          <Button variant="contained" onClick={() => setOpenAllocationDialog(true)} sx={{ mb: 2 }}>
            Allocate Asset
          </Button>
        </TabPanel>

        {/* Acknowledgment Status Tab */}
        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" gutterBottom>
            Asset Acknowledgment Status
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Asset ID</TableCell>
                  <TableCell>Asset Name</TableCell>
                  <TableCell>Employee ID</TableCell>
                  <TableCell>Employee Name</TableCell>
                  <TableCell>Allocation Date</TableCell>
                  <TableCell>Acknowledgment Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allocatedAssets.map((allocation) => (
                  <TableRow key={allocation.id}>
                    <TableCell>{allocation.assetId}</TableCell>
                    <TableCell>{allocation.assetName}</TableCell>
                    <TableCell>{allocation.employeeId}</TableCell>
                    <TableCell>{allocation.employeeName}</TableCell>
                    <TableCell>{allocation.allocationDate}</TableCell>
                    <TableCell>
                      <Chip
                        label={allocation.acknowledgmentStatus}
                        color={getStatusColor(allocation.acknowledgmentStatus)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {allocation.acknowledgmentStatus === "Pending" && (
                        <Button size="small" onClick={() => handleAcknowledgment(allocation.id)}>
                          Mark Acknowledged
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Return Assets Tab */}
        <TabPanel value={tabValue} index={4}>
          <Typography variant="h6" gutterBottom>
            Returned Assets List
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Asset ID</TableCell>
                  <TableCell>Asset Name</TableCell>
                  <TableCell>Employee ID</TableCell>
                  <TableCell>Employee Name</TableCell>
                  <TableCell>Return Date</TableCell>
                  <TableCell>Condition</TableCell>
                  <TableCell>HR Acceptance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {returnedAssets.map((returnAsset) => (
                  <TableRow key={returnAsset.id}>
                    <TableCell>{returnAsset.assetId}</TableCell>
                    <TableCell>{returnAsset.assetName}</TableCell>
                    <TableCell>{returnAsset.employeeId}</TableCell>
                    <TableCell>{returnAsset.employeeName}</TableCell>
                    <TableCell>{returnAsset.returnDate}</TableCell>
                    <TableCell>{returnAsset.condition}</TableCell>
                    <TableCell>
                      <Chip
                        label={returnAsset.hrAcceptance}
                        color={getStatusColor(returnAsset.hrAcceptance)}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* HR Acceptance Tab */}
        <TabPanel value={tabValue} index={5}>
          <Typography variant="h6" gutterBottom>
            HR Asset Return Acceptance
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Asset ID</TableCell>
                  <TableCell>Asset Name</TableCell>
                  <TableCell>Employee Name</TableCell>
                  <TableCell>Return Date</TableCell>
                  <TableCell>Condition</TableCell>
                  <TableCell>HR Acceptance</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {returnedAssets.map((returnAsset) => (
                  <TableRow key={returnAsset.id}>
                    <TableCell>{returnAsset.assetId}</TableCell>
                    <TableCell>{returnAsset.assetName}</TableCell>
                    <TableCell>{returnAsset.employeeName}</TableCell>
                    <TableCell>{returnAsset.returnDate}</TableCell>
                    <TableCell>{returnAsset.condition}</TableCell>
                    <TableCell>
                      <Chip
                        label={returnAsset.hrAcceptance}
                        color={getStatusColor(returnAsset.hrAcceptance)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {returnAsset.hrAcceptance === "Pending" && (
                        <Button size="small" variant="contained" onClick={() => handleHRAcceptance(returnAsset.id)}>
                          Accept Return
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Paper>

      {/* Add Asset Dialog */}
      <Dialog open={openAssetDialog} onClose={() => setOpenAssetDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Asset</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Asset ID" value={assetId} onChange={(e) => setAssetId(e.target.value)} />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Asset Name"
                value={assetName}
                onChange={(e) => setAssetName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Asset Type</InputLabel>
                <Select value={assetType} onChange={(e) => setAssetType(e.target.value)} label="Asset Type">
                  {assetTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Condition</InputLabel>
                <Select value={assetCondition} onChange={(e) => setAssetCondition(e.target.value)} label="Condition">
                  {assetConditions.map((condition) => (
                    <MenuItem key={condition} value={condition}>
                      {condition}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAssetDialog(false)}>Cancel</Button>
          <Button onClick={handleAddAsset} variant="contained">
            Add Asset
          </Button>
        </DialogActions>
      </Dialog>

      {/* Asset Allocation Dialog */}
      <Dialog open={openAllocationDialog} onClose={() => setOpenAllocationDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Allocate Asset to Employee</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Select Asset</InputLabel>
                <Select value={selectedAsset} onChange={(e) => setSelectedAsset(e.target.value)} label="Select Asset">
                  {assets
                    .filter((asset) => asset.status === "Available")
                    .map((asset) => (
                      <MenuItem key={asset.id} value={asset.id}>
                        {asset.id} - {asset.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Select Employee</InputLabel>
                <Select
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                  label="Select Employee"
                >
                  {employees.map((employee) => (
                    <MenuItem key={employee.id} value={employee.id}>
                      {employee.id} - {employee.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Allocation Date"
                value={allocationDate}
                onChange={(e) => setAllocationDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAllocationDialog(false)}>Cancel</Button>
          <Button onClick={handleAllocateAsset} variant="contained">
            Allocate Asset
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default AssetDashboard
