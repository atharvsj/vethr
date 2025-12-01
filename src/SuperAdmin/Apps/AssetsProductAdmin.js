// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   IconButton,
//   CircularProgress,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   TextField,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";

// export default function AssetsProductAdmin() {
//   const [tableData, setTableData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [open, setOpen] = useState(false);
//   const [newProductName, setNewProductName] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const API_URL = "https://tdtlworld.com/hrms-backend/apis/create_edit_product/";

//   const fetchData = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(API_URL);
//       setTableData(res.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setNewProductName("");
//   };

//   const handleAddProduct = async () => {
//     if (!newProductName.trim()) {
//       alert("Product name cannot be empty.");
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const payload = {
//         product_name: newProductName,
//       };
//       const response = await axios.post(API_URL, payload);

//       if (response.data.message === "Product added successfully") {
//         alert("Product added successfully!");
//         handleClose();
//         fetchData(); // Refresh the table data
//       } else {
//         alert(`Error: ${response.data.message || "An unknown error occurred."}`);
//       }
//     } catch (error) {
//       console.error("Error adding product:", error);
//       alert("Failed to add product. Please check the console for details.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // --- New API Handler for Deleting a Product ---
//   const handleDeleteProduct = async (productId, productName) => {
//     // Ask for confirmation before deleting
//     if (
//       !window.confirm(`Are you sure you want to delete "${productName}"?`)
//     ) {
//       return; // Stop if the user clicks "Cancel"
//     }

//     try {
//       // Construct the URL with the product_id query parameter
//       const deleteUrl = `${API_URL}?product_id=${productId}`;
//       const response = await axios.delete(deleteUrl);

//       if (response.data.message === "Product deleted successfully") {
//         alert("Product deleted successfully!");
//         // Update the state to remove the deleted item from the table
//         // This is faster than re-fetching all the data
//         setTableData((prevData) =>
//           prevData.filter((item) => item.constants_id !== productId)
//         );
//       } else {
//         alert(`Error: ${response.data.message || "An unknown error occurred."}`);
//       }
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       alert("Failed to delete product. Please check the console for details.");
//     }
//   };

//   return (
//     <Box p={3}>
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={2}
//       >
//         <Typography variant="h5" gutterBottom>
//           Assets Product Admin
//         </Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<AddIcon />}
//           onClick={handleClickOpen}
//           sx={{ backgroundColor: "#6a1b9a", '&:hover': { backgroundColor: '#4a148c' } }}
//         >
//           Add Product
//         </Button>
//       </Box>

//       <TableContainer component={Paper} elevation={4}>
//         {loading ? (
//           <Box display="flex" justifyContent="center" alignItems="center" p={3}>
//             <CircularProgress />
//           </Box>
//         ) : (
//           <Table>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: "#6a1b9a" }}>
//                 <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>
//                   Sr. No.
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>
//                   Category Name
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>
//                   Action
//                 </TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {tableData.length > 0 ? (
//                 tableData.map((row, index) => (
//                   <TableRow key={row.constants_id}>
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell>{row.category_name}</TableCell>
//                     <TableCell>
//                       <IconButton
//                         color="primary"
//                         onClick={() => alert(`Update ${row.category_name}`)}
//                       >
//                         <EditIcon />
//                       </IconButton>
//                       {/* --- Updated Delete Button onClick Handler --- */}
//                       <IconButton
//                         color="error"
//                         onClick={() => handleDeleteProduct(row.constants_id, row.category_name)}
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={3} align="center">
//                     No Data Found
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         )}
//       </TableContainer>

//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Add New Product</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Please enter the name of the new product category you want to add.
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="product_name"
//             label="Product Name"
//             type="text"
//             fullWidth
//             variant="standard"
//             value={newProductName}
//             onChange={(e) => setNewProductName(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleAddProduct} disabled={isSubmitting}>
//             {isSubmitting ? <CircularProgress size={24} /> : "Add"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }









// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   IconButton,
//   CircularProgress,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   TextField,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";

// export default function AssetsProductAdmin() {
//   const [tableData, setTableData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // State for "Add Product" Dialog
//   const [open, setOpen] = useState(false);
//   const [newProductName, setNewProductName] = useState("");

//   // --- New State for "Edit Product" Dialog ---
//   const [editOpen, setEditOpen] = useState(false);
//   const [currentProduct, setCurrentProduct] = useState(null);

//   const API_URL = "https://tdtlworld.com/hrms-backend/apis/create_edit_product/";

//   const fetchData = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(API_URL);
//       setTableData(res.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   // --- Handlers for "Add Product" Dialog ---
//   const handleAddClickOpen = () => {
//     setOpen(true);
//   };

//   const handleAddClose = () => {
//     setOpen(false);
//     setNewProductName("");
//   };

//   const handleAddProduct = async () => {
//     if (!newProductName.trim()) {
//       alert("Product name cannot be empty.");
//       return;
//     }
//     setIsSubmitting(true);
//     try {
//       const response = await axios.post(API_URL, { product_name: newProductName });
//       if (response.data.message === "Product added successfully") {
//         alert("Product added successfully!");
//         handleAddClose();
//         fetchData();
//       } else {
//         alert(`Error: ${response.data.message || "An unknown error occurred."}`);
//       }
//     } catch (error) {
//       console.error("Error adding product:", error);
//       alert("Failed to add product.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // --- Handlers for "Edit Product" Dialog ---
//   const handleEditClickOpen = (product) => {
//     setCurrentProduct(product); // Set the product to be edited
//     setEditOpen(true);
//   };

//   const handleEditClose = () => {
//     setEditOpen(false);
//     setCurrentProduct(null); // Clear the current product
//   };
  
//   const handleUpdateProduct = async () => {
//     if (!currentProduct || !currentProduct.category_name.trim()) {
//       alert("Product name cannot be empty.");
//       return;
//     }
//     setIsSubmitting(true);
//     try {
//       const updateUrl = `${API_URL}?product_id=${currentProduct.constants_id}`;
//       const payload = { product_name: currentProduct.category_name };
//       const response = await axios.put(updateUrl, payload);

//       if (response.data.message === "Product updated successfully") {
//         alert("Product updated successfully!");
//         // Update the table data locally for a faster UI response
//         setTableData(prevData => 
//           prevData.map(item => 
//             item.constants_id === currentProduct.constants_id ? currentProduct : item
//           )
//         );
//         handleEditClose();
//       } else {
//         alert(`Error: ${response.data.message || "An unknown error occurred."}`);
//       }
//     } catch (error) {
//       console.error("Error updating product:", error);
//       alert("Failed to update product.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // --- Handler for Deleting a Product ---
//   const handleDeleteProduct = async (productId, productName) => {
//     if (!window.confirm(`Are you sure you want to delete "${productName}"?`)) {
//       return;
//     }
//     try {
//       const deleteUrl = `${API_URL}?product_id=${productId}`;
//       const response = await axios.delete(deleteUrl);
//       if (response.data.message === "Product deleted successfully") {
//         alert("Product deleted successfully!");
//         setTableData(prevData => prevData.filter(item => item.constants_id !== productId));
//       } else {
//         alert(`Error: ${response.data.message || "An unknown error occurred."}`);
//       }
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       alert("Failed to delete product.");
//     }
//   };

//   return (
//     <Box p={3}>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         <Typography variant="h5" gutterBottom>Assets Product Admin</Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<AddIcon />}
//           onClick={handleAddClickOpen}
//           sx={{ backgroundColor: "#6a1b9a", '&:hover': { backgroundColor: '#4a148c' } }}
//         >
//           Add Product
//         </Button>
//       </Box>

//       <TableContainer component={Paper} elevation={4}>
//         {loading ? (
//           <Box display="flex" justifyContent="center" alignItems="center" p={3}><CircularProgress /></Box>
//         ) : (
//           <Table>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: "#6a1b9a" }}>
//                 <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>Sr. No.</TableCell>
//                 <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>Category Name</TableCell>
//                 <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {tableData.length > 0 ? (
//                 tableData.map((row, index) => (
//                   <TableRow key={row.constants_id}>
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell>{row.category_name}</TableCell>
//                     <TableCell>
//                       <IconButton color="primary" onClick={() => handleEditClickOpen(row)}>
//                         <EditIcon />
//                       </IconButton>
//                       <IconButton color="error" onClick={() => handleDeleteProduct(row.constants_id, row.category_name)}>
//                         <DeleteIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={3} align="center">No Data Found</TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         )}
//       </TableContainer>

//       {/* --- Add Product Dialog --- */}
//       <Dialog open={open} onClose={handleAddClose}>
//         <DialogTitle>Add New Product</DialogTitle>
//         <DialogContent>
//           <DialogContentText>Please enter the name of the new product category.</DialogContentText>
//           <TextField autoFocus margin="dense" label="Product Name" type="text" fullWidth variant="standard" value={newProductName} onChange={(e) => setNewProductName(e.target.value)} />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleAddClose}>Cancel</Button>
//           <Button onClick={handleAddProduct} disabled={isSubmitting}>
//             {isSubmitting ? <CircularProgress size={24} /> : "Add"}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* --- Edit Product Dialog --- */}
//       <Dialog open={editOpen} onClose={handleEditClose}>
//         <DialogTitle>Edit Product</DialogTitle>
//         <DialogContent>
//           <DialogContentText>Update the name for this product category.</DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Product Name"
//             type="text"
//             fullWidth
//             variant="standard"
//             value={currentProduct?.category_name || ""}
//             onChange={(e) => setCurrentProduct({ ...currentProduct, category_name: e.target.value })}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleEditClose}>Cancel</Button>
//           <Button onClick={handleUpdateProduct} disabled={isSubmitting}>
//             {isSubmitting ? <CircularProgress size={24} /> : "Save"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }


















// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import Swal from "sweetalert2"; // SweetAlert2 is already imported
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   IconButton,
//   CircularProgress,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   TextField,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";

// export default function AssetsProductAdmin() {
//   const [tableData, setTableData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // State for "Add Product" Dialog is no longer needed
//   // const [open, setOpen] = useState(false);
//   // const [newProductName, setNewProductName] = useState("");

