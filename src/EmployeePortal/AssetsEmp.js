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
// } from "@mui/material";

// const AssetsEmp = () => {
//   const [assets, setAssets] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const employeeCode = localStorage.getItem("loggedInUser");
//   console.log("logged in user", employeeCode);

//   // Fetch assets from API
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
//           brand: item.manufacturer || "—",
//           code: item.company_asset_code || "—",
//           serialNumber: item.serial_number || "—",
//           isWorking: item.is_working || "—",
//           employee: item.employee_name || "—",
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

//   // Handle confirm/reject action
//   const handleStatusChange = async (assetId, newStatus) => {
//     try {
//       await axios.patch(
//         `https://tdtlworld.com/hrms-backend/employee_confirm_asset/${assetId}/`,
//         {
//           action: newStatus,
//         }
//       );
//       // Instead of manually setting state, we refetch to ensure data consistency
//       await fetchAssets();
//     } catch (error) {
//       console.error(
//         "Failed to update asset status:",
//         error.response ? error.response.data : error.message
//       );
//       alert(
//         `Error: ${error.response?.data?.error || "Could not update asset status."}`
//       );
//     }
//   };

//   // Handle return asset action
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
//         `Error: ${error.response?.data?.error || "Could not request asset return."}`
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
//             <Select defaultValue={10} label="Show" sx={{ width: 80 }}>
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={25}>25</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//             </Select>
//           </FormControl>
//           <TextField size="small" placeholder="Search" sx={{ width: 200 }} />
//         </Box>

//         {/* The TableContainer component provides horizontal scrolling on smaller
//             screens, making the table scalable without breaking the page layout. */}
//         <TableContainer>
//           {/* By setting a minWidth, we prevent columns from getting squished.
//               The table will maintain this width, and the TableContainer above
//               will handle the scrolling if the viewport is narrower. */}
//           <Table size="small" sx={{ minWidth: "1200px" }}>
//             <TableHead sx={{ backgroundColor: "#f9fafb" }}>
//               <TableRow>
//                 {[
//                   "SR NO",
//                   "ASSET NAME",
//                   "CATEGORY",
//                   "BRAND",
//                   "ASSET CODE",
//                   "SERIAL NO.",
//                   "IS WORKING?",
//                   "👤 EMPLOYEE",
//                   "📅 CREATED AT",
//                   "ACTION",
//                   "RETURN ASSET",
//                 ].map((header) => (
//                   <TableCell
//                     key={header}
//                     sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
//                   >
//                     {header}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 <TableRow>
//                   {/* --- FIX: Updated colSpan to match the total number of columns (11) --- */}
//                   <TableCell colSpan={11} align="center">
//                     Loading...
//                   </TableCell>
//                 </TableRow>
//               ) : assets.length > 0 ? (
//                 assets.map((asset, index) => (
//                   <TableRow key={asset.id} hover>
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell>{asset.name}</TableCell>
//                     <TableCell>{asset.category}</TableCell>
//                     <TableCell>{asset.brand}</TableCell>
//                     <TableCell>{asset.code}</TableCell>
//                     <TableCell>{asset.serialNumber}</TableCell>
//                     <TableCell>{asset.isWorking}</TableCell>
//                     <TableCell>{asset.employee}</TableCell>
//                     <TableCell>{asset.createdAt}</TableCell>
//                     <TableCell>
//                       {asset.status === "pending" && (
//                         <Box display="flex" gap={1}>
//                           <Button
//                             variant="outlined"
//                             color="success"
//                             size="small"
//                             onClick={() =>
//                               handleStatusChange(asset.id, "accepted")
//                             }
//                           >
//                             Received
//                           </Button>
//                         </Box>
//                       )}
//                       {asset.status === "received" && (
//                         <Chip label="Received" color="success" size="small" />
//                       )}
//                       {asset.status === "not_received" && (
//                         <Chip label="Not Received" color="error" size="small" />
//                       )}
//                     </TableCell>
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
//                   {/* --- FIX: Updated colSpan to match the total number of columns (11) --- */}
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
//           <Typography variant="body2">
//             {assets.length > 0
//               ? `Showing 1 to ${assets.length} of ${assets.length} entries`
//               : "No records available"}
//           </Typography>
//           <Box>
//             <Button size="small" disabled>
//               Previous
//             </Button>
//             <Button size="small">Next</Button>
//           </Box>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default AssetsEmp;



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
// } from "@mui/material";

// const AssetsEmp = () => {
//   const [assets, setAssets] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const employeeCode = localStorage.getItem("loggedInUser");
//   console.log("logged in user", employeeCode);

//   // Fetch assets from API
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
//           // employee: item.employee_name || "—",
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

//   // Handle confirm/reject action
//   const handleStatusChange = async (assetId, newStatus) => {
//     try {
//       await axios.patch(
//         `https://tdtlworld.com/hrms-backend/employee_confirm_asset/${assetId}/`,
//         {
//           action: newStatus,
//         }
//       );
//       // Instead of manually setting state, we refetch to ensure data consistency
//       await fetchAssets();
//     } catch (error) {
//       console.error(
//         "Failed to update asset status:",
//         error.response ? error.response.data : error.message
//       );
//       alert(
//         `Error: ${error.response?.data?.error || "Could not update asset status."}`
//       );
//     }
//   };

//   // Handle return asset action
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
//         `Error: ${error.response?.data?.error || "Could not request asset return."}`
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
//             <Select defaultValue={10} label="Show" sx={{ width: 80 }}>
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={25}>25</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//             </Select>
//           </FormControl>
//           <TextField size="small" placeholder="Search" sx={{ width: 200 }} />
//         </Box>

