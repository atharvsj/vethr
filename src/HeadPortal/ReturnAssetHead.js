// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Chip,
//   Divider,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
//   Pagination, // 1. IMPORT THE PAGINATION COMPONENT
//   CircularProgress,
// } from "@mui/material";

// const ReturnAssetEmp = () => {
//   const [assets, setAssets] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 2. ADD STATE FOR PAGINATION
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showEntries, setShowEntries] = useState(10);

//   const employeeCode = localStorage.getItem("loggedInUser");
//   console.log("logged in user", employeeCode);

//   const fetchAssets = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `https://tdtlworld.com/hrms-backend/employee_assets/${employeeCode}/`
//       );

//       const mappedAssets = response.data.map((item) => {
//         let status;
//         if (item.employee_confirmation === "accepted") {
//           status = "received";
//         } else if (item.employee_confirmation === "rejected") {
//           status = "not_received";
//         } else {
//           status = "pending";
//         }

//         return {
//           id: item.id,
//           name: item.assets_name,
//           category: item.category_name || "—",
//           brand: item.brand_name || "—",
//           code: item.company_asset_code || "—",
//           serialNumber: item.serial_number || "—",
//           isWorking: item.is_working || "—",
//           createdAt: item.created_at.split(" ")[0],
//           status: status,
//           returnRequestStatus: item.return_request_status,
//         };
//       });
//       setAssets(mappedAssets);
//     } catch (error) {
//       console.error("Error fetching assets:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusChange = async (assetId, newStatus) => {
//     try {
//       await axios.patch(
//         `https://tdtlworld.com/hrms-backend/employee_confirm_asset/${assetId}/`,
//         {
//           action: newStatus,
//         }
//       );
//       await fetchAssets();
//     } catch (error) {
//       console.error(
//         "Failed to update asset status:",
//         error.response ? error.response.data : error.message
//       );
//       alert(
//         `Error: ${error.response?.data?.error || "Could not update asset status."
//         }`
//       );
//     }
//   };

//   const handleReturnAsset = async (assetId) => {
//     try {
//       await axios.patch(
//         `https://tdtlworld.com/hrms-backend/employee_confirm_asset/${assetId}/`,
//         {
//           action: "return",
//         }
//       );
//       await fetchAssets();
//     } catch (error) {
//       console.error(
//         "Failed to return asset:",
//         error.response ? error.response.data : error.message
//       );
//       alert(
//         `Error: ${error.response?.data?.error || "Could not request asset return."
//         }`
//       );
//     }
//   };

//   useEffect(() => {
//     if (employeeCode) {
//       fetchAssets();
//     } else {
//       setLoading(false);
//     }
//   }, [employeeCode]);

//   // Reset to first page if number of entries changes
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [showEntries]);

//   // 3. CALCULATE PAGINATION VALUES
//   const totalPages = Math.ceil(assets.length / showEntries);
//   const startIndex = (currentPage - 1) * showEntries;
//   const endIndex = startIndex + showEntries;
//   const paginatedAssets = assets.slice(startIndex, endIndex);

//   return (
//     <Card elevation={0} sx={{ backgroundColor: "#f5f5f5", borderRadius: 2 }}>
//       <CardContent sx={{ backgroundColor: "white", borderRadius: 2, p: 3 }}>
//         <Box
//           display="flex"
//           justifyContent="space-between"
//           alignItems="center"
//           mb={2}
//         >
//           <Typography variant="subtitle1" fontWeight="bold">
//             List All Assets
//           </Typography>
//         </Box>

//         <Box
//           display="flex"
//           justifyContent="space-between"
//           alignItems="center"
//           mb={2}
//         >
//           <FormControl size="small">
//             <InputLabel>Show</InputLabel>
//             {/* 4. CONNECT THE "SHOW ENTRIES" DROPDOWN TO STATE */}
//             <Select
//               value={showEntries}
//               onChange={(e) => setShowEntries(Number(e.target.value))}
//               label="Show"
//               sx={{ width: 80 }}
//             >
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={25}>25</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//             </Select>
//           </FormControl>
//           <TextField size="small" placeholder="Search" sx={{ width: 200 }} />
//         </Box>