//   // State for "Edit Product" Dialog (still needed)
//   const [editOpen, setEditOpen] = useState(false);
//   const [currentProduct, setCurrentProduct] = useState(null);

//   const API_URL = "https://tdtlworld.com/hrms-backend/apis/create_edit_product/";

//   const fetchData = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(API_URL);
//       setTableData(res.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Failed to Fetch Data',
//         text: 'Could not load product data from the server.',
//       });
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   // --- New Handler for "Add Product" using SWAL ---
//   const showAddProductSwal = () => {
//     Swal.fire({
//       title: 'Add New Product',
//       text: 'Please enter the name of the new product category.',
//       input: 'text',
//       inputLabel: 'Product Name',
//       inputPlaceholder: 'e.g., Laptop, Keyboard, Monitor',
//       showCancelButton: true,
//       confirmButtonText: 'Add Product',
//       confirmButtonColor: '#6a1b9a',
//       showLoaderOnConfirm: true, // Shows a loader on the confirm button when processing
//       preConfirm: async (productName) => {
//         if (!productName || !productName.trim()) {
//           Swal.showValidationMessage('Product name cannot be empty');
//           return;
//         }
//         try {
//           const response = await axios.post(API_URL, { product_name: productName });
//           if (response.data.message !== "Product added successfully") {
//             // Throw an error if the API indicates failure
//             throw new Error(response.data.message || 'An unknown error occurred.');
//           }
//           return response.data; // On success, pass the response data to the .then() block
//         } catch (error) {
//           // Display the error message inside the SWAL popup
//           Swal.showValidationMessage(`Request failed: ${error.message}`);
//         }
//       },
//       allowOutsideClick: () => !Swal.isLoading() // Prevent closing while loading
//     }).then((result) => {
//       if (result.isConfirmed) {
//         Swal.fire({
//           icon: 'success',
//           title: 'Success!',
//           text: result.value.message, // Use the message from the API response
//           timer: 1500,
//           showConfirmButton: false
//         });
//         fetchData(); // Refetch data to show the new product
//       }
//     });
//   };

//   // --- Handlers for "Edit Product" Dialog ---
//   const handleEditClickOpen = (product) => {
//     setCurrentProduct(product);
//     setEditOpen(true);
//   };

//   const handleEditClose = () => {
//     setEditOpen(false);
//     setCurrentProduct(null);
//   };
  
//   const handleUpdateProduct = async () => {
//     if (!currentProduct || !currentProduct.category_name.trim()) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Validation Error',
//         text: 'Product name cannot be empty.',
//       });
//       return;
//     }
//     setIsSubmitting(true);
//     try {
//       const updateUrl = `${API_URL}?product_id=${currentProduct.constants_id}`;
//       const payload = { product_name: currentProduct.category_name };
//       const response = await axios.put(updateUrl, payload);

//       if (response.data.message === "Product updated successfully") {
//         Swal.fire({
//           icon: 'success',
//           title: 'Updated!',
//           text: 'Product updated successfully!',
//           timer: 1500,
//           showConfirmButton: false,
//         });
//         setTableData(prevData => 
//           prevData.map(item => 
//             item.constants_id === currentProduct.constants_id ? currentProduct : item
//           )
//         );
//         handleEditClose();
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Update Failed',
//           text: response.data.message || "An unknown error occurred.",
//         });
//       }
//     } catch (error) {
//       console.error("Error updating product:", error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Failed to update product. Please try again.',
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // --- Handler for Deleting a Product ---
//   const handleDeleteProduct = (productId, productName) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: `You are about to delete "${productName}". You won't be able to revert this!`,
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const deleteUrl = `${API_URL}?product_id=${productId}`;
//           const response = await axios.delete(deleteUrl);
//           if (response.data.message === "Product deleted successfully") {
//             Swal.fire(
//               'Deleted!',
//               'Your product has been deleted.',
//               'success'
//             );
//             setTableData(prevData => prevData.filter(item => item.constants_id !== productId));
//           } else {
//             Swal.fire({
//               icon: 'error',
//               title: 'Deletion Failed',
//               text: response.data.message || 'An unknown error occurred.',
//             });
//           }
//         } catch (error) {
//           console.error("Error deleting product:", error);
//           Swal.fire({
//             icon: 'error',
//             title: 'Oops...',
//             text: 'Failed to delete product. Please try again.',
//           });
//         }
//       }
//     });
//   };

//   return (
//     <Box p={3}>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         <Typography variant="h5" gutterBottom>Assets Product Admin</Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<AddIcon />}
//           onClick={showAddProductSwal} // Use the new SWAL function here
//           sx={{ backgroundColor: "#6a1b9a", '&:hover': { backgroundColor: '#4a148c' } }}
//         >
//           Add Product
//         </Button>
//       </Box>

//       <TableContainer component={Paper} elevation={4}>
//         {loading ? (
//           <Box display="flex" justifyContent="center" alignItems="center" p={3}><CircularProgress /></Box>
//         ) : (
//           <Table>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: "#6a1b9a" }}>
//                 <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>Sr. No.</TableCell>
//                 <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>Category Name</TableCell>
//                 <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {tableData.length > 0 ? (
//                 tableData.map((row, index) => (
//                   <TableRow key={row.constants_id} hover>
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell>{row.category_name}</TableCell>
//                     <TableCell>
//                       <IconButton color="primary" onClick={() => handleEditClickOpen(row)}>
//                         <EditIcon />
//                       </IconButton>
//                       <IconButton color="error" onClick={() => handleDeleteProduct(row.constants_id, row.category_name)}>
//                         <DeleteIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={3} align="center">No Data Found</TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         )}
//       </TableContainer>

//       {/* --- Add Product Dialog is no longer needed --- */}

//       {/* --- Edit Product Dialog (remains the same) --- */}
//       <Dialog open={editOpen} onClose={handleEditClose} aria-labelledby="edit-product-dialog-title">
//         <DialogTitle id="edit-product-dialog-title">Edit Product</DialogTitle>
//         <DialogContent>
//           <DialogContentText>Update the name for this product category.</DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Product Name"
//             type="text"
//             fullWidth
//             variant="standard"
//             value={currentProduct?.category_name || ""}
//             onChange={(e) => setCurrentProduct({ ...currentProduct, category_name: e.target.value })}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleEditClose}>Cancel</Button>
//           <Button onClick={handleUpdateProduct} disabled={isSubmitting}>
//             {isSubmitting ? <CircularProgress size={24} /> : "Save"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }














// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   IconButton,
//   CircularProgress,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   TextField,
//   useTheme,      // Import useTheme
//   useMediaQuery, // Import useMediaQuery
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";

// export default function AssetsProductAdmin() {
//   const [tableData, setTableData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // State for "Edit Product" Dialog
//   const [editOpen, setEditOpen] = useState(false);
//   const [currentProduct, setCurrentProduct] = useState(null);
  
//   // --- MUI Responsive Hooks ---
//   const theme = useTheme();
//   // isMobile will be true if the screen width is less than the 'sm' breakpoint (typically 600px)
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const API_URL = "https://tdtlworld.com/hrms-backend/apis/create_edit_product/";

//   const fetchData = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(API_URL);
//       setTableData(res.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Failed to Fetch Data',
//         text: 'Could not load product data from the server.',
//       });
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   // --- New Handler for "Add Product" using SWAL ---
//   const showAddProductSwal = () => {
//     Swal.fire({
//       title: 'Add New Product',
//       text: 'Please enter the name of the new product category.',
//       input: 'text',
//       inputLabel: 'Product Name',
//       inputPlaceholder: 'e.g., Laptop, Keyboard, Monitor',
//       showCancelButton: true,
//       confirmButtonText: 'Add Product',
//       confirmButtonColor: '#6a1b9a',
//       showLoaderOnConfirm: true,
//       preConfirm: async (productName) => {
//         if (!productName || !productName.trim()) {
//           Swal.showValidationMessage('Product name cannot be empty');
//           return;
//         }
//         try {
//           const response = await axios.post(API_URL, { product_name: productName });
//           if (response.data.message !== "Product added successfully") {
//             throw new Error(response.data.message || 'An unknown error occurred.');
//           }
//           return response.data;
//         } catch (error) {
//           Swal.showValidationMessage(`Request failed: ${error.message}`);
//         }
//       },
//       allowOutsideClick: () => !Swal.isLoading()
//     }).then((result) => {
//       if (result.isConfirmed) {
//         Swal.fire({
//           icon: 'success',
//           title: 'Success!',
//           text: result.value.message,
//           timer: 1500,
//           showConfirmButton: false
//         });
//         fetchData();
//       }
//     });
//   };

//   // --- Handlers for "Edit Product" Dialog ---
//   const handleEditClickOpen = (product) => {
//     setCurrentProduct(product);
//     setEditOpen(true);
//   };

//   const handleEditClose = () => {
//     setEditOpen(false);
//     setCurrentProduct(null);
//   };
  
//   const handleUpdateProduct = async () => {
//     if (!currentProduct || !currentProduct.category_name.trim()) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Validation Error',
//         text: 'Product name cannot be empty.',
//       });
//       return;
//     }
//     setIsSubmitting(true);
//     try {
//       const updateUrl = `${API_URL}?product_id=${currentProduct.constants_id}`;
//       const payload = { product_name: currentProduct.category_name };
//       const response = await axios.put(updateUrl, payload);

//       if (response.data.message === "Product updated successfully") {
//         Swal.fire({
//           icon: 'success',
//           title: 'Updated!',
//           text: 'Product updated successfully!',
//           timer: 1500,
//           showConfirmButton: false,
//         });
//         // A more efficient way to update state without a full refetch
//         setTableData(prevData => 
//           prevData.map(item => 
//             item.constants_id === currentProduct.constants_id ? { ...item, category_name: currentProduct.category_name } : item
//           )
//         );
//         handleEditClose();
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Update Failed',
//           text: response.data.message || "An unknown error occurred.",
//         });
//       }
//     } catch (error) {
//       console.error("Error updating product:", error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Failed to update product. Please try again.',
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // --- Handler for Deleting a Product ---
//   const handleDeleteProduct = (productId, productName) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: `You are about to delete "${productName}". You won't be able to revert this!`,
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const deleteUrl = `${API_URL}?product_id=${productId}`;
//           const response = await axios.delete(deleteUrl);
//           if (response.data.message === "Product deleted successfully") {
//             Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
//             setTableData(prevData => prevData.filter(item => item.constants_id !== productId));
//           } else {
//             Swal.fire({
//               icon: 'error',
//               title: 'Deletion Failed',
//               text: response.data.message || 'An unknown error occurred.',
//             });
//           }
//         } catch (error) {
//           console.error("Error deleting product:", error);
//           Swal.fire({
//             icon: 'error',
//             title: 'Oops...',
//             text: 'Failed to delete product. Please try again.',
//           });
//         }
//       }
//     });
//   };