//         {/* The TableContainer component provides horizontal scrolling on smaller
//             screens, making the table scalable without breaking the page layout. */}
//         <TableContainer>
//           {/* By setting a minWidth, we prevent columns from getting squished.
//               The table will maintain this width, and the TableContainer above
//               will handle the scrolling if the viewport is narrower. */}
//           <Table size="small" sx={{ minWidth: "1200px" }}>
//             <TableHead sx={{ backgroundColor: "#f9fafb" }}>
//               <TableRow>
//                 {[
//                   "SR NO",
//                   "ASSET NAME",
//                   "CATEGORY",
//                   "BRAND",
//                   "ASSET CODE",
//                   "SERIAL NO.",
//                   "IS WORKING?",
//                   // "👤 EMPLOYEE",
//                   "📅 CREATED AT",
//                   "ACTION",
//                   "RETURN ASSET",
//                 ].map((header) => (
//                   <TableCell
//                     key={header}
//                     sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
//                   >
//                     {header}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 <TableRow>
//                   {/* --- FIX: Updated colSpan to match the total number of columns (11) --- */}
//                   <TableCell colSpan={11} align="center">
//                     Loading...
//                   </TableCell>
//                 </TableRow>
//               ) : assets.length > 0 ? (
//                 assets.map((asset, index) => (
//                   <TableRow key={asset.id} hover>
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell>{asset.name}</TableCell>
//                     <TableCell>{asset.category}</TableCell>
//                     <TableCell>{asset.brand}</TableCell>
//                     <TableCell>{asset.code}</TableCell>
//                     <TableCell>{asset.serialNumber}</TableCell>
//                     <TableCell>{asset.isWorking}</TableCell>
//                     {/* <TableCell>{asset.employee}</TableCell> */}
//                     <TableCell>{asset.createdAt}</TableCell>
//                     <TableCell>
//                       {asset.status === "pending" && (
//                         <Box display="flex" gap={1}>
//                           <Button
//                             variant="outlined"
//                             color="success"
//                             size="small"
//                             onClick={() =>
//                               handleStatusChange(asset.id, "accepted")
//                             }
//                           >
//                             Received
//                           </Button>
//                         </Box>
//                       )}
//                       {asset.status === "received" && (
//                         <Chip label="Received" color="success" size="small" />
//                       )}
//                       {asset.status === "not_received" && (
//                         <Chip label="Not Received" color="error" size="small" />
//                       )}
//                     </TableCell>
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
//                   {/* --- FIX: Updated colSpan to match the total number of columns (11) --- */}
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
//           <Typography variant="body2">
//             {assets.length > 0
//               ? `Showing 1 to ${assets.length} of ${assets.length} entries`
//               : "No records available"}
//           </Typography>
//           <Box>
//             <Button size="small" disabled>
//               Previous
//             </Button>
//             <Button size="small">Next</Button>
//           </Box>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default AssetsEmp;









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
// } from "@mui/material";

// const AssetsEmp = () => {
//   const [assets, setAssets] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const employeeCode = localStorage.getItem("loggedInUser");
//   console.log("logged in user", employeeCode);

//   // Fetch assets from API
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
//           employee: item.employee_name || "—",
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

//   // Handle confirm/reject action
//   const handleStatusChange = async (assetId, newStatus) => {
//     try {
//       await axios.patch(
//         `https://tdtlworld.com/hrms-backend/employee_confirm_asset/${assetId}/`,
//         {
//           action: newStatus,
//         }
//       );
//       // Instead of manually setting state, we refetch to ensure data consistency
//       await fetchAssets();
//     } catch (error) {
//       console.error(
//         "Failed to update asset status:",
//         error.response ? error.response.data : error.message
//       );
//       alert(
//         `Error: ${error.response?.data?.error || "Could not update asset status."}`
//       );
//     }
//   };

//   // Handle return asset action
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
//         `Error: ${error.response?.data?.error || "Could not request asset return."}`
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
//             <Select defaultValue={10} label="Show" sx={{ width: 80 }}>
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={25}>25</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//             </Select>
//           </FormControl>
//           <TextField size="small" placeholder="Search" sx={{ width: 200 }} />
//         </Box>

//         {/* The TableContainer component provides horizontal scrolling on smaller
//             screens, making the table scalable without breaking the page layout. */}
//         <TableContainer>
//           {/* By setting a minWidth, we prevent columns from getting squished.
//               The table will maintain this width, and the TableContainer above
//               will handle the scrolling if the viewport is narrower. */}
//           <Table size="small" sx={{ minWidth: "1200px" }}>
//             <TableHead sx={{ backgroundColor: "#f9fafb" }}>
//               <TableRow>
//                 {[
//                   "SR NO",
//                   "ASSET NAME",
//                   "CATEGORY",
//                   "BRAND",
//                   "ASSET CODE",
//                   "SERIAL NO.",
//                   "IS WORKING?",
//                   "👤 EMPLOYEE",
//                   "📅 CREATED AT",
//                   "ACTION",
//                   "RETURN ASSET",
//                 ].map((header) => (
//                   <TableCell
//                     key={header}
//                     sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
//                   >
//                     {header}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 <TableRow>
//                   {/* --- FIX: Updated colSpan to match the total number of columns (11) --- */}
//                   <TableCell colSpan={11} align="center">
//                     Loading...
//                   </TableCell>
//                 </TableRow>
//               ) : assets.length > 0 ? (
//                 assets.map((asset, index) => (
//                   <TableRow key={asset.id} hover>
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell>{asset.name}</TableCell>
//                     <TableCell>{asset.category}</TableCell>
//                     <TableCell>{asset.brand}</TableCell>
//                     <TableCell>{asset.code}</TableCell>
//                     <TableCell>{asset.serialNumber}</TableCell>
//                     <TableCell>{asset.isWorking}</TableCell>
//                     <TableCell>{asset.employee}</TableCell>
//                     <TableCell>{asset.createdAt}</TableCell>
//                     <TableCell>
//                       {asset.status === "pending" && (
//                         <Box display="flex" gap={1}>
//                           <Button
//                             variant="outlined"
//                             color="success"
//                             size="small"
//                             onClick={() =>
//                               handleStatusChange(asset.id, "received")
//                             }
//                           >
//                             Received
//                           </Button>
//                         </Box>
//                       )}
//                       {asset.status === "received" && (
//                         <Chip label="Received" color="success" size="small" />
//                       )}
//                       {asset.status === "not_received" && (
//                         <Chip label="Not Received" color="error" size="small" />
//                       )}
//                     </TableCell>
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
//                   {/* --- FIX: Updated colSpan to match the total number of columns (11) --- */}
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
//           <Typography variant="body2">
//             {assets.length > 0
//               ? `Showing 1 to ${assets.length} of ${assets.length} entries`
//               : "No records available"}
//           </Typography>
//           <Box>
//             <Button size="small" disabled>
//               Previous
//             </Button>
//             <Button size="small">Next</Button>
//           </Box>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default AssetsEmp;/////






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
// } from "@mui/material";

// const AssetsEmp = () => {
//   const [assets, setAssets] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const employeeCode = localStorage.getItem("loggedInUser");
//   console.log("logged in user", employeeCode);

//   // Fetch assets from API
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
//           employee: item.employee_name || "—",
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

//   // Handle confirm/reject action
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

//   // Handle return asset action
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
//             <Select defaultValue={10} label="Show" sx={{ width: 80 }}>
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={25}>25</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//             </Select>
//           </FormControl>
//           <TextField size="small" placeholder="Search" sx={{ width: 200 }} />
//         </Box>