//         <TableContainer>
//           <Table size="small">
//             <TableHead sx={{ backgroundColor: "#f9fafb" }}>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: 'bold', width: '5%' }}>SR NO</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', minWidth: 150 }}>ASSET NAME</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>CATEGORY</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>BRAND</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>ASSET CODE</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>SERIAL NO.</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', width: '8%' }}>IS WORKING?</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>📅 CREATED AT</TableCell>
               
//                 <TableCell sx={{ fontWeight: 'bold', minWidth: 130 }}>RETURN ASSET</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 <TableRow>
//                   <TableCell colSpan={11} align="center" sx={{ py: 4 }}>
//                     <CircularProgress />
//                   </TableCell>
//                 </TableRow>
//               ) : assets.length > 0 ? (
//                 // 5. RENDER THE PAGINATED DATA INSTEAD OF THE FULL LIST
//                 paginatedAssets.map((asset, index) => (
//                   <TableRow key={asset.id} hover>
//                     <TableCell sx={{ wordWrap: 'break-word' }}>{startIndex + index + 1}</TableCell>
//                     <TableCell sx={{ wordWrap: 'break-word' }}>{asset.name}</TableCell>
//                     <TableCell sx={{ wordWrap: 'break-word' }}>{asset.category}</TableCell>
//                     <TableCell sx={{ wordWrap: 'break-word' }}>{asset.brand}</TableCell>
//                     <TableCell sx={{ wordWrap: 'break-word' }}>{asset.code}</TableCell>
//                     <TableCell sx={{ wordWrap: 'break-word' }}>{asset.serialNumber}</TableCell>
//                     <TableCell sx={{ wordWrap: 'break-word' }}>{asset.isWorking}</TableCell>
//                     <TableCell sx={{ wordWrap: 'break-word' }}>{asset.createdAt}</TableCell>
                   
//                     <TableCell>
//                       {asset.status === "received" ? (
//                         <>
//                           {asset.returnRequestStatus === "0" && (
//                             <Button
//                               variant="outlined"
//                               color="primary"
//                               size="small"
//                               onClick={() => handleReturnAsset(asset.id)}
//                             >
//                               Return Asset
//                             </Button>
//                           )}
//                           {asset.returnRequestStatus === "1" && (
//                             <Chip
//                               label="Pending"
//                               color="warning"
//                               size="small"
//                             />
//                           )}
//                           {asset.returnRequestStatus === "2" && (
//                             <Chip label="Returned" color="info" size="small" />
//                           )}
//                         </>
//                       ) : (
//                         "—"
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={11} align="center">
//                     No records available
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <Divider sx={{ my: 2 }} />

//         <Box display="flex" justifyContent="space-between" alignItems="center">
//           {/* 6. MAKE THE "SHOWING..." TEXT DYNAMIC */}
//           <Typography variant="body2">
//             {assets.length > 0
//               ? `Showing ${startIndex + 1} to ${Math.min(endIndex, assets.length)} of ${assets.length} entries`
//               : "No records available"}
//           </Typography>
//           {/* 7. REPLACE BUTTONS WITH THE PAGINATION COMPONENT */}
//           {totalPages > 1 && (
//             <Pagination
//               count={totalPages}
//               page={currentPage}
//               onChange={(e, value) => setCurrentPage(value)}
//               color="primary"
//               size="small"
//             />
//           )}
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default ReturnAssetEmp;