//   // --- Reusable Component for Data Display ---
//   const renderDataDisplay = () => {
//     if (loading) {
//       return (
//         <Box display="flex" justifyContent="center" alignItems="center" p={5}>
//           <CircularProgress />
//         </Box>
//       );
//     }

//     if (tableData.length === 0) {
//       return (
//         <Paper elevation={4} sx={{ textAlign: 'center', p: 3 }}>
//           <Typography>No Data Found</Typography>
//         </Paper>
//       );
//     }

//     // --- DESKTOP/TABLET VIEW ---
//     if (!isMobile) {
//       return (
//         <TableContainer component={Paper} elevation={4}>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: "#6a1b9a" }}>
//                 <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>Sr. No.</TableCell>
//                 <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>Category Name</TableCell>
//                 <TableCell sx={{ fontWeight: "bold", color: "#fff", textAlign: 'right', pr: 4 }}>Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {tableData.map((row, index) => (
//                 <TableRow key={row.constants_id} hover>
//                   <TableCell>{index + 1}</TableCell>
//                   <TableCell>{row.category_name}</TableCell>
//                   <TableCell align="right">
//                     <IconButton color="primary" onClick={() => handleEditClickOpen(row)}>
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton color="error" onClick={() => handleDeleteProduct(row.constants_id, row.category_name)}>
//                       <DeleteIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       );
//     }

//     // --- MOBILE VIEW (CARD LIST) ---
//     return (
//       <Box>
//         {tableData.map((row, index) => (
//           <Paper key={row.constants_id} elevation={3} sx={{ p: 2, mb: 2 }}>
//             <Box display="flex" justifyContent="space-between" alignItems="center">
//               <Box>
//                 <Typography variant="body2" color="text.secondary">
//                   {index + 1}. Product
//                 </Typography>
//                 <Typography variant="h6" component="p" gutterBottom>
//                   {row.category_name}
//                 </Typography>
//               </Box>
//               <Box>
//                 <IconButton color="primary" onClick={() => handleEditClickOpen(row)}>
//                   <EditIcon />
//                 </IconButton>
//                 <IconButton color="error" onClick={() => handleDeleteProduct(row.constants_id, row.category_name)}>
//                   <DeleteIcon />
//                 </IconButton>
//               </Box>
//             </Box>
//           </Paper>
//         ))}
//       </Box>
//     );
//   };

//   return (
//     <Box p={{ xs: 1, sm: 2, md: 3 }}> {/* Responsive Padding */}
//       <Box 
//         display="flex" 
//         justifyContent="space-between" 
//         alignItems={{ sm: "center" }} // Center align on non-mobile
//         flexDirection={{ xs: 'column', sm: 'row' }} // Stack on mobile
//         mb={3}
//         gap={2} // Adds space between items when they stack
//       >
//         <Typography variant="h5" gutterBottom sx={{ m: 0, width: '100%' }}>
//           Assets Product Admin
//         </Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<AddIcon />}
//           onClick={showAddProductSwal}
//           sx={{ 
//             backgroundColor: "#6a1b9a", 
//             '&:hover': { backgroundColor: '#4a148c' },
//             width: { xs: '100%', sm: 'auto' } // Full width on mobile
//           }}
//         >
//           Add Product
//         </Button>
//       </Box>

//       {renderDataDisplay()}

//       {/* --- Edit Product Dialog (remains the same, naturally responsive) --- */}
//       <Dialog open={editOpen} onClose={handleEditClose} fullWidth maxWidth="sm">
//         <DialogTitle>Edit Product</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Update the name for this product category.
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Product Name"
//             type="text"
//             fullWidth
//             variant="standard"
//             value={currentProduct?.category_name || ""}
//             onChange={(e) => setCurrentProduct({ ...currentProduct, category_name: e.target.value })}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleEditClose}>Cancel</Button>
//           <Button onClick={handleUpdateProduct} disabled={isSubmitting}>
//             {isSubmitting ? <CircularProgress size={24} /> : "Save"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }







// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   IconButton,
//   CircularProgress,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   TextField,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";

// // Define the color theme constants
// const THEME_PURPLE = '#8C257C';
// const THEME_ORANGE = '#F58E35';
// const THEME_PURPLE_HOVER = '#701d63';

// export default function AssetsProductAdmin() {
//   const [tableData, setTableData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // State for "Edit Product" Dialog
//   const [editOpen, setEditOpen] = useState(false);
//   const [currentProduct, setCurrentProduct] = useState(null);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const API_URL = "https://tdtlworld.com/hrms-backend/apis/create_edit_product/";