//         {/* --- CHANGE: We keep TableContainer for good practice on very small screens --- */}
//         <TableContainer>
//           {/* --- CHANGE: Removed the minWidth property to allow the table to be flexible --- */}
//           <Table size="small">
//             <TableHead sx={{ backgroundColor: "#f9fafb" }}>
//               <TableRow>
//                 {/* --- CHANGE: Column headers are now defined with specific widths and wrapping behavior --- */}
//                 <TableCell sx={{ fontWeight: 'bold', width: '5%' }}>SR NO</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', minWidth: 150 }}>ASSET NAME</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>CATEGORY</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>BRAND</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>ASSET CODE</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>SERIAL NO.</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', width: '8%' }}>IS WORKING?</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', minWidth: 150 }}>👤 EMPLOYEE</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>📅 CREATED AT</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', minWidth: 120 }}>ACTION</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', minWidth: 130 }}>RETURN ASSET</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 <TableRow>
//                   <TableCell colSpan={11} align="center">
//                     Loading...
//                   </TableCell>
//                 </TableRow>
//               ) : assets.length > 0 ? (
//                 assets.map((asset, index) => (
//                   <TableRow key={asset.id} hover>
//                     {/* --- CHANGE: Added wordWrap to cells to prevent them from stretching the table --- */}
//                     <TableCell sx={{ wordWrap: 'break-word' }}>{index + 1}</TableCell>
//                     <TableCell sx={{ wordWrap: 'break-word' }}>{asset.name}</TableCell>
//                     <TableCell sx={{ wordWrap: 'break-word' }}>{asset.category}</TableCell>
//                     <TableCell sx={{ wordWrap: 'break-word' }}>{asset.brand}</TableCell>
//                     <TableCell sx={{ wordWrap: 'break-word' }}>{asset.code}</TableCell>
//                     <TableCell sx={{ wordWrap: 'break-word' }}>{asset.serialNumber}</TableCell>
//                     <TableCell sx={{ wordWrap: 'break-word' }}>{asset.isWorking}</TableCell>
//                     <TableCell sx={{ wordWrap: 'break-word' }}>{asset.employee}</TableCell>
//                     <TableCell sx={{ wordWrap: 'break-word' }}>{asset.createdAt}</TableCell>
//                     <TableCell>
//                       {asset.status === "pending" && (
//                         <Box display="flex" gap={1}>
//                           <Button
//                             variant="outlined"
//                             color="success"
//                             size="small"
//                             onClick={() =>
//                               handleStatusChange(asset.id, "received")
//                             }
//                           >
//                             Received
//                           </Button>
//                         </Box>
//                       )}
//                       {asset.status === "received" && (
//                         <Chip label="Received" color="success" size="small" />
//                       )}
//                       {asset.status === "not_received" && (
//                         <Chip label="Not Received" color="error" size="small" />
//                       )}
//                     </TableCell>
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
//           <Typography variant="body2">
//             {assets.length > 0
//               ? `Showing 1 to ${assets.length} of ${assets.length} entries`
//               : "No records available"}
//           </Typography>
//           <Box>
//             <Button size="small" disabled>
//               Previous
//             </Button>
//             <Button size="small">Next</Button>
//           </Box>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default AssetsEmp; 



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

// const AssetsEmp = () => {
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
//                 <TableCell sx={{ fontWeight: 'bold', minWidth: 120 }}>ACTION</TableCell>
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
//                       {asset.status === "pending" && (
//                         <Box display="flex" gap={1}>
//                           <Button
//                             variant="outlined"
//                             color="success"
//                             size="small"
//                             onClick={() =>
//                               handleStatusChange(asset.id, "received")
//                             }
//                           >
//                             Received
//                           </Button>
//                         </Box>
//                       )}
//                       {asset.status === "received" && (
//                         <Chip label="Received" color="success" size="small" />
//                       )}
//                       {asset.status === "not_received" && (
//                         <Chip label="Not Received" color="error" size="small" />
//                       )}
//                     </TableCell>
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

// export default AssetsEmp;  ////




// // import React, { useEffect, useState, useMemo } from "react"; // Added useMemo
// // import axios from "axios";
// // import {
// //   Box,
// //   Button,
// //   Card,
// //   CardContent,
// //   Chip,
// //   Divider,
// //   FormControl,
// //   InputLabel,
// //   MenuItem,
// //   Select,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   TextField,
// //   Typography,
// //   Pagination,
// //   CircularProgress,
// //   Paper,
// // } from "@mui/material";

// // const AssetsEmp = () => {
// //   const [assets, setAssets] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [showEntries, setShowEntries] = useState(10);
// //   const [searchQuery, setSearchQuery] = useState(""); // State for search input

// //   const employeeCode = localStorage.getItem("loggedInUser");

// //   const fetchAssets = async () => {
// //     setLoading(true);
// //     try {
// //       const response = await axios.get(
// //         `https://tdtlworld.com/hrms-backend/employee_assets/${employeeCode}/`
// //       );

// //       const mappedAssets = response.data.map((item) => {
// //         let status;
// //         if (item.employee_confirmation === "accepted") {
// //           status = "received";
// //         } else if (item.employee_confirmation === "rejected") {
// //           status = "not_received";
// //         } else {
// //           status = "pending";
// //         }

// //         return {
// //           id: item.id,
// //           name: item.assets_name,
// //           category: item.category_name || "—",
// //           brand: item.brand_name || "—",
// //           code: item.company_asset_code || "—",
// //           serialNumber: item.serial_number || "—",
// //           isWorking: item.is_working || "—",
// //           createdAt: item.created_at.split(" ")[0],
// //           status: status,
// //           returnRequestStatus: item.return_request_status,
// //         };
// //       });
// //       setAssets(mappedAssets);
// //     } catch (error) {
// //       console.error("Error fetching assets:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleStatusChange = async (assetId, newStatus) => {
// //     try {
// //       await axios.patch(
// //         `https://tdtlworld.com/hrms-backend/employee_confirm_asset/${assetId}/`,
// //         {
// //           action: newStatus,
// //         }
// //       );
// //       await fetchAssets();
// //     } catch (error) {
// //       console.error(
// //         "Failed to update asset status:",
// //         error.response ? error.response.data : error.message
// //       );
// //       alert(
// //         `Error: ${error.response?.data?.error || "Could not update asset status."}`
// //       );
// //     }
// //   };

// //   const handleReturnAsset = async (assetId) => {
// //     try {
// //       await axios.patch(
// //         `https://tdtlworld.com/hrms-backend/employee_confirm_asset/${assetId}/`,
// //         {
// //           action: "return",
// //         }
// //       );
// //       await fetchAssets();
// //     } catch (error) {
// //       console.error(
// //         "Failed to return asset:",
// //         error.response ? error.response.data : error.message
// //       );
// //       alert(
// //         `Error: ${error.response?.data?.error || "Could not request asset return."}`
// //       );
// //     }
// //   };

