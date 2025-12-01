import { useState, useEffect, useCallback } from "react"
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"
import { CheckCircle } from "@mui/icons-material"
import axiosInstance from '../../utils/axiosInstance';



const AssetsDashboardAdmin = () => {
  // --- STATE MANAGEMENT ---
  const [assetsData, setAssetsData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isUpdating, setIsUpdating] = useState(null)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })

  // State for search and pagination
  const [searchQuery, setSearchQuery] = useState("")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const electricPurple = "#8A2BE2"

  // --- API INTERACTIONS ---

  // 1. Fetch the main asset dashboard data on component load
  const fetchAssetData = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.get("hr-assets-dashboard/")
      setAssetsData(response.data.assets_status || [])
    } catch (error) {
      console.error("Error fetching asset dashboard data:", error)
      setSnackbar({ open: true, message: "Failed to load asset data.", severity: "error" })
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAssetData()
  }, [fetchAssetData])

  // 2. Filter data whenever the original data or search query changes
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase()
    const filtered = assetsData.filter(asset =>
      asset.employee_id?.toLowerCase().includes(lowercasedQuery) ||
      asset.name?.toLowerCase().includes(lowercasedQuery) ||
      asset.Asset_name?.toLowerCase().includes(lowercasedQuery)
    )
    setFilteredData(filtered)
  }, [searchQuery, assetsData])

  // 3. Handler for the "Approve" button
  const handleApproveReturn = async (assetId) => {
    setIsUpdating(assetId)
    try {
      // API call with the required payload
      await axiosInstance.patch(`hr-return-approval/${assetId}/`, { action: "return_yes" })
      
      // Update state locally for immediate UI feedback
      const updateAssetStatus = (data) => data.map(asset =>
        asset.asset_id === assetId ? { ...asset, return_status: "Completed" } : asset
      )
      setAssetsData(updateAssetStatus)
      setFilteredData(updateAssetStatus) // Also update the filtered data
      
      setSnackbar({ open: true, message: "Asset return approved successfully!", severity: "success" })
    } catch (error) {
      console.error("Error approving asset return:", error)
      setSnackbar({ open: true, message: "Failed to approve asset return.", severity: "error" })
    } finally {
      setIsUpdating(null)
    }
  }

  // --- PAGINATION HANDLERS ---
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0) // Reset to the first page when rows per page changes
  }

  // --- RENDER LOGIC ---

  // MODIFIED: This function now handles the new display logic
  const getStatusChip = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return <Chip label="Pending" color="warning" size="small" />;
      
      // These statuses will now display as "Completed"
      case "returned":
      case "return request":
      case "completed":
        return <Chip label="Completed" color="success" size="small" />;
        
      default:
        return <Chip label={status || "Unknown"} size="small" />;
    }
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        HR Assets Dashboard
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        {/* Top Controls: Rows per page and Search */}
        <Grid container spacing={2} sx={{ mb: 2 }} alignItems="center">
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Rows per page</InputLabel>
              <Select
                value={rowsPerPage}
                label="Rows per page"
                onChange={handleChangeRowsPerPage}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3} sx={{ ml: 'auto' }}>
            <TextField
              fullWidth
              size="small"
              label="Search"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setPage(0) // Reset page on search
              }}
            />
          </Grid>
        </Grid>

        <TableContainer>
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
              <CircularProgress />
              <Typography sx={{ ml: 2 }}>Loading Asset Data...</Typography>
            </Box>
          ) : (
            <Table sx={{ minWidth: 650 }} aria-label="assets table">
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Sr. No.</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Employee ID</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Employee Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Asset Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Emp Confirmation</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Return Status</TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((asset, index) => (
                      <TableRow key={asset.asset_id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                        <TableCell>{asset.employee_id}</TableCell>
                        <TableCell>{asset.name}</TableCell>
                        <TableCell>{asset.Asset_name}</TableCell>
                        <TableCell>
                          <Chip label={asset.employee_confirmation} color={asset.employee_confirmation === "accepted" ? "success" : "default"} variant="outlined" size="small" />
                        </TableCell>
                        <TableCell>{getStatusChip(asset.return_status)}</TableCell>
                        <TableCell align="center">
                          {/* MODIFIED: Button only shows if status is "pending" */}
                          {asset.return_status === "pending" && (
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => handleApproveReturn(asset.asset_id)}
                              disabled={isUpdating === asset.asset_id}
                               sx={{
                                backgroundColor: "#47cf1dff", // bright green
                                color: "#fff", // text color for contrast
                                transition: "background-color 0.3s ease",
                                "&:hover": {
                                  backgroundColor: "#1e7902", // dark green
                                },
                              }}
                            >
                              {isUpdating === asset.asset_id ? <CircularProgress size={20} color="inherit" /> : "Approve"}
                            </Button>
                          )}
                           {/* For all other statuses, no button is rendered */}
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">No matching assets found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        {/* Custom Pagination Controls */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Showing {filteredData.length > 0 ? page * rowsPerPage + 1 : 0} - {Math.min((page + 1) * rowsPerPage, filteredData.length)} of {filteredData.length}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              variant="contained"
              onClick={() => setPage(page - 1)}
              disabled={page === 0}
              sx={{ backgroundColor: electricPurple, '&:hover': { backgroundColor: '#7a1fb2' } }}
            >
              Previous
            </Button>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Page {page + 1}
            </Typography>
            <Button
              variant="contained"
              onClick={() => setPage(page + 1)}
              disabled={(page + 1) * rowsPerPage >= filteredData.length}
              sx={{ backgroundColor: electricPurple, '&:hover': { backgroundColor: '#7a1fb2' } }}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Snackbar for Notifications */}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity={snackbar.severity} sx={{ width: "100%" }} onClose={() => setSnackbar({ ...snackbar, open: false })}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  )
}

export default AssetsDashboardAdmin