import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Box,
  Button,
  Chip,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  TablePagination,
  Skeleton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const ReturnAssetEmp = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const employeeCode = localStorage.getItem("loggedInUser");

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://tdtlworld.com/hrms-backend/employee_assets/${employeeCode}/`
      );
      const mappedAssets = response.data.map((item) => {
        let status;
        if (item.employee_confirmation === "accepted") {
          status = "received";
        } else if (item.employee_confirmation === "rejected") {
          status = "not_received";
        } else {
          status = "pending";
        }
        return {
          id: item.id,
          name: item.assets_name,
          category: item.category_name || "—",
          brand: item.brand_name || "—",
          code: item.company_asset_code || "—",
          serialNumber: item.serial_number || "—",
          isWorking: item.is_working || "—",
          createdAt: item.created_at.split(" ")[0],
          status: status,
          returnRequestStatus: item.return_request_status,
        };
      });
      setAssets(mappedAssets);
    } catch (error) {
      console.error("Error fetching assets:", error);
      Swal.fire({
        icon: "error",
        title: "Fetch Error",
        text: "Could not fetch employee assets.",
        timer: 3000,
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReturnAsset = async (assetId) => {
    try {
      await axios.patch(
        `https://tdtlworld.com/hrms-backend/employee_confirm_asset/${assetId}/`,
        { action: "return" }
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Return request submitted successfully.",
        timer: 3000,
        showConfirmButton: false,
      });
      fetchAssets();
    } catch (error) {
      console.error("Failed to return asset:", error.response?.data || error.message);
      Swal.fire({
        icon: "error",
        title: "Request Failed",
        text: error.response?.data?.error || "Could not request asset return.",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  useEffect(() => {
    if (employeeCode) {
      fetchAssets();
    } else {
      setLoading(false);
    }
  }, [employeeCode]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredAssets = assets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedAssets = filteredAssets.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box component={Paper} p={3} elevation={3}>
      <Typography
        variant="h5"
        sx={{ color: "#8C257C", fontWeight: "bold", mb: 2 }}
      >
        My Assigned Assets
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          mb: 2,
          flexDirection: isMobile ? "column" : "row",
          gap: 2,
        }}
      >
        <TextField
          size="small"
          placeholder="Search ..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            width: isMobile ? "100%" : "auto",
          }}
        />
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
          <TableHead sx={{ backgroundColor: "#8C257C" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>SR NO</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>ASSET NAME</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>CATEGORY</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>BRAND</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>ASSET CODE</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>SERIAL NO.</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>IS WORKING?</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>ASSIGNED ON</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: 'center' }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              Array.from(new Array(rowsPerPage)).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell align="center">
                    <Skeleton variant="rectangular" width={120} height={30} />
                  </TableCell>
                </TableRow>
              ))
            ) : paginatedAssets.length > 0 ? (
              paginatedAssets.map((asset, index) => (
                <TableRow key={asset.id} hover>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{asset.name}</TableCell>
                  <TableCell>{asset.category}</TableCell>
                  <TableCell>{asset.brand}</TableCell>
                  <TableCell>{asset.code}</TableCell>
                  <TableCell>{asset.serialNumber}</TableCell>
                  <TableCell>{asset.isWorking}</TableCell>
                  <TableCell>{asset.createdAt}</TableCell>
                  <TableCell>
                    <Box display="flex" justifyContent="center" gap={0.5}>
                      {asset.status === "received" ? (
                        <>
                          {asset.returnRequestStatus === "0" && (
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => handleReturnAsset(asset.id)}
                              sx={{
                                color: '#8C257C',
                                borderColor: '#8C257C',
                                '&:hover': {
                                  backgroundColor: 'rgba(140, 37, 124, 0.04)',
                                  borderColor: '#6d1d60',
                                }
                              }}
                            >
                              Return Asset
                            </Button>
                          )}
                          {asset.returnRequestStatus === "1" && (
                            <Chip label="Pending" color="warning" size="small" />
                          )}
                          {asset.returnRequestStatus === "2" && (
                            <Chip label="Returned" color="info" size="small" />
                          )}
                        </>
                      ) : (
                        "—"
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No records available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 25]}
        component="div"
        count={filteredAssets.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
            '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                color: 'text.secondary',
            },
            '.MuiSvgIcon-root': {
                color: '#8C257C',
            },
        }}
      />
    </Box>
  );
};

export default ReturnAssetEmp;