// //   useEffect(() => {
// //     if (employeeCode) {
// //       fetchAssets();
// //     } else {
// //       setLoading(false);
// //     }
// //   }, [employeeCode]);

// //   // Reset to first page if number of entries or search query changes
// //   useEffect(() => {
// //     setCurrentPage(1);
// //   }, [showEntries, searchQuery]);

// //   // Filter assets based on search query
// //   const filteredAssets = useMemo(() => {
// //     if (!searchQuery) return assets;
// //     const lowercasedQuery = searchQuery.toLowerCase();
// //     return assets.filter((asset) =>
// //       Object.values(asset).some((value) =>
// //         String(value).toLowerCase().includes(lowercasedQuery)
// //       )
// //     );
// //   }, [assets, searchQuery]);

// //   const totalPages = Math.ceil(filteredAssets.length / showEntries);
// //   const startIndex = (currentPage - 1) * showEntries;
// //   const endIndex = startIndex + showEntries;
// //   const paginatedAssets = filteredAssets.slice(startIndex, endIndex);

// //   return (
// //     <Card elevation={3} sx={{ borderRadius: 2 }}>
// //       <CardContent sx={{ p: { xs: 1.5, sm: 3 } }}>
// //         <Box
// //           display="flex"
// //           justifyContent="space-between"
// //           alignItems="center"
// //           mb={3}
// //         >
// //           <Typography variant="h5" fontWeight="600">
// //             My Assigned Assets
// //           </Typography>
// //         </Box>

// //         <Box
// //           display="flex"
// //           justifyContent="space-between"
// //           alignItems="center"
// //           mb={2}
// //           flexWrap="wrap"
// //           gap={2}
// //         >
// //           <FormControl size="small" variant="outlined">
// //             <InputLabel>Show</InputLabel>
// //             <Select
// //               value={showEntries}
// //               onChange={(e) => setShowEntries(Number(e.target.value))}
// //               label="Show"
// //               sx={{ width: 80 }}
// //             >
// //               {[10, 25, 50, 100].map(val => <MenuItem key={val} value={val}>{val}</MenuItem>)}
// //             </Select>
// //           </FormControl>
// //           <TextField
// //             size="small"
// //             placeholder="Search assets..."
// //             variant="outlined"
// //             value={searchQuery}
// //             onChange={(e) => setSearchQuery(e.target.value)}
// //             sx={{ width: { xs: '100%', sm: 300 } }}
// //           />
// //         </Box>

// //         <TableContainer component={Paper} variant="outlined">
// //           <Table size="small">
// //             <TableHead sx={{ backgroundColor: "#f9fafb" }}>
// //               <TableRow>
// //                 {[
// //                   'SR NO', 'ASSET NAME', 'CATEGORY', 'BRAND', 'ASSET CODE', 'SERIAL NO.',
// //                   'IS WORKING?', 'CREATED AT', 'ACTION', 'RETURN ASSET'
// //                 ].map((h) => (
// //                   <TableCell key={h} sx={{ fontWeight: '600' }}>
// //                     {h}
// //                   </TableCell>
// //                 ))}
// //               </TableRow>
// //             </TableHead>
// //             <TableBody>
// //               {loading ? (
// //                 <TableRow>
// //                   <TableCell colSpan={10} align="center" sx={{ py: 5 }}>
// //                     <CircularProgress />
// //                   </TableCell>
// //                 </TableRow>
// //               ) : paginatedAssets.length > 0 ? (
// //                 paginatedAssets.map((asset, index) => (
// //                   <TableRow key={asset.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
// //                     <TableCell>{startIndex + index + 1}</TableCell>
// //                     <TableCell>{asset.name}</TableCell>
// //                     <TableCell>{asset.category}</TableCell>
// //                     <TableCell>{asset.brand}</TableCell>
// //                     <TableCell>{asset.code}</TableCell>
// //                     <TableCell>{asset.serialNumber}</TableCell>
// //                     <TableCell>
// //                       <Chip
// //                         label={asset.isWorking}
// //                         size="small"
// //                         sx={{
// //                           backgroundColor:
// //                             asset.isWorking === 'Yes'
// //                               ? '#7C3AED'
// //                               : asset.isWorking === 'No'
// //                               ? (theme) => theme.palette.error.main
// //                               : (theme) => theme.palette.grey[500],
// //                           color: 'white',
// //                         }}
// //                       />
// //                     </TableCell>
// //                     <TableCell>{asset.createdAt}</TableCell>
// //                     <TableCell>
// //                       {asset.status === "pending" && (
// //                         <Button
// //                           variant="contained"
// //                           size="small"
// //                           sx={{ backgroundColor: '#7C3AED', '&:hover': { backgroundColor: '#6D28D9' } }}
// //                           onClick={() => handleStatusChange(asset.id, "received")}
// //                         >
// //                           Received
// //                         </Button>
// //                       )}
// //                       {asset.status === "received" && (
// //                         <Chip label="Received" size="small" sx={{ backgroundColor: '#7C3AED', color: 'white' }} />
// //                       )}
// //                       {asset.status === "not_received" && (
// //                         <Chip label="Not Received" color="error" size="small" />
// //                       )}
// //                     </TableCell>
// //                     <TableCell>
// //                       {asset.status === "received" ? (
// //                         <>
// //                           {asset.returnRequestStatus === "0" && (
// //                             <Button
// //                               variant="contained"
// //                               size="small"
// //                               sx={{ backgroundColor: '#7C3AED', '&:hover': { backgroundColor: '#6D28D9' } }}
// //                               onClick={() => handleReturnAsset(asset.id)}
// //                             >
// //                               Return Asset
// //                             </Button>
// //                           )}
// //                           {asset.returnRequestStatus === "1" && (
// //                             <Chip label="Pending" color="warning" size="small" />
// //                           )}
// //                           {asset.returnRequestStatus === "2" && (
// //                             <Chip label="Returned" size="small" sx={{ backgroundColor: '#7C3AED', color: 'white' }} />
// //                           )}
// //                         </>
// //                       ) : (
// //                         "—"
// //                       )}
// //                     </TableCell>
// //                   </TableRow>
// //                 ))
// //               ) : (
// //                 <TableRow>
// //                   <TableCell colSpan={10} align="center" sx={{ py: 5 }}>
// //                     No records available.
// //                   </TableCell>
// //                 </TableRow>
// //               )}
// //             </TableBody>
// //           </Table>
// //         </TableContainer>

// //         <Divider sx={{ my: 2 }} />