//   const fetchData = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(API_URL);
//       setTableData(res.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Failed to Fetch Data',
//         text: 'Could not load product data from the server.',
//       });
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const showAddProductSwal = () => {
//     Swal.fire({
//       title: 'Add New Product',
//       text: 'Please enter the name of the new product category.',
//       input: 'text',
//       inputLabel: 'Product Name',
//       inputPlaceholder: 'e.g., Laptop, Keyboard, Monitor',
//       showCancelButton: true,
//       confirmButtonText: 'Add Product',
//       confirmButtonColor: THEME_PURPLE, // Use theme color
//       showLoaderOnConfirm: true,
//       preConfirm: async (productName) => {
//         if (!productName || !productName.trim()) {
//           Swal.showValidationMessage('Product name cannot be empty');
//           return;
//         }
//         try {
//           const response = await axios.post(API_URL, { product_name: productName });
//           if (response.data.message !== "Product added successfully") {
//             throw new Error(response.data.message || 'An unknown error occurred.');
//           }
//           return response.data;
//         } catch (error) {
//           Swal.showValidationMessage(`Request failed: ${error.message}`);
//         }
//       },
//       allowOutsideClick: () => !Swal.isLoading()
//     }).then((result) => {
//       if (result.isConfirmed) {
//         Swal.fire({
//           icon: 'success',
//           title: 'Success!',
//           text: result.value.message,
//           timer: 1500,
//           showConfirmButton: false
//         });
//         fetchData();
//       }
//     });
//   };

//   const handleEditClickOpen = (product) => {
//     setCurrentProduct(product);
//     setEditOpen(true);
//   };

//   const handleEditClose = () => {
//     setEditOpen(false);
//     setCurrentProduct(null);
//   };

//   const handleUpdateProduct = async () => {
//     if (!currentProduct || !currentProduct.category_name.trim()) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Validation Error',
//         text: 'Product name cannot be empty.',
//       });
//       return;
//     }
//     setIsSubmitting(true);
//     try {
//       const updateUrl = `${API_URL}?product_id=${currentProduct.constants_id}`;
//       const payload = { product_name: currentProduct.category_name };
//       const response = await axios.put(updateUrl, payload);

//       if (response.data.message === "Product updated successfully") {
//         Swal.fire({
//           icon: 'success',
//           title: 'Updated!',
//           text: 'Product updated successfully!',
//           timer: 1500,
//           showConfirmButton: false,
//         });
//         setTableData(prevData =>
//           prevData.map(item =>
//             item.constants_id === currentProduct.constants_id ? { ...item, category_name: currentProduct.category_name } : item
//           )
//         );
//         handleEditClose();
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Update Failed',
//           text: response.data.message || "An unknown error occurred.",
//         });
//       }
//     } catch (error) {
//       console.error("Error updating product:", error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Failed to update product. Please try again.',
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDeleteProduct = (productId, productName) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: `You are about to delete "${productName}". You won't be able to revert this!`,
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const deleteUrl = `${API_URL}?product_id=${productId}`;
//           const response = await axios.delete(deleteUrl);
//           if (response.data.message === "Product deleted successfully") {
//             Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
//             setTableData(prevData => prevData.filter(item => item.constants_id !== productId));
//           } else {
//             Swal.fire({
//               icon: 'error',
//               title: 'Deletion Failed',
//               text: response.data.message || 'An unknown error occurred.',
//             });
//           }
//         } catch (error) {
//           console.error("Error deleting product:", error);
//           Swal.fire({
//             icon: 'error',
//             title: 'Oops...',
//             text: 'Failed to delete product. Please try again.',
//           });
//         }
//       }
//     });
//   };

//   const renderDataDisplay = () => {
//     if (loading) {
//       return (
//         <Box display="flex" justifyContent="center" alignItems="center" p={5}>
//           <CircularProgress />
//         </Box>
//       );
//     }

//     if (tableData.length === 0) {
//       return (
//         <Paper elevation={4} sx={{ textAlign: 'center', p: 3, mt: 2 }}>
//           <Typography>No Products Found</Typography>
//           <Typography variant="body2" color="text.secondary">Click "Add Product" to get started.</Typography>
//         </Paper>
//       );
//     }

//     if (!isMobile) {
//       return (
//         <TableContainer component={Paper} elevation={4}>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: THEME_PURPLE }}>
//                 <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>Sr. No.</TableCell>
//                 <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>Product Name</TableCell>
//                 <TableCell sx={{ fontWeight: "bold", color: "#fff", textAlign: 'center' }}>Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {tableData.map((row, index) => (
//                 <TableRow key={row.constants_id} hover>
//                   <TableCell>{index + 1}</TableCell>
//                   <TableCell>{row.category_name}</TableCell>
//                   <TableCell align="center">
//                     <IconButton sx={{ color: THEME_PURPLE }} onClick={() => handleEditClickOpen(row)}>
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton sx={{ color: '#d32f2f' }} onClick={() => handleDeleteProduct(row.constants_id, row.category_name)}>
//                       <DeleteIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       );
//     }

//     return (
//       <Box>
//         {tableData.map((row, index) => (
//           <Paper key={row.constants_id} elevation={3} sx={{ p: 2, mb: 2 }}>
//             <Box display="flex" justifyContent="space-between" alignItems="center">
//               <Box>
//                 <Typography variant="body2" color="text.secondary">
//                   {index + 1}. Product
//                 </Typography>
//                 <Typography variant="h6" component="p" gutterBottom>
//                   {row.category_name}
//                 </Typography>
//               </Box>
//               <Box>
//                 <IconButton sx={{ color: THEME_PURPLE }} onClick={() => handleEditClickOpen(row)}>
//                   <EditIcon />
//                 </IconButton>
//                 <IconButton sx={{ color: '#d32f2f' }} onClick={() => handleDeleteProduct(row.constants_id, row.category_name)}>
//                   <DeleteIcon />
//                 </IconButton>
//               </Box>
//             </Box>
//           </Paper>
//         ))}
//       </Box>
//     );
//   };

//   return (
//     <Box p={{ xs: 1, sm: 2, md: 3 }}>
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems={{ sm: "center" }}
//         flexDirection={{ xs: 'column', sm: 'row' }}
//         mb={3}
//         gap={2}
//       >
//         <Typography variant="h5" fontWeight="bold" sx={{ m: 0, width: '100%' }}>
//           Assets Product <Typography component="span" variant="h5" fontWeight="bold" sx={{ color: THEME_ORANGE }}>Admin</Typography>
//         </Typography>
//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           onClick={showAddProductSwal}
//           sx={{
//             backgroundColor: THEME_PURPLE,
//             '&:hover': { backgroundColor: THEME_PURPLE_HOVER },
//             width: { xs: '100%', sm: 'auto' },
//             px: 3,
//             py: 1
//           }}
//         >
//           Add Product
//         </Button>
//       </Box>

//       {renderDataDisplay()}

//       <Dialog open={editOpen} onClose={handleEditClose} fullWidth maxWidth="sm">
//         <DialogTitle sx={{ backgroundColor: THEME_PURPLE, color: 'white' }}>
//           Edit Product
//         </DialogTitle>
//         <DialogContent sx={{ pt: '20px !important' }}>
//           <DialogContentText>
//             Update the name for this product category.
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Product Name"
//             type="text"
//             fullWidth
//             variant="outlined"
//             value={currentProduct?.category_name || ""}
//             onChange={(e) => setCurrentProduct({ ...currentProduct, category_name: e.target.value })}
//           />
//         </DialogContent>
//         <DialogActions sx={{ p: '16px 24px' }}>
//           <Button onClick={handleEditClose} variant="outlined">Cancel</Button>
//           <Button
//             onClick={handleUpdateProduct}
//             disabled={isSubmitting}
//             variant="contained"
//             sx={{
//               backgroundColor: THEME_PURPLE,
//               '&:hover': { backgroundColor: THEME_PURPLE_HOVER }
//             }}
//           >
//             {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Save"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }












// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   IconButton,
//   CircularProgress,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   TextField,
//   useTheme,
//   useMediaQuery,
//   InputAdornment,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";
// import SearchIcon from '@mui/icons-material/Search';

// // Define the color theme constants
// const THEME_PURPLE = '#8C257C';
// const THEME_ORANGE = '#F58E35';
// const THEME_PURPLE_HOVER = '#701d63';

// export default function AssetsProductAdmin() {
//   const [tableData, setTableData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   // State for "Edit Product" Dialog
//   const [editOpen, setEditOpen] = useState(false);
//   const [currentProduct, setCurrentProduct] = useState(null);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const API_URL = "https://tdtlworld.com/hrms-backend/apis/create_edit_product/";

//   const fetchData = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(API_URL);
//       setTableData(res.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Failed to Fetch Data',
//         text: 'Could not load product data from the server.',
//       });
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const showAddProductSwal = () => {
//     Swal.fire({
//       title: 'Add New Product',
//       text: 'Please enter the name of the new product category.',
//       input: 'text',
//       inputLabel: 'Product Name',
//       inputPlaceholder: 'e.g., Laptop, Keyboard, Monitor',
//       showCancelButton: true,
//       confirmButtonText: 'Add Product',
//       confirmButtonColor: THEME_PURPLE, // Use theme color
//       showLoaderOnConfirm: true,
//       preConfirm: async (productName) => {
//         if (!productName || !productName.trim()) {
//           Swal.showValidationMessage('Product name cannot be empty');
//           return;
//         }
//         try {
//           const response = await axios.post(API_URL, { product_name: productName });
//           if (response.data.message !== "Product added successfully") {
//             throw new Error(response.data.message || 'An unknown error occurred.');
//           }
//           return response.data;
//         } catch (error) {
//           Swal.showValidationMessage(`Request failed: ${error.message}`);
//         }
//       },
//       allowOutsideClick: () => !Swal.isLoading()
//     }).then((result) => {
//       if (result.isConfirmed) {
//         Swal.fire({
//           icon: 'success',
//           title: 'Success!',
//           text: result.value.message,
//           timer: 1500,
//           showConfirmButton: false
//         });
//         fetchData();
//       }
//     });
//   };

//   const handleEditClickOpen = (product) => {
//     setCurrentProduct(product);
//     setEditOpen(true);
//   };

//   const handleEditClose = () => {
//     setEditOpen(false);
//     setCurrentProduct(null);
//   };

//   const handleUpdateProduct = async () => {
//     if (!currentProduct || !currentProduct.category_name.trim()) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Validation Error',
//         text: 'Product name cannot be empty.',
//       });
//       return;
//     }
//     setIsSubmitting(true);
//     try {
//       const updateUrl = `${API_URL}?product_id=${currentProduct.constants_id}`;
//       const payload = { product_name: currentProduct.category_name };
//       const response = await axios.put(updateUrl, payload);

//       if (response.data.message === "Product updated successfully") {
//         Swal.fire({
//           icon: 'success',
//           title: 'Updated!',
//           text: 'Product updated successfully!',
//           timer: 1500,
//           showConfirmButton: false,
//         });
//         setTableData(prevData =>
//           prevData.map(item =>
//             item.constants_id === currentProduct.constants_id ? { ...item, category_name: currentProduct.category_name } : item
//           )
//         );
//         handleEditClose();
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Update Failed',
//           text: response.data.message || "An unknown error occurred.",
//         });
//       }
//     } catch (error) {
//       console.error("Error updating product:", error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Failed to update product. Please try again.',
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDeleteProduct = (productId, productName) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: `You are about to delete "${productName}". You won't be able to revert this!`,
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const deleteUrl = `${API_URL}?product_id=${productId}`;
//           const response = await axios.delete(deleteUrl);
//           if (response.data.message === "Product deleted successfully") {
//             Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
//             setTableData(prevData => prevData.filter(item => item.constants_id !== productId));
//           } else {
//             Swal.fire({
//               icon: 'error',
//               title: 'Deletion Failed',
//               text: response.data.message || 'An unknown error occurred.',
//             });
//           }
//         } catch (error) {
//           console.error("Error deleting product:", error);
//           Swal.fire({
//             icon: 'error',
//             title: 'Oops...',
//             text: 'Failed to delete product. Please try again.',
//           });
//         }
//       }
//     });
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const filteredData = tableData.filter((product) =>
//     product.category_name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const renderDataDisplay = () => {
//     if (loading) {
//       return (
//         <Box display="flex" justifyContent="center" alignItems="center" p={5}>
//           <CircularProgress />
//         </Box>
//       );
//     }

//     if (filteredData.length === 0) {
//       return (
//         <Paper elevation={4} sx={{ textAlign: 'center', p: 3, mt: 2 }}>
//           <Typography>No Products Found</Typography>
//           <Typography variant="body2" color="text.secondary">
//             {searchTerm ? 'Try adjusting your search.' : 'Click "Add Product" to get started.'}
//           </Typography>
//         </Paper>
//       );
//     }

//     if (!isMobile) {
//       return (
//         <TableContainer component={Paper} elevation={4}>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: THEME_PURPLE }}>
//                 <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>SR. NO.</TableCell>
//                 <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>PRODUCT NAME</TableCell>
//                 <TableCell sx={{ fontWeight: "bold", color: "#fff", textAlign: 'center' }}>ACTION</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredData.map((row, index) => (
//                 <TableRow key={row.constants_id} hover>
//                   <TableCell>{index + 1}</TableCell>
//                   <TableCell>{row.category_name}</TableCell>
//                   <TableCell align="center">
//                     <IconButton sx={{ color: THEME_PURPLE }} onClick={() => handleEditClickOpen(row)}>
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton sx={{ color: '#d32f2f' }} onClick={() => handleDeleteProduct(row.constants_id, row.category_name)}>
//                       <DeleteIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       );
//     }

//     return (
//       <Box>
//         {filteredData.map((row, index) => (
//           <Paper key={row.constants_id} elevation={3} sx={{ p: 2, mb: 2 }}>
//             <Box display="flex" justifyContent="space-between" alignItems="center">
//               <Box>
//                 <Typography variant="body2" color="text.secondary">
//                   {index + 1}. Product
//                 </Typography>
//                 <Typography variant="h6" component="p" gutterBottom>
//                   {row.category_name}
//                 </Typography>
//               </Box>
//               <Box>
//                 <IconButton sx={{ color: THEME_PURPLE }} onClick={() => handleEditClickOpen(row)}>
//                   <EditIcon />
//                 </IconButton>
//                 <IconButton sx={{ color: '#d32f2f' }} onClick={() => handleDeleteProduct(row.constants_id, row.category_name)}>
//                   <DeleteIcon />
//                 </IconButton>
//               </Box>
//             </Box>
//           </Paper>
//         ))}
//       </Box>
//     );
//   };

//   return (
//     <Box p={{ xs: 1, sm: 2, md: 3 }}>
//       <Box mb={3}>
//         <Typography variant="h4" fontWeight="bold" sx={{ color: "#8C257C" }} gutterBottom>
//           Asset <Typography component="span" variant="h4" fontWeight="bold" sx={{ color: "#8C257C" }}>Product Admin</Typography>
//         </Typography>
//       </Box>

//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         flexDirection={{ xs: 'column', sm: 'row' }}
//         mb={3}
//         gap={2}
//       >
//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           onClick={showAddProductSwal}
//           sx={{
//             backgroundColor: THEME_PURPLE,
//             '&:hover': { backgroundColor: THEME_PURPLE_HOVER },
//             width: { xs: '100%', sm: 'auto' },
//             px: 3,
//             py: 1
//           }}
//         >
//           Add Product
//         </Button>
//         <TextField
//                         label="Search"
//                         variant="outlined"
//                         size="small"
//                         value={searchTerm}
//                         onChange={handleSearchChange}
//                         InputProps={{
//                             startAdornment: (
//                             <InputAdornment position="start">
//                                 <SearchIcon />
//                             </InputAdornment>
//                             ),
//                         }}
//                         sx={{ width: '300px' }}
//                     />
//       </Box>

//       {renderDataDisplay()}

//       <Dialog open={editOpen} onClose={handleEditClose} fullWidth maxWidth="sm">
//         <DialogTitle sx={{ backgroundColor: THEME_PURPLE, color: 'white' }}>
//           Edit Product
//         </DialogTitle>
//         <DialogContent sx={{ pt: '20px !important' }}>
//           <DialogContentText>
//             Update the name for this product category.
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="PRODUCT NAME"
//             type="text"
//             fullWidth
//             variant="outlined"
//             value={currentProduct?.category_name || ""}
//             onChange={(e) => setCurrentProduct({ ...currentProduct, category_name: e.target.value })}
//           />
//         </DialogContent>
//         <DialogActions sx={{ p: '16px 24px' }}>
//           <Button onClick={handleEditClose} variant="outlined">Cancel</Button>
//           <Button
//             onClick={handleUpdateProduct}
//             disabled={isSubmitting}
//             variant="contained"
//             sx={{
//               backgroundColor: THEME_PURPLE,
//               '&:hover': { backgroundColor: THEME_PURPLE_HOVER }
//             }}
//           >
//             {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Save"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }





















// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   IconButton,
//   CircularProgress,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   TextField,
//   useTheme,
//   useMediaQuery,
//   InputAdornment,
//   TablePagination,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";
// import SearchIcon from '@mui/icons-material/Search';

// // Define the color theme constants
// const THEME_PURPLE = '#8C257C';
// const THEME_ORANGE = '#F58E35';
// const THEME_PURPLE_HOVER = '#701d63';

// export default function AssetsProductAdmin() {
//   const [tableData, setTableData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   // State for "Edit Product" Dialog
//   const [editOpen, setEditOpen] = useState(false);
//   const [currentProduct, setCurrentProduct] = useState(null);

//   // Pagination state
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const API_URL = "https://tdtlworld.com/hrms-backend/apis/create_edit_product/";

//   const fetchData = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(API_URL);
//       setTableData(res.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Failed to Fetch Data',
//         text: 'Could not load product data from the server.',
//       });
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const showAddProductSwal = () => {
//     Swal.fire({
//       title: 'Add New Product',
//       text: 'Please enter the name of the new product category.',
//       input: 'text',
//       inputLabel: 'Product Name',
//       inputPlaceholder: 'e.g., Laptop, Keyboard, Monitor',
//       showCancelButton: true,
//       confirmButtonText: 'Add Product',
//       confirmButtonColor: THEME_PURPLE,
//       showLoaderOnConfirm: true,
//       preConfirm: async (productName) => {
//         if (!productName || !productName.trim()) {
//           Swal.showValidationMessage('Product name cannot be empty');
//           return;
//         }
//         try {
//           const response = await axios.post(API_URL, { product_name: productName });
//           if (response.data.message !== "Product added successfully") {
//             throw new Error(response.data.message || 'An unknown error occurred.');
//           }
//           return response.data;
//         } catch (error) {
//           Swal.showValidationMessage(`Request failed: ${error.message}`);
//         }
//       },
//       allowOutsideClick: () => !Swal.isLoading()
//     }).then((result) => {
//       if (result.isConfirmed) {
//         Swal.fire({
//           icon: 'success',
//           title: 'Success!',
//           text: result.value.message,
//           timer: 1500,
//           showConfirmButton: false
//         });
//         fetchData();
//       }
//     });
//   };

//   const handleEditClickOpen = (product) => {
//     setCurrentProduct(product);
//     setEditOpen(true);
//   };

//   const handleEditClose = () => {
//     setEditOpen(false);
//     setCurrentProduct(null);
//   };

//   const handleUpdateProduct = async () => {
//     if (!currentProduct || !currentProduct.category_name.trim()) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Validation Error',
//         text: 'Product name cannot be empty.',
//       });
//       return;
//     }
//     setIsSubmitting(true);
//     try {
//       const updateUrl = `${API_URL}?product_id=${currentProduct.constants_id}`;
//       const payload = { product_name: currentProduct.category_name };
//       const response = await axios.put(updateUrl, payload);

//       if (response.data.message === "Product updated successfully") {
//         Swal.fire({
//           icon: 'success',
//           title: 'Updated!',
//           text: 'Product updated successfully!',
//           timer: 1500,
//           showConfirmButton: false,
//         });
//         setTableData(prevData =>
//           prevData.map(item =>
//             item.constants_id === currentProduct.constants_id ? { ...item, category_name: currentProduct.category_name } : item
//           )
//         );
//         handleEditClose();
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Update Failed',
//           text: response.data.message || "An unknown error occurred.",
//         });
//       }
//     } catch (error) {
//       console.error("Error updating product:", error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Failed to update product. Please try again.',
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDeleteProduct = (productId, productName) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: `You are about to delete "${productName}". You won't be able to revert this!`,
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const deleteUrl = `${API_URL}?product_id=${productId}`;
//           const response = await axios.delete(deleteUrl);
//           if (response.data.message === "Product deleted successfully") {
//             Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
//             setTableData(prevData => prevData.filter(item => item.constants_id !== productId));
//           } else {
//             Swal.fire({
//               icon: 'error',
//               title: 'Deletion Failed',
//               text: response.data.message || 'An unknown error occurred.',
//             });
//           }
//         } catch (error) {
//           console.error("Error deleting product:", error);
//           Swal.fire({
//             icon: 'error',
//             title: 'Oops...',
//             text: 'Failed to delete product. Please try again.',
//           });
//         }
//       }
//     });
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0); // Reset to the first page on search
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const filteredData = tableData.filter((product) =>
//     product.category_name.toLowerCase().includes(searchTerm.toLowerCase())
//   );
  
//   const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   const renderDataDisplay = () => {
//     if (loading) {
//       return (
//         <Box display="flex" justifyContent="center" alignItems="center" p={5}>
//           <CircularProgress />
//         </Box>
//       );
//     }

//     if (filteredData.length === 0) {
//       return (
//         <Paper elevation={4} sx={{ textAlign: 'center', p: 3, mt: 2 }}>
//           <Typography>No Products Found</Typography>
//           <Typography variant="body2" color="text.secondary">
//             {searchTerm ? 'Try adjusting your search.' : 'Click "Add Product" to get started.'}
//           </Typography>
//         </Paper>
//       );
//     }

//     if (!isMobile) {
//       return (
//         <TableContainer component={Paper} elevation={4}>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: THEME_PURPLE }}>
//                 <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>SR. NO.</TableCell>
//                 <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>PRODUCT NAME</TableCell>
//                 <TableCell sx={{ fontWeight: "bold", color: "#fff", textAlign: 'center' }}>ACTION</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {paginatedData.map((row, index) => (
//                 <TableRow key={row.constants_id} hover>
//                   <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                   <TableCell>{row.category_name}</TableCell>
//                   <TableCell align="center">
//                     <IconButton sx={{ color: THEME_PURPLE }} onClick={() => handleEditClickOpen(row)}>
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton sx={{ color: '#d32f2f' }} onClick={() => handleDeleteProduct(row.constants_id, row.category_name)}>
//                       <DeleteIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       );
//     }

//     return (
//       <Box>
//         {paginatedData.map((row, index) => (
//           <Paper key={row.constants_id} elevation={3} sx={{ p: 2, mb: 2 }}>
//             <Box display="flex" justifyContent="space-between" alignItems="center">
//               <Box>
//                 <Typography variant="body2" color="text.secondary">
//                   {page * rowsPerPage + index + 1}. Product
//                 </Typography>
//                 <Typography variant="h6" component="p" gutterBottom>
//                   {row.category_name}
//                 </Typography>
//               </Box>
//               <Box>
//                 <IconButton sx={{ color: THEME_PURPLE }} onClick={() => handleEditClickOpen(row)}>
//                   <EditIcon />
//                 </IconButton>
//                 <IconButton sx={{ color: '#d32f2f' }} onClick={() => handleDeleteProduct(row.constants_id, row.category_name)}>
//                   <DeleteIcon />
//                 </IconButton>
//               </Box>
//             </Box>
//           </Paper>
//         ))}
//       </Box>
//     );
//   };

//   return (
//     <Box p={{ xs: 1, sm: 2, md: 3 }}>
//       <Box mb={3}>
//         <Typography variant="h4" fontWeight="bold" sx={{ color: THEME_PURPLE, mb: 5 }} gutterBottom>
//           Asset <Typography component="span" variant="h4" fontWeight="bold" sx={{ color: THEME_PURPLE }}>Product </Typography>
//         </Typography>
//       </Box>

//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         flexDirection={{ xs: 'column', sm: 'row' }}
//         mb={3}
//         gap={2}
//       >
//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           onClick={showAddProductSwal}
//           sx={{
//             backgroundColor: THEME_PURPLE,
//             '&:hover': { backgroundColor: THEME_PURPLE_HOVER },
//             width: { xs: '100%', sm: 'auto' },
//             px: 3,
//             py: 1
//           }}
//         >
//           Add Product
//         </Button>
//         <TextField
//             label="Search"
//             variant="outlined"
//             size="small"
//             value={searchTerm}
//             onChange={handleSearchChange}
//             InputProps={{
//                 startAdornment: (
//                 <InputAdornment position="start">
//                     <SearchIcon />
//                 </InputAdornment>
//                 ),
//             }}
//             sx={{ width: { xs: '100%', sm: '300px' } }}
//         />
//       </Box>

//       {renderDataDisplay()}

//       {filteredData.length > 0 && (
//         <Box
//           component={Paper}
//           elevation={4}
//           sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             flexDirection: { xs: 'column', sm: 'row' },
           
//           }}
//         >
//           <Typography variant="body2" color="text.secondary" sx={{ mb: { xs: 2, sm: 0 } }}>
//             Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, filteredData.length)} of {filteredData.length} results
//           </Typography>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 15, 25]}
//             component="div"
//             count={filteredData.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//             sx={{
//               '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
//                 color: THEME_PURPLE,
//               },
//               '& .MuiSelect-select, & .MuiTablePagination-selectIcon': {
//                 color: THEME_PURPLE,
//               },
//               '& .MuiButtonBase-root': {
//                 color: THEME_PURPLE,
//               },
//               '& .Mui-disabled': {
//                 color: 'rgba(140, 37, 124, 0.5)',
//               }
//             }}
//           />
//         </Box>
//       )}

//       <Dialog open={editOpen} onClose={handleEditClose} fullWidth maxWidth="sm">
//         <DialogTitle sx={{ backgroundColor: THEME_PURPLE, color: 'white' }}>
//           Edit Product
//         </DialogTitle>
//         <DialogContent sx={{ pt: '20px !important' }}>
//           <DialogContentText>
//             Update the name for this product category.
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="PRODUCT NAME"
//             type="text"
//             fullWidth
//             variant="outlined"
//             value={currentProduct?.category_name || ""}
//             onChange={(e) => setCurrentProduct({ ...currentProduct, category_name: e.target.value })}
//           />
//         </DialogContent>
//         <DialogActions sx={{ p: '16px 24px' }}>
//           <Button onClick={handleEditClose} variant="outlined">Cancel</Button>
//           <Button
//             onClick={handleUpdateProduct}
//             disabled={isSubmitting}
//             variant="contained"
//             sx={{
//               backgroundColor: THEME_PURPLE,
//               '&:hover': { backgroundColor: THEME_PURPLE_HOVER }
//             }}
//           >
//             {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Save"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }







// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   CircularProgress,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   TextField,
//   useTheme,
//   useMediaQuery,
//   InputAdornment,
//   TablePagination,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import SearchIcon from '@mui/icons-material/Search';

// // Define the color theme constants
// const THEME_PURPLE = '#8C257C';
// const THEME_ORANGE = '#F58E35';
// const THEME_PURPLE_HOVER = '#701d63';

// // Helper function to format the date, ensuring only the date part is shown
// const formatDate = (dateString) => {
//   if (!dateString) return 'N/A';
//   try {
//     // Create a new Date object from the date string
//     const date = new Date(dateString);
//     // Check if the created date is valid
//     if (isNaN(date.getTime())) {
//       return "N/A"; // Return Not Available for invalid dates
//     }
//     // Get day, month, and year, and pad with a leading zero if necessary
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
//     const year = date.getFullYear();
//     // Return the formatted date string
//     return `${day}-${month}-${year}`;
//   } catch (error) {
//     console.error("Could not format date:", dateString, error);
//     return "N/A";
//   }
// };

// export default function AssetsProductAdmin() {
//   const [tableData, setTableData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   // State for "Edit Product" Dialog
//   const [editOpen, setEditOpen] = useState(false);
//   const [currentProduct, setCurrentProduct] = useState(null);

//   // Pagination state
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const API_URL = "https://tdtlworld.com/hrms-backend/apis/create_edit_product/";

//   const fetchData = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(API_URL);
//       setTableData(res.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Failed to Fetch Data',
//         text: 'Could not load product data from the server.',
//       });
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const showAddProductSwal = () => {
//     Swal.fire({
//       title: 'Add New Product',
//       text: 'Please enter the name of the new product category.',
//       input: 'text',
//       inputLabel: 'Product Name',
//       inputPlaceholder: 'e.g., Laptop, Keyboard, Monitor',
//       showCancelButton: true,
//       confirmButtonText: 'Add Product',
//       confirmButtonColor: THEME_PURPLE,
//       showLoaderOnConfirm: true,
//       preConfirm: async (productName) => {
//         if (!productName || !productName.trim()) {
//           Swal.showValidationMessage('Product name cannot be empty');
//           return;
//         }
//         try {
//           const response = await axios.post(API_URL, { product_name: productName });
//           if (response.data.message !== "Product added successfully") {
//             throw new Error(response.data.message || 'An unknown error occurred.');
//           }
//           return response.data;
//         } catch (error) {
//           Swal.showValidationMessage(`Request failed: ${error.message}`);
//         }
//       },
//       allowOutsideClick: () => !Swal.isLoading()
//     }).then((result) => {
//       if (result.isConfirmed) {
//         Swal.fire({
//           icon: 'success',
//           title: 'Success!',
//           text: result.value.message,
//           timer: 1500,
//           showConfirmButton: false
//         });
//         fetchData();
//       }
//     });
//   };

//   const handleEditClose = () => {
//     setEditOpen(false);
//     setCurrentProduct(null);
//   };

//   const handleUpdateProduct = async () => {
//     if (!currentProduct || !currentProduct.category_name.trim()) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Validation Error',
//         text: 'Product name cannot be empty.',
//       });
//       return;
//     }
//     setIsSubmitting(true);
//     try {
//       const updateUrl = `${API_URL}?product_id=${currentProduct.constants_id}`;
//       const payload = { product_name: currentProduct.category_name };
//       const response = await axios.put(updateUrl, payload);

//       if (response.data.message === "Product updated successfully") {
//         Swal.fire({
//           icon: 'success',
//           title: 'Updated!',
//           text: 'Product updated successfully!',
//           timer: 1500,
//           showConfirmButton: false,
//         });
//         setTableData(prevData =>
//           prevData.map(item =>
//             item.constants_id === currentProduct.constants_id ? { ...item, category_name: currentProduct.category_name } : item
//           )
//         );
//         handleEditClose();
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Update Failed',
//           text: response.data.message || "An unknown error occurred.",
//         });
//       }
//     } catch (error) {
//       console.error("Error updating product:", error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Failed to update product. Please try again.',
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0); // Reset to the first page on search
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const filteredData = tableData.filter((product) =>
//     product.category_name.toLowerCase().includes(searchTerm.toLowerCase())
//   );
  
//   const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   const renderDataDisplay = () => {
//     if (loading) {
//       return (
//         <Box display="flex" justifyContent="center" alignItems="center" p={5}>
//           <CircularProgress />
//         </Box>
//       );
//     }

//     if (filteredData.length === 0) {
//       return (
//         <Paper elevation={4} sx={{ textAlign: 'center', p: 3, mt: 2 }}>
//           <Typography>No Products Found</Typography>
//           <Typography variant="body2" color="text.secondary">
//             {searchTerm ? 'Try adjusting your search.' : 'Click "Add Product" to get started.'}
//           </Typography>
//         </Paper>
//       );
//     }

//     if (!isMobile) {
//       return (
//         <TableContainer component={Paper} elevation={4}>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: THEME_PURPLE }}>
//                 <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>SR. NO.</TableCell>
//                 <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>ASSET PRODUCT NAME</TableCell>
//                 <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>CREATED DATE</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {paginatedData.map((row, index) => (
//                 <TableRow key={row.constants_id} hover>
//                   <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                   <TableCell>{row.category_name}</TableCell>
//                   <TableCell>{formatDate(row.created_at)}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       );
//     }

//     return (
//       <Box>
//         {paginatedData.map((row, index) => (
//           <Paper key={row.constants_id} elevation={3} sx={{ p: 2, mb: 2 }}>
//             <Box display="flex" justifyContent="space-between" alignItems="center">
//               <Box>
//                 <Typography variant="body2" color="text.secondary">
//                   {page * rowsPerPage + index + 1}. Product
//                 </Typography>
//                 <Typography variant="h6" component="p" gutterBottom>
//                   {row.category_name}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                     Created: {formatDate(row.created_at)}
//                 </Typography>
//               </Box>
//             </Box>
//           </Paper>
//         ))}
//       </Box>
//     );
//   };

//   return (
//     <Box p={{ xs: 1, sm: 2, md: 3 }}>
//       <Box mb={3}>
//         <Typography variant="h4" fontWeight="bold" sx={{ color: THEME_PURPLE, mb: 5 }} gutterBottom>
//           Asset <Typography component="span" variant="h4" fontWeight="bold" sx={{ color: THEME_PURPLE }}>Product </Typography>
//         </Typography>
//       </Box>

//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         flexDirection={{ xs: 'column', sm: 'row' }}
//         mb={3}
//         gap={2}
//       >
//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           onClick={showAddProductSwal}
//           sx={{
//             backgroundColor: THEME_PURPLE,
//             '&:hover': { backgroundColor: THEME_PURPLE_HOVER },
//             width: { xs: '100%', sm: 'auto' },
//             px: 3,
//             py: 1
//           }}
//         >
//           Add Product
//         </Button>
//         <TextField
//             label="Search"
//             variant="outlined"
//             size="small"
//             value={searchTerm}
//             onChange={handleSearchChange}
//             InputProps={{
//                 startAdornment: (
//                 <InputAdornment position="start">
//                     <SearchIcon />
//                 </InputAdornment>
//                 ),
//             }}
//             sx={{ width: { xs: '100%', sm: '300px' } }}
//         />
//       </Box>

//       {renderDataDisplay()}

//       {filteredData.length > 0 && (
//         <Box
//           component={Paper}
//           elevation={4}
//           sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             flexDirection: { xs: 'column', sm: 'row' },
           
//           }}
//         >
//           <Typography variant="body2" color="text.secondary" sx={{ mb: { xs: 2, sm: 0 }, p: 1.5, }}>
//             Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, filteredData.length)} of {filteredData.length} results
//           </Typography>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 15, 25]}
//             component="div"
//             count={filteredData.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
            
//           />
//         </Box>
//       )}

//       <Dialog open={editOpen} onClose={handleEditClose} fullWidth maxWidth="sm">
//         <DialogTitle sx={{ backgroundColor: THEME_PURPLE, color: 'white' }}>
//           Edit Product
//         </DialogTitle>
//         <DialogContent sx={{ pt: '20px !important' }}>
//           <DialogContentText>
//             Update the name for this product category.
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="ASSET PRODUCT NAME"
//             type="text"
//             fullWidth
//             variant="outlined"
//             value={currentProduct?.category_name || ""}
//             onChange={(e) => setCurrentProduct({ ...currentProduct, category_name: e.target.value })}
//           />
//         </DialogContent>
//         <DialogActions sx={{ p: '16px 24px' }}>
//           <Button onClick={handleEditClose} variant="outlined">Cancel</Button>
//           <Button
//             onClick={handleUpdateProduct}
//             disabled={isSubmitting}
//             variant="contained"
//             sx={{
//               backgroundColor: THEME_PURPLE,
//               '&:hover': { backgroundColor: THEME_PURPLE_HOVER }
//             }}
//           >
//             {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Save"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }





// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   CircularProgress,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   TextField,
//   useTheme,
//   useMediaQuery,
//   InputAdornment,
//   FormControl,
//   Select,
//   MenuItem,
//   Pagination,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import SearchIcon from '@mui/icons-material/Search';

// // Define the color theme constants
// const THEME_PURPLE = '#8C257C';
// const THEME_ORANGE = '#F58E35';
// const THEME_PURPLE_HOVER = '#6d1d60';
// const TEXT_ON_PRIMARY = '#FFFFFF';

// // Helper function to format the date, ensuring only the date part is shown
// const formatDate = (dateString) => {
//   if (!dateString) return 'N/A';
//   try {
//     // Create a new Date object from the date string
//     const date = new Date(dateString);
//     // Check if the created date is valid
//     if (isNaN(date.getTime())) {
//       return "N/A"; // Return Not Available for invalid dates
//     }
//     // Get day, month, and year, and pad with a leading zero if necessary
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
//     const year = date.getFullYear();
//     // Return the formatted date string
//     return `${day}-${month}-${year}`;
//   } catch (error) {
//     console.error("Could not format date:", dateString, error);
//     return "N/A";
//   }
// };

// export default function AssetsProductAdmin() {
//   const [tableData, setTableData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   // State for "Edit Product" Dialog
//   const [editOpen, setEditOpen] = useState(false);
//   const [currentProduct, setCurrentProduct] = useState(null);

//   // Pagination state
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const API_URL = "https://tdtlworld.com/hrms-backend/apis/create_edit_product/";

//   const fetchData = useCallback(async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(API_URL);
//       setTableData(res.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Failed to Fetch Data',
//         text: 'Could not load product data from the server.',
//       });
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const showAddProductSwal = () => {
//     Swal.fire({
//       title: 'Add New Product',
//       text: 'Please enter the name of the new product category.',
//       input: 'text',
//       inputLabel: 'Product Name',
//       inputPlaceholder: 'e.g., Laptop, Keyboard, Monitor',
//       showCancelButton: true,
//       confirmButtonText: 'Add Product',
//       confirmButtonColor: THEME_PURPLE,
//       showLoaderOnConfirm: true,
//       preConfirm: async (productName) => {
//         if (!productName || !productName.trim()) {
//           Swal.showValidationMessage('Product name cannot be empty');
//           return;
//         }
//         try {
//           const response = await axios.post(API_URL, { product_name: productName });
//           if (response.data.message !== "Product added successfully") {
//             throw new Error(response.data.message || 'An unknown error occurred.');
//           }
//           return response.data;
//         } catch (error) {
//           Swal.showValidationMessage(`Request failed: ${error.message}`);
//         }
//       },
//       allowOutsideClick: () => !Swal.isLoading()
//     }).then((result) => {
//       if (result.isConfirmed) {
//         Swal.fire({
//           icon: 'success',
//           title: 'Success!',
//           text: result.value.message,
//           timer: 1500,
//           showConfirmButton: false
//         });
//         fetchData();
//       }
//     });
//   };

//   const handleEditClose = () => {
//     setEditOpen(false);
//     setCurrentProduct(null);
//   };

//   const handleUpdateProduct = async () => {
//     if (!currentProduct || !currentProduct.category_name.trim()) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Validation Error',
//         text: 'Product name cannot be empty.',
//       });
//       return;
//     }
//     setIsSubmitting(true);
//     try {
//       const updateUrl = `${API_URL}?product_id=${currentProduct.constants_id}`;
//       const payload = { product_name: currentProduct.category_name };
//       const response = await axios.put(updateUrl, payload);

//       if (response.data.message === "Product updated successfully") {
//         Swal.fire({
//           icon: 'success',
//           title: 'Updated!',
//           text: 'Product updated successfully!',
//           timer: 1500,
//           showConfirmButton: false,
//         });
//         setTableData(prevData =>
//           prevData.map(item =>
//             item.constants_id === currentProduct.constants_id ? { ...item, category_name: currentProduct.category_name } : item
//           )
//         );
//         handleEditClose();
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Update Failed',
//           text: response.data.message || "An unknown error occurred.",
//         });
//       }
//     } catch (error) {
//       console.error("Error updating product:", error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Failed to update product. Please try again.',
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0); // Reset to the first page on search
//   };

//   const handlePaginationChange = (event, newPage) => {
//     setPage(newPage - 1);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const filteredData = tableData.filter((product) =>
//     product.category_name.toLowerCase().includes(searchTerm.toLowerCase())
//   );
  
//   const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  
//   const startEntry = filteredData.length > 0 ? page * rowsPerPage + 1 : 0;
//   const endEntry = Math.min((page + 1) * rowsPerPage, filteredData.length);

//   const renderDataDisplay = () => {
//     if (loading) {
//       return (
//         <Box display="flex" justifyContent="center" alignItems="center" p={5}>
//           <CircularProgress />
//         </Box>
//       );
//     }

//     if (filteredData.length === 0) {
//       return (
//         <Paper elevation={4} sx={{ textAlign: 'center', p: 3, mt: 2 }}>
//           <Typography>No Products Found</Typography>
//           <Typography variant="body2" color="text.secondary">
//             {searchTerm ? 'Try adjusting your search.' : 'Click "Add Product" to get started.'}
//           </Typography>
//         </Paper>
//       );
//     }

//     if (!isMobile) {
//       return (
//         <TableContainer component={Paper} elevation={4}>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: THEME_PURPLE }}>
//                 <TableCell sx={{ fontWeight: "bold", color: TEXT_ON_PRIMARY }}>SR. NO.</TableCell>
//                 <TableCell sx={{ fontWeight: "bold", color: TEXT_ON_PRIMARY }}>ASSET PRODUCT NAME</TableCell>
//                 <TableCell sx={{ fontWeight: "bold", color: TEXT_ON_PRIMARY }}>CREATED DATE</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {paginatedData.map((row, index) => (
//                 <TableRow key={row.constants_id} hover>
//                   <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                   <TableCell>{row.category_name}</TableCell>
//                   <TableCell>{formatDate(row.created_at)}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       );
//     }

//     return (
//       <Box>
//         {paginatedData.map((row, index) => (
//           <Paper key={row.constants_id} elevation={3} sx={{ p: 2, mb: 2 }}>
//             <Box display="flex" justifyContent="space-between" alignItems="center">
//               <Box>
//                 <Typography variant="body2" color="text.secondary">
//                   {page * rowsPerPage + index + 1}. Product
//                 </Typography>
//                 <Typography variant="h6" component="p" gutterBottom>
//                   {row.category_name}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                     Created: {formatDate(row.created_at)}
//                 </Typography>
//               </Box>
//             </Box>
//           </Paper>
//         ))}
//       </Box>
//     );
//   };

//   return (
//     <Box p={{ xs: 1, sm: 2, md: 3 }}>
//       <Box mb={3}>
//         <Typography variant="h4" fontWeight="bold" sx={{ color: THEME_PURPLE, mb: 5 }} gutterBottom>
//           Asset <Typography component="span" variant="h4" fontWeight="bold" sx={{ color: THEME_PURPLE }}>Product </Typography>
//         </Typography>
//       </Box>

//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         flexDirection={{ xs: 'column', sm: 'row' }}
//         mb={3}
//         gap={2}
//       >
//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           onClick={showAddProductSwal}
//           sx={{
//             backgroundColor: THEME_PURPLE,
//             '&:hover': { backgroundColor: THEME_PURPLE_HOVER },
//             width: { xs: '100%', sm: 'auto' },
//             px: 3,
//             py: 1
//           }}
//         >
//           Add Product
//         </Button>
//         <TextField
//             label="Search"
//             variant="outlined"
//             size="small"
//             value={searchTerm}
//             onChange={handleSearchChange}
//             InputProps={{
//                 startAdornment: (
//                 <InputAdornment position="start">
//                     <SearchIcon />
//                 </InputAdornment>
//                 ),
//             }}
//             sx={{ width: { xs: '100%', sm: '300px' } }}
//         />
//       </Box>

//       {renderDataDisplay()}

//       <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)', mt: 2 }}>
//           {filteredData.length > 0 && (
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                       <FormControl variant="outlined" size="small">
//                           <Select
//                               value={rowsPerPage}
//                               onChange={handleChangeRowsPerPage}
//                               sx={{
//                                   backgroundColor: THEME_PURPLE,
//                                   color: 'white',
//                                   borderRadius: '4px',
//                                   '&:hover': { backgroundColor: THEME_PURPLE_HOVER },
//                                   '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
//                                   '& .MuiSvgIcon-root': { color: 'white' },
//                               }}
//                           >
//                               {[5, 10, 15, 25].map((value) => ( <MenuItem key={value} value={value}>{value}</MenuItem> ))}
//                           </Select>
//                       </FormControl>
//                       <Typography variant="body2" color="text.secondary">
//                         {`Showing ${startEntry} to ${endEntry} of ${filteredData.length} results`}
//                       </Typography>
//                   </Box>
//                   <Pagination
//                       count={Math.ceil(filteredData.length / rowsPerPage)}
//                       page={page + 1}
//                       onChange={handlePaginationChange}
//                       showFirstButton showLastButton
//                       sx={{
//                           '& .MuiPaginationItem-root:hover': { backgroundColor: THEME_ORANGE, color: 'white' },
//                           '& .MuiPaginationItem-page': {
//                               color: THEME_PURPLE,
//                               '&.Mui-selected': {
//                                   backgroundColor: THEME_PURPLE,
//                                   color: 'white',
//                                   '&:hover': { backgroundColor: THEME_ORANGE }
//                               },
//                           },
//                           '& .MuiPaginationItem-icon': { color: THEME_PURPLE }
//                       }}
//                   />
//               </Box>
//           )}
//       </Box>

//       <Dialog open={editOpen} onClose={handleEditClose} fullWidth maxWidth="sm">
//         <DialogTitle sx={{ backgroundColor: THEME_PURPLE, color: 'white' }}>
//           Edit Product
//         </DialogTitle>
//         <DialogContent sx={{ pt: '20px !important' }}>
//           <DialogContentText>
//             Update the name for this product category.
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="ASSET PRODUCT NAME"
//             type="text"
//             fullWidth
//             variant="outlined"
//             value={currentProduct?.category_name || ""}
//             onChange={(e) => setCurrentProduct({ ...currentProduct, category_name: e.target.value })}
//           />
//         </DialogContent>
//         <DialogActions sx={{ p: '16px 24px' }}>
//           <Button onClick={handleEditClose} variant="outlined">Cancel</Button>
//           <Button
//             onClick={handleUpdateProduct}
//             disabled={isSubmitting}
//             variant="contained"
//             sx={{
//               backgroundColor: THEME_PURPLE,
//               '&:hover': { backgroundColor: THEME_PURPLE_HOVER }
//             }}
//           >
//             {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Save"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }












import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  useTheme,
  useMediaQuery,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  Pagination,
  Grid,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const THEME_PURPLE = '#8C257C';
const THEME_ORANGE = '#F58E35';
const THEME_PURPLE_HOVER = '#6d1d60';
const TEXT_ON_PRIMARY = '#FFFFFF';

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "N/A";
    }
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  } catch (error) {
    console.error("Could not format date:", dateString, error);
    return "N/A";
  }
};

export default function AssetsProductAdmin() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [productName, setProductName] = useState('');
  const [submitError, setSubmitError] = useState(null);

  const [editOpen, setEditOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const API_URL = "https://tdtlworld.com/hrms-backend/apis/create_edit_product/";

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setTableData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to Fetch Data',
        text: 'Could not load product data from the server.',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddProduct = async () => {
    if (!productName.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Input Required',
        text: 'Product name cannot be empty.',
      });
      return;
    }
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const payload = { product_name: productName.trim() };
      const response = await axios.post(API_URL, payload);

      if (response.data.message !== "Product added successfully") {
        throw new Error(response.data.message || 'An unknown error occurred.');
      }
      setProductName('');
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Product added successfully.',
        timer: 2000,
        showConfirmButton: false,
      });
      fetchData();
    } catch (e) {
      const errorMessage = e.response?.data?.message || e.message || 'Failed to add product.';
      setSubmitError(errorMessage);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Error adding product: ${errorMessage}`,
      });
      console.error("Failed to add product:", e);
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleEditClose = () => {
    setEditOpen(false);
    setCurrentProduct(null);
  };

  const handleUpdateProduct = async () => {
    if (!currentProduct || !currentProduct.category_name.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Product name cannot be empty.',
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const updateUrl = `${API_URL}?product_id=${currentProduct.constants_id}`;
      const payload = { product_name: currentProduct.category_name };
      const response = await axios.put(updateUrl, payload);

      if (response.data.message === "Product updated successfully") {
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Product updated successfully!',
          timer: 1500,
          showConfirmButton: false,
        });
        setTableData(prevData =>
          prevData.map(item =>
            item.constants_id === currentProduct.constants_id ? { ...item, category_name: currentProduct.category_name } : item
          )
        );
        handleEditClose();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: response.data.message || "An unknown error occurred.",
        });
      }
    } catch (error) {
      console.error("Error updating product:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to update product. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handlePaginationChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = tableData.filter((product) =>
    product.category_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
 
  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
 
  const startEntry = filteredData.length > 0 ? page * rowsPerPage + 1 : 0;
  const endEntry = Math.min((page + 1) * rowsPerPage, filteredData.length);

  const renderDataDisplay = () => {
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" p={5}>
          <CircularProgress />
        </Box>
      );
    }

    if (filteredData.length === 0) {
      return (
        <Paper elevation={4} sx={{ textAlign: 'center', p: 3, mt: 2 }}>
          <Typography>No Products Found</Typography>
          <Typography variant="body2" color="text.secondary">
            {searchTerm ? 'Try adjusting your search.' : 'Add a new product to get started.'}
          </Typography>
        </Paper>
      );
    }

    if (!isMobile) {
      return (
        <TableContainer component={Paper} elevation={4}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: THEME_PURPLE }}>
                <TableCell sx={{ fontWeight: "bold", color: TEXT_ON_PRIMARY }}>SR. NO.</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: TEXT_ON_PRIMARY }}> PRODUCT</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: TEXT_ON_PRIMARY }}>CREATED DATE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((row, index) => (
                <TableRow key={row.constants_id} hover>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{row.category_name}</TableCell>
                  <TableCell>{formatDate(row.created_at)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }

    return (
      <Box>
        {paginatedData.map((row, index) => (
          <Paper key={row.constants_id} elevation={3} sx={{ p: 2, mb: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {page * rowsPerPage + index + 1}. Product
                </Typography>
                <Typography variant="h6" component="p" gutterBottom>
                  {row.category_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Created: {formatDate(row.created_at)}
                </Typography>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>
    );
  };

  return (
    <Box p={{ xs: 1, sm: 2, md: 3 }}>
       

        <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Typography variant="h5" fontWeight="bold" sx={{ color: THEME_PURPLE }} gutterBottom>
                        Add New <Typography component="span" variant="h5" fontWeight="bold" sx={{ color: THEME_PURPLE }}>Product</Typography>
                    </Typography>
                    <br />
                    <TextField
                        label="Asset Product"
                        placeholder="Asset Product"
                        fullWidth
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                        sx={{ mb: 2 }}
                        disabled={isSubmitting}
                    />
                    {submitError && (
                        <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                            Error: {submitError}
                        </Typography>
                    )}
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: THEME_PURPLE,
                            color: 'white',
                            '&:hover': { backgroundColor: THEME_PURPLE_HOVER }
                        }}
                        fullWidth
                        onClick={handleAddProduct}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Save'}
                    </Button>
                </Paper>
            </Grid>
           
            <Grid item xs={12} md={8}>
                <Paper sx={{ p: 3, backgroundColor: '#ffffff', boxShadow: 3, height: '100%' }}>
                    <Typography variant="h5" fontWeight="bold" sx={{ color: THEME_PURPLE }} gutterBottom>
                        List All <Typography component="span" variant="h5" fontWeight="bold" sx={{ color: THEME_PURPLE }}>Products</Typography>
                    </Typography>
                    <Box mb={2} display="flex" justifyContent="flex-end" alignItems="center">
                        <TextField
                            label="Search"
                            variant="outlined"
                            size="small"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                                ),
                            }}
                            sx={{ width: { xs: '100%', sm: '300px' } }}
                        />
                    </Box>

                    {renderDataDisplay()}

                    <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)', mt: 2 }}>
                        {filteredData.length > 0 && (
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <FormControl variant="outlined" size="small">
                                        <Select
                                            value={rowsPerPage}
                                            onChange={handleChangeRowsPerPage}
                                            sx={{
                                                backgroundColor: THEME_PURPLE,
                                                color: 'white',
                                                borderRadius: '4px',
                                                '&:hover': { backgroundColor: THEME_PURPLE_HOVER },
                                                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                                '& .MuiSvgIcon-root': { color: 'white' },
                                            }}
                                        >
                                            {[5, 10, 15, 25].map((value) => ( <MenuItem key={value} value={value}>{value}</MenuItem> ))}
                                        </Select>
                                    </FormControl>
                                    <Typography variant="body2" color="text.secondary">
                                        {`Showing ${startEntry} to ${endEntry} of ${filteredData.length} results`}
                                    </Typography>
                                </Box>
                                <Pagination
                                    count={Math.ceil(filteredData.length / rowsPerPage)}
                                    page={page + 1}
                                    onChange={handlePaginationChange}
                                    showFirstButton showLastButton
                                    sx={{
                                        '& .MuiPaginationItem-root:hover': { backgroundColor: THEME_ORANGE, color: 'white' },
                                        '& .MuiPaginationItem-page': {
                                            color: THEME_PURPLE,
                                            '&.Mui-selected': {
                                                backgroundColor: THEME_PURPLE,
                                                color: 'white',
                                                '&:hover': { backgroundColor: THEME_ORANGE }
                                            },
                                        },
                                        '& .MuiPaginationItem-icon': { color: THEME_PURPLE }
                                    }}
                                />
                            </Box>
                        )}
                    </Box>
                </Paper>
            </Grid>
        </Grid>

        <Dialog open={editOpen} onClose={handleEditClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ backgroundColor: THEME_PURPLE, color: 'white' }}>
            Edit Product
            </DialogTitle>
            <DialogContent sx={{ pt: '20px !important' }}>
            <DialogContentText>
                Update the name for this product category.
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                label="ASSET PRODUCT NAME"
                type="text"
                fullWidth
                variant="outlined"
                value={currentProduct?.category_name || ""}
                onChange={(e) => setCurrentProduct({ ...currentProduct, category_name: e.target.value })}
            />
            </DialogContent>
            <DialogActions sx={{ p: '16px 24px' }}>
            <Button onClick={handleEditClose} variant="outlined">Cancel</Button>
            <Button
                onClick={handleUpdateProduct}
                disabled={isSubmitting}
                variant="contained"
                sx={{
                backgroundColor: THEME_PURPLE,
                '&:hover': { backgroundColor: THEME_PURPLE_HOVER }
                }}
            >
                {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Save"}
            </Button>
            </DialogActions>
        </Dialog>
    </Box>
  );
}