// //         <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
// //           <Typography variant="body2" color="text.secondary">
// //             {filteredAssets.length > 0
// //               ? `Showing ${startIndex + 1} to ${Math.min(endIndex, filteredAssets.length)} of ${filteredAssets.length} entries`
// //               : "No records available"}
// //           </Typography>
// //           {totalPages > 1 && (
// //             <Pagination
// //               count={totalPages}
// //               page={currentPage}
// //               onChange={(e, value) => setCurrentPage(value)}
// //               color="primary"
// //               sx={{ '& .Mui-selected': { backgroundColor: '#7C3AED', color: 'white' }, '& .MuiPaginationItem-root:hover': { backgroundColor: 'rgba(124, 58, 237, 0.1)' } }}
// //               size="small"
// //               showFirstButton
// //               showLastButton
// //             />
// //           )}
// //         </Box>
// //       </CardContent>
// //     </Card>
// //   );
// // };

// // export default AssetsEmp;










//   import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Chip,
//   FormControl,
//   InputAdornment,
//   InputLabel,
//   MenuItem,
//   Paper,
//   Select,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
//   TablePagination,
//   Skeleton,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import Swal from "sweetalert2";

// const AssetsEmp = () => {
//   const [assets, setAssets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const employeeCode = localStorage.getItem("loggedInUser");

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
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Could not fetch assets.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
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
//       Swal.fire({
//         icon: "success",
//         title: "Success",
//         text: "Asset status updated successfully.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//       fetchAssets();
//     } catch (error) {
//       console.error(
//         "Failed to update asset status:",
//         error.response ? error.response.data : error.message
//       );
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text:
//           error.response?.data?.error || "Could not update asset status.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
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
//       Swal.fire({
//         icon: "success",
//         title: "Success",
//         text: "Asset return requested successfully.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//       fetchAssets();
//     } catch (error) {
//       console.error(
//         "Failed to return asset:",
//         error.response ? error.response.data : error.message
//       );
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text:
//           error.response?.data?.error || "Could not request asset return.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     }
//   };

//   useEffect(() => {
//     if (employeeCode) {
//       fetchAssets();
//     } else {
//       setLoading(false);
//     }
//   }, [employeeCode]);

//   const filteredAssets = assets.filter((asset) =>
//     asset.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const paginatedAssets = filteredAssets.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   return (
//     <Box component={Paper} p={3}>
//       <Typography
//         variant="h4"
//         sx={{ color: "#8C257C", fontWeight: "bold", mb: 4}}
//       >
//         List All Assets
//       </Typography>

//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         flexDirection={isMobile ? "column" : "row"}
//         gap={2}
//         mb={2}
//       >
//         <Box flexGrow={isMobile ? 1 : 0} width={isMobile ? "100%" : "auto"}></Box>
//         <TextField
//           size="small"
//           placeholder="Search ..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//           sx={{ width: isMobile ? "100%" : "auto" }}
//         />
//       </Box>

//       <TableContainer sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//         <Table size="small">
//           <TableHead sx={{ backgroundColor: "#8C257C" }}>
//             <TableRow>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>
//                 SR. NO.
//               </TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>
//                 ASSET PRODUCT NAME
//               </TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>
//                 CATEGORY
//               </TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>
//                 BRAND
//               </TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>
//                 ASSET CODE
//               </TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>
//                 SERIAL NO.
//               </TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>
//                 IS WORKING?
//               </TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>
//                 CREATED AT
//               </TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>
//                 ACTION
//               </TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>
//                 RETURN ASSET
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               [...Array(rowsPerPage)].map((_, i) => (
//                 <TableRow key={i}>
//                   <TableCell>
//                     <Skeleton variant="text" />
//                   </TableCell>
//                   <TableCell>
//                     <Skeleton variant="text" />
//                   </TableCell>
//                   <TableCell>
//                     <Skeleton variant="text" />
//                   </TableCell>
//                   <TableCell>
//                     <Skeleton variant="text" />
//                   </TableCell>
//                   <TableCell>
//                     <Skeleton variant="text" />
//                   </TableCell>
//                   <TableCell>
//                     <Skeleton variant="text" />
//                   </TableCell>
//                   <TableCell>
//                     <Skeleton variant="text" />
//                   </TableCell>
//                   <TableCell>
//                     <Skeleton variant="text" />
//                   </TableCell>
//                   <TableCell>
//                     <Skeleton variant="rectangular" width={120} height={30} />
//                   </TableCell>
//                   <TableCell>
//                     <Skeleton variant="rectangular" width={120} height={30} />
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : paginatedAssets.length > 0 ? (
//               paginatedAssets.map((asset, index) => (
//                 <TableRow key={asset.id} hover>
//                   <TableCell sx={{ fontSize: "0.95rem" }}>
//                     {page * rowsPerPage + index + 1}
//                   </TableCell>
//                   <TableCell sx={{ fontSize: "0.95rem" }}>
//                     {asset.name}
//                   </TableCell>
//                   <TableCell sx={{ fontSize: "0.95rem" }}>
//                     {asset.category}
//                   </TableCell>
//                   <TableCell sx={{ fontSize: "0.95rem" }}>
//                     {asset.brand}
//                   </TableCell>
//                   <TableCell sx={{ fontSize: "0.95rem" }}>
//                     {asset.code}
//                   </TableCell>
//                   <TableCell sx={{ fontSize: "0.95rem" }}>
//                     {asset.serialNumber}
//                   </TableCell>
//                   <TableCell sx={{ fontSize: "0.95rem" }}>
//                     {asset.isWorking}
//                   </TableCell>
//                   <TableCell sx={{ fontSize: "0.95rem" }}>
//                     {asset.createdAt}
//                   </TableCell>
//                   <TableCell>
//                     <Box display="flex" justifyContent="center" gap={0.5}>
//                       {asset.status === "pending" && (
//                         <Button
//                           variant="outlined"
//                           color="success"
//                           size="small"
//                           onClick={() =>
//                             handleStatusChange(asset.id, "received")
//                           }
//                         >
//                           Received
//                         </Button>
//                       )}
//                       {asset.status === "received" && (
//                         <Chip label="Received" color="success" size="small" />
//                       )}
//                       {asset.status === "not_received" && (
//                         <Chip label="Not Received" color="error" size="small" />
//                       )}
//                     </Box>
//                   </TableCell>
//                   <TableCell>
//                     <Box display="flex" justifyContent="center" gap={0.5}>
//                       {asset.status === "received" ? (
//                         <>
//                           {asset.returnRequestStatus === "0" && (
//                             <Button
//                               variant="contained"
//                               size="small"
//                               onClick={() => handleReturnAsset(asset.id)}
//                               sx={{
//                                 backgroundColor: "#8C257C",
//                                 color: "white",
//                                 "&:hover": {
//                                   backgroundColor: "#6d1d60",
//                                 },
//                               }}
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
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={10} align="center">
//                   No records available
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Box
//         display="flex"
//         justifyContent={isMobile ? "center" : "space-between"}
//         alignItems="center"
//         flexDirection={isMobile ? "column" : "row"}
//         mt={2}
//       >
//         <Typography variant="body2" color="text.secondary">
//           Showing {Math.max(0, page * rowsPerPage + 1)} to{" "}
//           {Math.min(filteredAssets.length, (page + 1) * rowsPerPage)} of{" "}
//           {filteredAssets.length} results
//         </Typography>
//         <TablePagination
//           component="div"
//           count={filteredAssets.length}
//           page={page}
//           onPageChange={(event, newPage) => setPage(newPage)}
//           rowsPerPage={rowsPerPage}
//           onRowsPerPageChange={(event) => {
//             setRowsPerPage(parseInt(event.target.value, 10));
//             setPage(0);
//           }}
//           rowsPerPageOptions={[5, 10, 15, 25]}
//           sx={{
//             "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows, & .MuiTablePagination-actions":
//             {
//               color: "#8C257C",
//             },
//           }}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default AssetsEmp;
















// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Chip,
//   FormControl,
//   InputAdornment,
//   InputLabel,
//   MenuItem,
//   Paper,
//   Select,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
//   TablePagination,
//   Skeleton,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import Swal from "sweetalert2";

// const AssetsEmp = () => {
//   const [assets, setAssets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const employeeCode = localStorage.getItem("loggedInUser");

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
//           quantity: item.quantity || "—",
//           createdAt: item.created_at.split(" ")[0],
//           status: status,
//           returnRequestStatus: item.return_request_status,
//         };
//       });
//       setAssets(mappedAssets);
//     } catch (error) {
//       console.error("Error fetching assets:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Could not fetch assets.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
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
//       Swal.fire({
//         icon: "success",
//         title: "Success",
//         text: "Asset status updated successfully.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//       fetchAssets();
//     } catch (error) {
//       console.error(
//         "Failed to update asset status:",
//         error.response ? error.response.data : error.message
//       );
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text:
//           error.response?.data?.error || "Could not update asset status.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
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
//       Swal.fire({
//         icon: "success",
//         title: "Success",
//         text: "Asset return requested successfully.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//       fetchAssets();
//     } catch (error) {
//       console.error(
//         "Failed to return asset:",
//         error.response ? error.response.data : error.message
//       );
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text:
//           error.response?.data?.error || "Could not request asset return.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     }
//   };

//   useEffect(() => {
//     if (employeeCode) {
//       fetchAssets();
//     } else {
//       setLoading(false);
//     }
//   }, [employeeCode]);

//   const filteredAssets = assets.filter((asset) =>
//     asset.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const paginatedAssets = filteredAssets.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   return (
//     <Box component={Paper} p={3}>
//       <Typography
//         variant="h4"
//         sx={{ color: "#8C257C", fontWeight: "bold", mb: 4 }}
//       >
//         List All Assets
//       </Typography>



//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         flexDirection={isMobile ? "column" : "row"}
//         gap={2}
//         mb={2}
//       >
//         <Box
//           flexGrow={isMobile ? 1 : 0}
//           width={isMobile ? "100%" : "auto"}
//         ></Box>
//         <TextField
//           size="small"
//           placeholder="Search ..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//           sx={{ width: isMobile ? "100%" : "auto" }}
//         />
//       </Box>

//       <TableContainer sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//         <Table size="small">
//           <TableHead sx={{ backgroundColor: "#8C257C" }}>
//             <TableRow>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>
//                 SR. NO.
//               </TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>
//                 ASSET PRODUCT NAME
//               </TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>
//                 CATEGORY
//               </TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>
//                 BRAND
//               </TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>
//                 ASSET CODE
//               </TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>
//                 SERIAL NO.
//               </TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>
//                 IS WORKING
//               </TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>
//                 QUANTITY
//               </TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>
//                 CREATED AT
//               </TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>
//                 ACTION
//               </TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>
//                 RETURN ASSET
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading
//               ? [...Array(rowsPerPage)].map((_, i) => (
//                   <TableRow key={i}>
//                     <TableCell>
//                       <Skeleton variant="text" />
//                     </TableCell>
//                     <TableCell>
//                       <Skeleton variant="text" />
//                     </TableCell>
//                     <TableCell>
//                       <Skeleton variant="text" />
//                     </TableCell>
//                     <TableCell>
//                       <Skeleton variant="text" />
//                     </TableCell>
//                     <TableCell>
//                       <Skeleton variant="text" />
//                     </TableCell>
//                     <TableCell>
//                       <Skeleton variant="text" />
//                     </TableCell>
//                     <TableCell>
//                       <Skeleton variant="text" />
//                     </TableCell>
//                     <TableCell>
//                       <Skeleton variant="text" />
//                     </TableCell>
//                     <TableCell>
//                       <Skeleton variant="text" />
//                     </TableCell>
//                     <TableCell>
//                       <Skeleton
//                         variant="rectangular"
//                         width={120}
//                         height={30}
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <Skeleton
//                         variant="rectangular"
//                         width={120}
//                         height={30}
//                       />
//                     </TableCell>
//                   </TableRow>
//                 ))
//               : paginatedAssets.length > 0
//               ? paginatedAssets.map((asset, index) => (
//                   <TableRow key={asset.id} hover>
//                     <TableCell sx={{ fontSize: "0.95rem" }}>
//                       {page * rowsPerPage + index + 1}
//                     </TableCell>
//                     <TableCell sx={{ fontSize: "0.95rem" }}>
//                       {asset.name}
//                     </TableCell>
//                     <TableCell sx={{ fontSize: "0.95rem" }}>
//                       {asset.category}
//                     </TableCell>
//                     <TableCell sx={{ fontSize: "0.95rem" }}>
//                       {asset.brand}
//                     </TableCell>
//                     <TableCell sx={{ fontSize: "0.95rem" }}>
//                       {asset.code}
//                     </TableCell>
//                     <TableCell sx={{ fontSize: "0.95rem" }}>
//                       {asset.serialNumber}
//                     </TableCell>
//                     <TableCell sx={{ fontSize: "0.95rem" }}>
//                       {asset.isWorking}
//                     </TableCell>
//                     <TableCell sx={{ fontSize: "0.95rem" }}>
//                       {asset.quantity}
//                     </TableCell>
//                     <TableCell sx={{ fontSize: "0.95rem" }}>
//                       {asset.createdAt}
//                     </TableCell>
//                     <TableCell>
//                       <Box display="flex" justifyContent="center" gap={0.5}>
//                         {asset.status === "pending" && (
//                           <Button
//                             variant="outlined"
//                             color="success"
//                             size="small"
//                             onClick={() =>
//                               handleStatusChange(asset.id, "received")
//                             }
//                           >
//                             Received
//                           </Button>
//                         )}
//                         {asset.status === "received" && (
//                           <Chip
//                             label="Received"
//                             color="success"
//                             size="small"
//                           />
//                         )}
//                         {asset.status === "not_received" && (
//                           <Chip
//                             label="Not Received"
//                             color="error"
//                             size="small"
//                           />
//                         )}
//                       </Box>
//                     </TableCell>
//                     <TableCell>
//                       <Box display="flex" justifyContent="center" gap={0.5}>
//                         {asset.status === "received" ? (
//                           <>
//                             {asset.returnRequestStatus === "0" && (
//                               <Button
//                                 variant="contained"
//                                 size="small"
//                                 onClick={() => handleReturnAsset(asset.id)}
//                                 sx={{
//                                   backgroundColor: "#8C257C",
//                                   color: "white",
//                                   "&:hover": {
//                                     backgroundColor: "#6d1d60",
//                                   },
//                                 }}
//                               >
//                                 Return Asset
//                               </Button>
//                             )}
//                             {asset.returnRequestStatus === "1" && (
//                               <Chip
//                                 label="Pending"
//                                 color="warning"
//                                 size="small"
//                               />
//                             )}
//                             {asset.returnRequestStatus === "2" && (
//                               <Chip
//                                 label="Returned"
//                                 color="info"
//                                 size="small"
//                               />
//                             )}
//                           </>
//                         ) : (
//                           "—"
//                         )}
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               : (
//                 <TableRow>
//                   <TableCell colSpan={11} align="center">
//                     No records available
//                   </TableCell>
//                 </TableRow>
//               )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Box
//         display="flex"
//         justifyContent={isMobile ? "center" : "space-between"}
//         alignItems="center"
//         flexDirection={isMobile ? "column" : "row"}
//         mt={2}
//       >
//         <Typography variant="body2" color="text.secondary">
//           Showing {Math.max(0, page * rowsPerPage + 1)} to{" "}
//           {Math.min(filteredAssets.length, (page + 1) * rowsPerPage)} of{" "}
//           {filteredAssets.length} results
//         </Typography>
//         <TablePagination
//           component="div"
//           count={filteredAssets.length}
//           page={page}
//           onPageChange={(event, newPage) => setPage(newPage)}
//           rowsPerPage={rowsPerPage}
//           onRowsPerPageChange={(event) => {
//             setRowsPerPage(parseInt(event.target.value, 10));
//             setPage(0);
//           }}
//           rowsPerPageOptions={[5, 10, 15, 25]}
//           sx={{
//             "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows, & .MuiTablePagination-actions":
//               {
//                 color: "#8C257C",
//               },
//           }}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default AssetsEmp;







import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
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
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Swal from "sweetalert2";
import dayjs from "dayjs";

const THEME_PURPLE = '#8C257C';
const THEME_PURPLE_HOVER = '#701d63';
// --- FIX: Define the base URL for asset images ---
const ASSETS_IMAGE_BASE_URL = 'https://tdtlworld.com/hrms-backend/assets/';

const AssetsEmp = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const employeeCode = localStorage.getItem("loggedInUser");

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://tdtlworld.com/hrms-backend/employee_assets/${employeeCode}/`
      );

      const mappedAssets = response.data.map((item) => ({
        id: item.id,
        assetName: item.assets_name,
        category: item.category_name || "—",
        brand: item.brand_name || "—",
        assetCode: item.company_asset_code || "—",
        serialNumber: item.serial_number || "—",
        isWorking: item.is_working || "—",
        quantity: item.quantity || 1,
        createdAt: item.created_at,
        purchaseDate: item.purchase_date,
        warrantyEndDate: item.warranty_end_date,
        invoiceNumber: item.invoice_number,
        manufacturer: item.manufacturer,
        // --- FIX: Construct the full image URL if a filename exists ---
        imageUrl: item.asset_image ? `${ASSETS_IMAGE_BASE_URL}${item.asset_image}` : null,
        confirmation: item.employee_confirmation || 'pending',
        returnRequestStatus: item.return_request_status,
        isReturned: item.returned,
      }));
      setAssets(mappedAssets);

      if (selectedAsset) {
        const updatedAsset = mappedAssets.find(a => a.id === selectedAsset.id);
        if (updatedAsset) {
            setSelectedAsset(updatedAsset);
        }
      }

    } catch (error) {
      console.error("Error fetching assets:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Could not fetch assets.",
        timer: 2000,
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (assetId, action) => {
    try {
      await axios.patch(
        `https://tdtlworld.com/hrms-backend/employee_confirm_asset/${assetId}/`,
        { action }
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Asset status updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
      fetchAssets();
    } catch (error) {
      console.error("Failed to update asset status:", error.response ? error.response.data : error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.error || "Could not update asset status.",
        timer: 2000,
        showConfirmButton: false,
      });
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
        text: "Asset return requested successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
      fetchAssets();
    } catch (error) {
      console.error("Failed to return asset:", error.response ? error.response.data : error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.error || "Could not request asset return.",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };
  
  const handleViewDetails = (asset) => {
    setSelectedAsset(asset);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedAsset(null);
  };


  useEffect(() => {
    if (employeeCode) {
      fetchAssets();
    } else {
      setLoading(false);
    }
  }, [employeeCode]);

  const renderConfirmationCell = (asset) => {
    if (!asset) return null;
    if (asset.confirmation === 'accepted') {
      return <Chip label="Accepted" color="success" size="small" />;
    }
    if (asset.confirmation === 'rejected') {
      return <Chip label="Rejected" color="error" size="small" />;
    }
    return (
      <Box display="flex" gap={1}>
        <Button variant="contained" size="small" color="success" onClick={() => handleStatusChange(asset.id, 'received')}>
          Accept
        </Button>
        <Button variant="contained" size="small" color="error" onClick={() => handleStatusChange(asset.id, 'not_received')}>
          Reject
        </Button>
      </Box>
    );
  };

  const renderReturnActionCell = (asset) => {
    if (!asset) return null;
    if (asset.confirmation !== 'accepted') {
      return <Chip label="Confirm asset first" size="small" />;
    }
    if (asset.isReturned === 'Y' || asset.returnRequestStatus === '2') {
      return <Chip label="Returned" size="small" sx={{ backgroundColor: 'green', color: 'white' }} />;
    }
    if (asset.returnRequestStatus === '1') {
      return <Chip label="Request Pending" color="warning" size="small" />;
    }
    if (asset.returnRequestStatus === 'denied') {
        return <Chip label="Return Denied" color="error" size="small" />;
    }
    return (
      <Button
        variant="contained"
        size="small"
        onClick={() => handleReturnAsset(asset.id)}
        sx={{ backgroundColor: THEME_PURPLE, '&:hover': { backgroundColor: THEME_PURPLE_HOVER } }}
      >
        Request Return
      </Button>
    );
  };

  const filteredAssets = assets.filter((asset) =>
    asset.assetName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedAssets = filteredAssets.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box component={Paper} p={3}>
      <Typography variant="h4" sx={{ color: THEME_PURPLE, fontWeight: "bold", mb: 2 }}>
         Assets
      </Typography>

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <TextField
          size="small"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start"><SearchIcon /></InputAdornment>
            ),
          }}
          sx={{ width: isMobile ? "100%" : 300 }}
        />
      </Box>

      <TableContainer>
        <Table size="small">
          <TableHead sx={{ backgroundColor: THEME_PURPLE }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>SR. NO.</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>ASSET PRODUCT NAME</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>CATEGORY</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>ASSIGNED DATE</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>ACTION</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>RETURN ASSET</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>VIEW</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              [...Array(rowsPerPage)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton /></TableCell>
                  <TableCell><Skeleton variant="rectangular" height={24} /></TableCell>
                  <TableCell><Skeleton variant="rectangular" height={24} /></TableCell>
                  <TableCell><Skeleton variant="rectangular" height={24} /></TableCell>
                </TableRow>
              ))
            ) : paginatedAssets.length > 0 ? (
              paginatedAssets.map((asset, index) => (
                <TableRow key={asset.id} hover>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{asset.assetName}</TableCell>
                  <TableCell>{asset.category}</TableCell>
                  <TableCell>{dayjs(asset.createdAt).format('DD/MM/YYYY')}</TableCell>
                  <TableCell>{renderConfirmationCell(asset)}</TableCell>
                  <TableCell>{renderReturnActionCell(asset)}</TableCell>
                  <TableCell>
                     <Button variant="contained" size="small" sx={{ backgroundColor: THEME_PURPLE, '&:hover': { backgroundColor: THEME_PURPLE_HOVER } }} onClick={() => handleViewDetails(asset)}>
                        Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 5 }}>
                  No assets have been assigned to you.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      {filteredAssets.length > 0 && (
         <Box sx={{ p: 0.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
                Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, filteredAssets.length)} of {filteredAssets.length} results
            </Typography>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15, 25]}
                component="div"
                count={filteredAssets.length}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 10));
                    setPage(0);
                }}
            />
        </Box>
      )}

      <Dialog open={detailsOpen} onClose={handleCloseDetails} fullWidth maxWidth="md">
        <DialogTitle sx={{ backgroundColor: THEME_PURPLE, color: 'white' }}>
            Asset Details
        </DialogTitle>
        <DialogContent>
            {selectedAsset && (
                 <Box sx={{ p: 2 }}>
                    <Grid container spacing={2} mt={1}>
                        <Grid item xs={12} sm={6}><Typography><strong>Asset Product Name:</strong> {selectedAsset.assetName}</Typography></Grid>
                        <Grid item xs={12} sm={6}><Typography><strong>Category:</strong> {selectedAsset.category}</Typography></Grid>
                        <Grid item xs={12} sm={6}><Typography><strong>Assigned Date:</strong> {dayjs(selectedAsset.createdAt).format('DD/MM/YYYY')}</Typography></Grid>
                        <Grid item xs={12} sm={6}><Typography><strong>Brand:</strong> {selectedAsset.brand}</Typography></Grid>
                        
                        <Grid item xs={12} sm={6}>
                            <Box display="flex" alignItems="center" gap={1}>
                                <Typography><strong>Action:</strong></Typography>
                                {renderConfirmationCell(selectedAsset)}
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box display="flex" alignItems="center" gap={1}>
                                <Typography><strong>Return Asset:</strong></Typography>
                                {renderReturnActionCell(selectedAsset)}
                            </Box>
                        </Grid>

                        <Grid item xs={12}><Divider sx={{ my: 1 }} /></Grid>

                        <Grid item xs={12} sm={6}><Typography><strong>Asset Code:</strong> {selectedAsset.assetCode}</Typography></Grid>
                        <Grid item xs={12} sm={6}><Typography><strong>Serial No.:</strong> {selectedAsset.serialNumber}</Typography></Grid>
                        <Grid item xs={12} sm={6}><Typography><strong>Quantity:</strong> {selectedAsset.quantity}</Typography></Grid>
                        <Grid item xs={12} sm={6}><Typography><strong>Manufacturer:</strong> {selectedAsset.manufacturer}</Typography></Grid>
                        <Grid item xs={12} sm={6}><Typography><strong>Invoice No.:</strong> {selectedAsset.invoiceNumber}</Typography></Grid>
                        <Grid item xs={12} sm={6}><Typography><strong>Purchase Date:</strong> {selectedAsset.purchaseDate ? dayjs(selectedAsset.purchaseDate).format('DD/MM/YYYY') : 'N/A'}</Typography></Grid>
                        <Grid item xs={12} sm={6}><Typography><strong>Warranty End:</strong> {selectedAsset.warrantyEndDate ? dayjs(selectedAsset.warrantyEndDate).format('DD/MM/YYYY') : 'N/A'}</Typography></Grid>
                        <Grid item xs={12} sm={6}>
                            <Box display="flex" alignItems="center" gap={1}>
                               <Typography><strong>Is Working:</strong></Typography>
                               <Chip label={selectedAsset.isWorking} size="small" sx={{ backgroundColor: selectedAsset.isWorking === 'Yes' ? 'green' : selectedAsset.isWorking === 'No' ? 'red' : 'orange', color: 'white', fontWeight: 'bold' }} />
                            </Box>
                        </Grid>
                        {selectedAsset.imageUrl && (
                            <Grid item xs={12}>
                                <Typography variant="body1"><strong>Asset Image:</strong></Typography>
                                <Box mt={1} sx={{ border: '1px solid #ddd', borderRadius: '4px', p: 1, display: 'inline-block' }}>
                                    <a href={selectedAsset.imageUrl} target="_blank" rel="noopener noreferrer">
                                        <img src={selectedAsset.imageUrl} alt={selectedAsset.assetName} style={{ display: 'block', maxWidth: '100%', maxHeight: '300px' }} />
                                    </a>
                                 </Box>
                            </Grid>
                         )}
                    </Grid>
                 </Box>
            )}
        </DialogContent>
        <DialogActions sx={{ p: '16px 24px' }}>
            <Button onClick={handleCloseDetails} variant="contained" sx={{ backgroundColor: THEME_PURPLE, '&:hover': { backgroundColor: THEME_PURPLE_HOVER } }}>
                Close
            </Button>
        </DialogActions>
    </Dialog>
    </Box>
  );
};

export default AssetsEmp;