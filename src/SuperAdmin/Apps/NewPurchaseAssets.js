// // import React, { useState, useEffect } from "react";
// // import {
// //   Box,
// //   Grid,
// //   TextField,
// //   Button,
// //   MenuItem,
// //   Typography,
// //   AppBar,
// //   Toolbar,
// //   Card,
// //   CardContent,
// // } from "@mui/material";
// // import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// // import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// // import { format } from "date-fns";
// // import axios from "axios";

// // const NewPurchaseAssets = () => {
// //   const [formData, setFormData] = useState({
// //     brand_id: "",
// //     category_id: "",
// //     quantity: "",
// //     price: "",
// //     invoice_number: "",
// //     purchase_date: null,
// //     warranty_end_date: null,
// //   });

// //   const [brands, setBrands] = useState([]); // Store API response
// //   const [loadingBrands, setLoadingBrands] = useState(false);

// //   // Example static categories (can also be fetched via API if available)
// //   const categories = [
// //     { id: 224, name: "Electronics" },
// //     { id: 225, name: "Furniture" },
// //     { id: 226, name: "Office Supplies" },
// //   ];

// //   // Fetch Brand data from API
// //   useEffect(() => {
// //     const fetchBrands = async () => {
// //       try {
// //         setLoadingBrands(true);
// //         const res = await axios.get(
// //           "https://tdtlworld.com/hrms-backend/api/assets-brand/"
// //         );
// //         setBrands(res.data); // Response is already [{value, label, created_at}, ...]
// //       } catch (error) {
// //         console.error("Error fetching brands:", error);
// //       } finally {
// //         setLoadingBrands(false);
// //       }
// //     };

// //     fetchBrands();
// //   }, []);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleDateChange = (name, date) => {
// //     setFormData((prev) => ({ ...prev, [name]: date }));
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     const dataToSend = {
// //       ...formData,
// //       purchase_date: formData.purchase_date
// //         ? format(formData.purchase_date, "yyyy-MM-dd")
// //         : null,
// //       warranty_end_date: formData.warranty_end_date
// //         ? format(formData.warranty_end_date, "yyyy-MM-dd")
// //         : null,
// //     };
// //     console.log("Form Data:", dataToSend);
// //     // Call your POST API here
// //     alert("Form submitted! Check console for data.");
// //   };

// //   return (
// //     <LocalizationProvider dateAdapter={AdapterDateFns}>
// //       <Box sx={{ flexGrow: 1 }}>
// //         <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
// //           <Toolbar>
// //             <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
// //               New Asset Purchase
// //             </Typography>
// //           </Toolbar>
// //         </AppBar>

// //         <Box sx={{ p: 4, width: "100%", margin: "auto" }}>
// //           <Card raised sx={{ p: 3, borderRadius: 2 }}>
// //             <CardContent>
// //               <Typography variant="h5" gutterBottom align="center" mb={3}>
// //                 Asset Details Form
// //               </Typography>
// //               <form onSubmit={handleSubmit}>
// //                 <Grid container spacing={3}>
// //                   {/* Brand Dropdown from API */}
// //                   <Grid item xs={12} sm={6}>
// //                     <TextField
// //                       select
// //                       fullWidth
// //                       label="Brand"
// //                       name="brand_id"
// //                       value={formData.brand_id}
// //                       onChange={handleChange}
// //                       variant="outlined"
// //                       helperText="Select the brand of the asset"
// //                       disabled={loadingBrands}
// //                     >
// //                       {brands.map((brand) => (
// //                         <MenuItem key={brand.value} value={brand.value}>
// //                           {brand.label}
// //                         </MenuItem>
// //                       ))}
// //                     </TextField>
// //                   </Grid>

// //                   {/* Category Dropdown */}
// //                   <Grid item xs={12} sm={6}>
// //                     <TextField
// //                       select
// //                       fullWidth
// //                       label="Category"
// //                       name="category_id"
// //                       value={formData.category_id}
// //                       onChange={handleChange}
// //                       variant="outlined"
// //                       helperText="Select the asset category"
// //                     >
// //                       {categories.map((cat) => (
// //                         <MenuItem key={cat.id} value={cat.id}>
// //                           {cat.name}
// //                         </MenuItem>
// //                       ))}
// //                     </TextField>
// //                   </Grid>

// //                   {/* Quantity */}
// //                   <Grid item xs={12} sm={6}>
// //                     <TextField
// //                       fullWidth
// //                       type="number"
// //                       label="Quantity"
// //                       name="quantity"
// //                       value={formData.quantity}
// //                       onChange={handleChange}
// //                       variant="outlined"
// //                       inputProps={{ min: 1 }}
// //                       helperText="Number of units purchased"
// //                     />
// //                   </Grid>

// //                   {/* Price */}
// //                   <Grid item xs={12} sm={6}>
// //                     <TextField
// //                       fullWidth
// //                       type="number"
// //                       label="Price per unit"
// //                       name="price"
// //                       value={formData.price}
// //                       onChange={handleChange}
// //                       variant="outlined"
// //                       inputProps={{ step: "0.01", min: 0 }}
// //                       helperText="Cost of each asset"
// //                     />
// //                   </Grid>

// //                   {/* Invoice Number */}
// //                   <Grid item xs={12} sm={6}>
// //                     <TextField
// //                       fullWidth
// //                       label="Invoice Number"
// //                       name="invoice_number"
// //                       value={formData.invoice_number}
// //                       onChange={handleChange}
// //                       variant="outlined"
// //                       helperText="Unique invoice identifier"
// //                     />
// //                   </Grid>

// //                   {/* Purchase Date */}
// //                   <Grid item xs={12} sm={6}>
// //                     <DatePicker
// //                       label="Purchase Date"
// //                       value={formData.purchase_date}
// //                       onChange={(date) =>
// //                         handleDateChange("purchase_date", date)
// //                       }
// //                       renderInput={(params) => (
// //                         <TextField
// //                           {...params}
// //                           fullWidth
// //                           variant="outlined"
// //                           helperText="Date when the asset was purchased"
// //                         />
// //                       )}
// //                     />
// //                   </Grid>

// //                   {/* Warranty End Date */}
// //                   <Grid item xs={12} sm={6}>
// //                     <DatePicker
// //                       label="Warranty End Date"
// //                       value={formData.warranty_end_date}
// //                       onChange={(date) =>
// //                         handleDateChange("warranty_end_date", date)
// //                       }
// //                       renderInput={(params) => (
// //                         <TextField
// //                           {...params}
// //                           fullWidth
// //                           variant="outlined"
// //                           helperText="When the warranty expires"
// //                         />
// //                       )}
// //                     />
// //                   </Grid>

// //                   {/* Save Button */}
// //                   <Grid item xs={12} sx={{ mt: 2 }}>
// //                     <Button
// //                       type="submit"
// //                       variant="contained"
// //                       color="primary"
// //                       size="large"
// //                       sx={{ py: 1.5 }}
// //                     >
// //                       Save Asset Purchase
// //                     </Button>
// //                   </Grid>
// //                 </Grid>
// //               </form>
// //             </CardContent>
// //           </Card>
// //         </Box>
// //       </Box>
// //     </LocalizationProvider>
// //   );
// // };

// // export default NewPurchaseAssets;







// // import React, { useState, useEffect } from "react";
// // import {
// //   Box,
// //   Grid,
// //   TextField,
// //   Button,
// //   MenuItem,
// //   Typography,
// //   AppBar,
// //   Toolbar,
// //   Card,
// //   CardContent,
// // } from "@mui/material";
// // import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// // import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// // import { format } from "date-fns";
// // import axios from "axios";

// // const NewPurchaseAssets = () => {
// //   const [formData, setFormData] = useState({
// //     brand_id: "",
// //     category_id: "",
// //     quantity: "",
// //     price: "",
// //     invoice_number: "",
// //     purchase_date: null,
// //     warranty_end_date: null,
// //   });

// //   const [brands, setBrands] = useState([]);
// //   const [categories, setCategories] = useState([]);
// //   const [loadingBrands, setLoadingBrands] = useState(false);
// //   const [loadingCategories, setLoadingCategories] = useState(false);

// //   // Fetch Brand data
// //   useEffect(() => {
// //     const fetchBrands = async () => {
// //       try {
// //         setLoadingBrands(true);
// //         const res = await axios.get(
// //           "https://tdtlworld.com/hrms-backend/api/assets-brand/"
// //         );
// //         setBrands(res.data);
// //       } catch (error) {
// //         console.error("Error fetching brands:", error);
// //       } finally {
// //         setLoadingBrands(false);
// //       }
// //     };
// //     fetchBrands();
// //   }, []);

// //   // Fetch Category data
// //   useEffect(() => {
// //     const fetchCategories = async () => {
// //       try {
// //         setLoadingCategories(true);
// //         const res = await axios.get(
// //           "https://tdtlworld.com/hrms-backend/api/assets-category/"
// //         );
// //         setCategories(res.data);
// //       } catch (error) {
// //         console.error("Error fetching categories:", error);
// //       } finally {
// //         setLoadingCategories(false);
// //       }
// //     };
// //     fetchCategories();
// //   }, []);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleDateChange = (name, date) => {
// //     setFormData((prev) => ({ ...prev, [name]: date }));
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     const dataToSend = {
// //       ...formData,
// //       purchase_date: formData.purchase_date
// //         ? format(formData.purchase_date, "yyyy-MM-dd")
// //         : null,
// //       warranty_end_date: formData.warranty_end_date
// //         ? format(formData.warranty_end_date, "yyyy-MM-dd")
// //         : null,
// //     };
// //     console.log("Form Data:", dataToSend);
// //     // Call your POST API here with dataToSend
// //     alert("Form submitted! Check console for data.");
// //   };

// //   return (
// //     <LocalizationProvider dateAdapter={AdapterDateFns}>
// //       <Box sx={{ flexGrow: 1 }}>
// //         <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
// //           <Toolbar>
// //             <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
// //               New Asset Purchase
// //             </Typography>
// //           </Toolbar>
// //         </AppBar>

// //         <Box sx={{ p: 4, width: "100%", margin: "auto" }}>
// //           <Card raised sx={{ p: 3, borderRadius: 2 }}>
// //             <CardContent>
// //               <Typography variant="h5" gutterBottom align="center" mb={3}>
// //                 Asset Details Form
// //               </Typography>
// //               <form onSubmit={handleSubmit}>
// //                 <Grid container spacing={3}>
// //                   {/* Brand Dropdown */}
// //                   <Grid item xs={12} sm={6}>
// //                     <TextField
// //                       select
// //                       fullWidth
// //                       label="Brand"
// //                       name="brand_id"
// //                       value={formData.brand_id}
// //                       onChange={handleChange}
// //                       variant="outlined"
// //                       helperText="Select the brand of the asset"
// //                       disabled={loadingBrands}
// //                     >
// //                       {brands.map((brand) => (
// //                         <MenuItem key={brand.value} value={brand.value}>
// //                           {brand.label}
// //                         </MenuItem>
// //                       ))}
// //                     </TextField>
// //                   </Grid>

// //                   {/* Category Dropdown */}
// //                   <Grid item xs={12} sm={6}>
// //                     <TextField
// //                       select
// //                       fullWidth
// //                       label="Category"
// //                       name="category_id"
// //                       value={formData.category_id}
// //                       onChange={handleChange}
// //                       variant="outlined"
// //                       helperText="Select the asset category"
// //                       disabled={loadingCategories}
// //                     >
// //                       {categories.map((cat) => (
// //                         <MenuItem key={cat.value} value={cat.value}>
// //                           {cat.label}
// //                         </MenuItem>
// //                       ))}
// //                     </TextField>
// //                   </Grid>

// //                   {/* Quantity */}
// //                   <Grid item xs={12} sm={6}>
// //                     <TextField
// //                       fullWidth
// //                       type="number"
// //                       label="Quantity"
// //                       name="quantity"
// //                       value={formData.quantity}
// //                       onChange={handleChange}
// //                       variant="outlined"
// //                       inputProps={{ min: 1 }}
// //                       helperText="Number of units purchased"
// //                     />
// //                   </Grid>

// //                   {/* Price */}
// //                   <Grid item xs={12} sm={6}>
// //                     <TextField
// //                       fullWidth
// //                       type="number"
// //                       label="Price per unit"
// //                       name="price"
// //                       value={formData.price}
// //                       onChange={handleChange}
// //                       variant="outlined"
// //                       inputProps={{ step: "0.01", min: 0 }}
// //                       helperText="Cost of each asset"
// //                     />
// //                   </Grid>

// //                   {/* Invoice Number */}
// //                   <Grid item xs={12} sm={6}>
// //                     <TextField
// //                       fullWidth
// //                       label="Invoice Number"
// //                       name="invoice_number"
// //                       value={formData.invoice_number}
// //                       onChange={handleChange}
// //                       variant="outlined"
// //                       helperText="Unique invoice identifier"
// //                     />
// //                   </Grid>

// //                   {/* Purchase Date */}
// //                   <Grid item xs={12} sm={6}>
// //                     <DatePicker
// //                       label="Purchase Date"
// //                       value={formData.purchase_date}
// //                       onChange={(date) =>
// //                         handleDateChange("purchase_date", date)
// //                       }
// //                       renderInput={(params) => (
// //                         <TextField
// //                           {...params}
// //                           fullWidth
// //                           variant="outlined"
// //                           helperText="Date when the asset was purchased"
// //                         />
// //                       )}
// //                     />
// //                   </Grid>

// //                   {/* Warranty End Date */}
// //                   <Grid item xs={12} sm={6}>
// //                     <DatePicker
// //                       label="Warranty End Date"
// //                       value={formData.warranty_end_date}
// //                       onChange={(date) =>
// //                         handleDateChange("warranty_end_date", date)
// //                       }
// //                       renderInput={(params) => (
// //                         <TextField
// //                           {...params}
// //                           fullWidth
// //                           variant="outlined"
// //                           helperText="When the warranty expires"
// //                         />
// //                       )}
// //                     />
// //                   </Grid>

// //                   {/* Save Button */}
// //                   <Grid item xs={12} sx={{ mt: 2 }}>
// //                     <Button
// //                       type="submit"
// //                       variant="contained"
// //                       color="primary"
// //                       size="large"
// //                       sx={{ py: 1.5 }}
// //                     >
// //                       Save Asset Purchase
// //                     </Button>
// //                   </Grid>
// //                 </Grid>
// //               </form>
// //             </CardContent>
// //           </Card>
// //         </Box>
// //       </Box>
// //     </LocalizationProvider>
// //   );
// // };

// // export default NewPurchaseAssets;














// // import React, { useState, useEffect } from "react";
// // import {
// //   Box,
// //   Grid,
// //   TextField,
// //   Button,
// //   MenuItem,
// //   Typography,
// //   AppBar,
// //   Toolbar,
// //   Card,
// //   CardContent,
// // } from "@mui/material";
// // import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// // import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// // import { format } from "date-fns";
// // import axios from "axios";
// // import Swal from "sweetalert2"; // Import SweetAlert2

// // const NewPurchaseAssets = () => {
// //   const [formData, setFormData] = useState({
// //     brand_id: "",
// //     category_id: "",
// //     quantity: "",
// //     price: "",
// //     invoice_number: "",
// //     purchase_date: null,
// //     warranty_end_date: null,
// //   });

// //   const [brands, setBrands] = useState([]);
// //   const [categories, setCategories] = useState([]);
// //   const [loadingBrands, setLoadingBrands] = useState(false);
// //   const [loadingCategories, setLoadingCategories] = useState(false);
// //   const [submitting, setSubmitting] = useState(false); // State for submission loading

// //   // Fetch Brand data
// //   useEffect(() => {
// //     const fetchBrands = async () => {
// //       try {
// //         setLoadingBrands(true);
// //         const res = await axios.get(
// //           "https://tdtlworld.com/hrms-backend/api/assets-brand/"
// //         );
// //         setBrands(res.data);
// //       } catch (error) {
// //         console.error("Error fetching brands:", error);
// //         Swal.fire({
// //           icon: "error",
// //           title: "Error",
// //           text: "Failed to load brands. Please try again.",
// //         });
// //       } finally {
// //         setLoadingBrands(false);
// //       }
// //     };
// //     fetchBrands();
// //   }, []);

// //   // Fetch Category data
// //   useEffect(() => {
// //     const fetchCategories = async () => {
// //       try {
// //         setLoadingCategories(true);
// //         const res = await axios.get(
// //           "https://tdtlworld.com/hrms-backend/api/assets-category/"
// //         );
// //         setCategories(res.data);
// //       } catch (error) {
// //         console.error("Error fetching categories:", error);
// //         Swal.fire({
// //           icon: "error",
// //           title: "Error",
// //           text: "Failed to load categories. Please try again.",
// //         });
// //       } finally {
// //         setLoadingCategories(false);
// //       }
// //     };
// //     fetchCategories();
// //   }, []);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleDateChange = (name, date) => {
// //     setFormData((prev) => ({ ...prev, [name]: date }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setSubmitting(true);

// //     const dataToSend = {
// //       brand_id: Number(formData.brand_id),
// //       category_id: Number(formData.category_id),
// //       quantity: Number(formData.quantity),
// //       price: Number(formData.price),
// //       invoice_number: formData.invoice_number,
// //       purchase_date: formData.purchase_date
// //         ? format(formData.purchase_date, "yyyy-MM-dd")
// //         : null,
// //       warranty_end_date: formData.warranty_end_date
// //         ? format(formData.warranty_end_date, "yyyy-MM-dd")
// //         : null,
// //     };

// //     console.log("Payload to API:", dataToSend);

// //     try {
// //       const response = await axios.post(
// //         "https://tdtlworld.com/hrms-backend/apis/add_new_asset_to_stock/",
// //         dataToSend,
// //         {
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //         }
// //       );

// //       if (response.status === 201 || response.status === 200) {
// //         Swal.fire({
// //           icon: "success",
// //           title: "Success!",
// //           text: response.data.message || "Asset purchase recorded successfully!",
// //           confirmButtonText: "Ok",
// //         }).then(() => {
// //           // Reset form after success
// //           setFormData({
// //             brand_id: "",
// //             category_id: "",
// //             quantity: "",
// //             price: "",
// //             invoice_number: "",
// //             purchase_date: null,
// //             warranty_end_date: null,
// //           });
// //         });
// //       } else {
// //         Swal.fire({
// //           icon: "info",
// //           title: "Info",
// //           text: response.data.message || "Something went wrong, please check.",
// //         });
// //       }
// //     } catch (error) {
// //       console.error("Error submitting form:", error);
// //       let errorMessage = "There was an error saving the asset. Please try again.";
// //       if (error.response && error.response.data && error.response.data.message) {
// //         errorMessage = error.response.data.message;
// //       } else if (error.message) {
// //         errorMessage = error.message;
// //       }

// //       Swal.fire({
// //         icon: "error",
// //         title: "Submission Failed",
// //         text: errorMessage,
// //       });
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   return (
// //     <LocalizationProvider dateAdapter={AdapterDateFns}>
// //       <Box sx={{ flexGrow: 1 }}>
// //         <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
// //           <Toolbar>
// //             <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
// //               New Asset Purchase
// //             </Typography>
// //           </Toolbar>
// //         </AppBar>

// //         <Box sx={{ p: 4, width: "100%", margin: "auto" }}>
// //           <Card raised sx={{ p: 3, borderRadius: 2 }}>
// //             <CardContent>
// //               <Typography variant="h5" gutterBottom align="center" mb={3}>
// //                 Asset Details Form
// //               </Typography>
// //               <form onSubmit={handleSubmit}>
// //                 <Grid container spacing={3}>
// //                   {/* Brand Dropdown */}
// //                   <Grid item xs={12} sm={6}>
// //                     <TextField
// //                       select
// //                       fullWidth
// //                       label="Brand"
// //                       name="brand_id"
// //                       value={formData.brand_id}
// //                       onChange={handleChange}
// //                       variant="outlined"
// //                       helperText="Select the brand of the asset"
// //                       disabled={loadingBrands || submitting}
// //                     >
// //                       {loadingBrands ? (
// //                         <MenuItem disabled>Loading Brands...</MenuItem>
// //                       ) : (
// //                         brands.map((brand) => (
// //                           <MenuItem key={brand.value} value={brand.value}>
// //                             {brand.label}
// //                           </MenuItem>
// //                         ))
// //                       )}
// //                     </TextField>
// //                   </Grid>

// //                   {/* Category Dropdown */}
// //                   <Grid item xs={12} sm={6}>
// //                     <TextField
// //                       select
// //                       fullWidth
// //                       label="Category"
// //                       name="category_id"
// //                       value={formData.category_id}
// //                       onChange={handleChange}
// //                       variant="outlined"
// //                       helperText="Select the asset category"
// //                       disabled={loadingCategories || submitting}
// //                     >
// //                       {loadingCategories ? (
// //                         <MenuItem disabled>Loading Categories...</MenuItem>
// //                       ) : (
// //                         categories.map((cat) => (
// //                           <MenuItem key={cat.value} value={cat.value}>
// //                             {cat.label}
// //                           </MenuItem>
// //                         ))
// //                       )}
// //                     </TextField>
// //                   </Grid>

// //                   {/* Quantity */}
// //                   <Grid item xs={12} sm={6}>
// //                     <TextField
// //                       fullWidth
// //                       type="number"
// //                       label="Quantity"
// //                       name="quantity"
// //                       value={formData.quantity}
// //                       onChange={handleChange}
// //                       variant="outlined"
// //                       inputProps={{ min: 1 }}
// //                       helperText="Number of units purchased"
// //                       disabled={submitting}
// //                     />
// //                   </Grid>

// //                   {/* Price */}
// //                   <Grid item xs={12} sm={6}>
// //                     <TextField
// //                       fullWidth
// //                       type="number"
// //                       label="Price per unit"
// //                       name="price"
// //                       value={formData.price}
// //                       onChange={handleChange}
// //                       variant="outlined"
// //                       inputProps={{ step: "0.01", min: 0 }}
// //                       helperText="Cost of each asset"
// //                       disabled={submitting}
// //                     />
// //                   </Grid>

// //                   {/* Invoice Number */}
// //                   <Grid item xs={12} sm={6}>
// //                     <TextField
// //                       fullWidth
// //                       label="Invoice Number"
// //                       name="invoice_number"
// //                       value={formData.invoice_number}
// //                       onChange={handleChange}
// //                       variant="outlined"
// //                       helperText="Unique invoice identifier"
// //                       disabled={submitting}
// //                     />
// //                   </Grid>

// //                   {/* Purchase Date */}
// //                   <Grid item xs={12} sm={6}>
// //                     <DatePicker
// //                       label="Purchase Date"
// //                       value={formData.purchase_date}
// //                       onChange={(date) =>
// //                         handleDateChange("purchase_date", date)
// //                       }
// //                       renderInput={(params) => (
// //                         <TextField
// //                           {...params}
// //                           fullWidth
// //                           variant="outlined"
// //                           helperText="Date when the asset was purchased"
// //                           disabled={submitting}
// //                         />
// //                       )}
// //                       disabled={submitting}
// //                     />
// //                   </Grid>

// //                   {/* Warranty End Date */}
// //                   <Grid item xs={12} sm={6}>
// //                     <DatePicker
// //                       label="Warranty End Date"
// //                       value={formData.warranty_end_date}
// //                       onChange={(date) =>
// //                         handleDateChange("warranty_end_date", date)
// //                       }
// //                       renderInput={(params) => (
// //                         <TextField
// //                           {...params}
// //                           fullWidth
// //                           variant="outlined"
// //                           helperText="When the warranty expires"
// //                           disabled={submitting}
// //                         />
// //                       )}
// //                       disabled={submitting}
// //                     />
// //                   </Grid>

// //                   {/* Save Button */}
// //                   <Grid item xs={12} sx={{ mt: 2 }}>
// //                     <Button
// //                       type="submit"
// //                       variant="contained"
// //                       color="primary"
// //                       size="large"
// //                       sx={{ py: 1.5 }}
// //                       disabled={submitting}
// //                     >
// //                       {submitting ? "Saving..." : "Save Asset Purchase"}
// //                     </Button>
// //                   </Grid>
// //                 </Grid>
// //               </form>
// //             </CardContent>
// //           </Card>
// //         </Box>
// //       </Box>
// //     </LocalizationProvider>
// //   );
// // };

// // export default NewPurchaseAssets;














// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Grid,
//   TextField,
//   Button,
//   MenuItem,
//   Typography,
//   AppBar,
//   Toolbar,
//   Card,
//   CardContent,
// } from "@mui/material";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { format } from "date-fns";
// import axios from "axios";
// import Swal from "sweetalert2";

// const NewPurchaseAssets = () => {
//   const [formData, setFormData] = useState({
//     brand_id: "",
//     category_id: "",
//     quantity: "",
//     price: "",
//     invoice_number: "",
//     purchase_date: null,
//     warranty_end_date: null,
//   });

//   const [brands, setBrands] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loadingBrands, setLoadingBrands] = useState(false);
//   const [loadingCategories, setLoadingCategories] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     const fetchBrands = async () => {
//       try {
//         setLoadingBrands(true);
//         const res = await axios.get(
//           "https://tdtlworld.com/hrms-backend/api/assets-brand/"
//         );
//         setBrands(res.data);
//       } catch (error) {
//         console.error("Error fetching brands:", error);
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: "Failed to load brands. Please try again.",
//         });
//       } finally {
//         setLoadingBrands(false);
//       }
//     };
//     fetchBrands();
//   }, []);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         setLoadingCategories(true);
//         const res = await axios.get(
//           "https://tdtlworld.com/hrms-backend/api/assets-category/"
//         );
//         setCategories(res.data);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: "Failed to load categories. Please try again.",
//         });
//       } finally {
//         setLoadingCategories(false);
//       }
//     };
//     fetchCategories();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleDateChange = (name, date) => {
//     const newFormData = { ...formData, [name]: date };

//     if (name === "purchase_date") {
//       if (newFormData.warranty_end_date && date && date >= newFormData.warranty_end_date) {
//         newFormData.warranty_end_date = null;
//       }
//     }
//     setFormData(newFormData);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);

//     const dataToSend = {
//       brand_id: Number(formData.brand_id),
//       category_id: Number(formData.category_id),
//       quantity: Number(formData.quantity),
//       price: Number(formData.price),
//       invoice_number: formData.invoice_number,
//       purchase_date: formData.purchase_date
//         ? format(formData.purchase_date, "yyyy-MM-dd")
//         : null,
//       warranty_end_date: formData.warranty_end_date
//         ? format(formData.warranty_end_date, "yyyy-MM-dd")
//         : null,
//     };

//     console.log("Payload to API:", dataToSend);

//     try {
//       const response = await axios.post(
//         "https://tdtlworld.com/hrms-backend/apis/add_new_asset_to_stock/",
//         dataToSend,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.status === 201 || response.status === 200) {
//         Swal.fire({
//           icon: "success",
//           title: "Success!",
//           text: response.data.message || "Asset purchase recorded successfully!",
//           confirmButtonText: "Ok",
//         }).then(() => {
//           setFormData({
//             brand_id: "",
//             category_id: "",
//             quantity: "",
//             price: "",
//             invoice_number: "",
//             purchase_date: null,
//             warranty_end_date: null,
//           });
//         });
//       } else {
//         Swal.fire({
//           icon: "info",
//           title: "Info",
//           text: response.data.message || "Something went wrong, please check.",
//         });
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       let errorMessage = "There was an error saving the asset. Please try again.";
//       if (error.response && error.response.data && error.response.data.message) {
//         errorMessage = error.response.data.message;
//       } else if (error.message) {
//         errorMessage = error.message;
//       }

//       Swal.fire({
//         icon: "error",
//         title: "Submission Failed",
//         text: errorMessage,
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const getMinWarrantyDate = () => {
//     if (!formData.purchase_date) return null;
//     const nextDay = new Date(formData.purchase_date);
//     nextDay.setDate(nextDay.getDate() + 1);
//     return nextDay;
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Box sx={{ flexGrow: 1 }}>
//         <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
//           <Toolbar>
//             <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//               New Asset Purchase
//             </Typography>
//           </Toolbar>
//         </AppBar>

//         <Box sx={{ p: 4, width: "100%", margin: "auto" }}>
//           <Card raised sx={{ p: 3, borderRadius: 2 }}>
//             <CardContent>
//               <Typography variant="h5" gutterBottom align="center" mb={3}>
//                 Asset Details Form
//               </Typography>
//               <form onSubmit={handleSubmit}>
//                 <Grid container spacing={3}>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       select
//                       fullWidth
//                       label="Brand"
//                       name="brand_id"
//                       value={formData.brand_id}
//                       onChange={handleChange}
//                       variant="outlined"
//                       helperText="Select the brand of the asset"
//                       disabled={loadingBrands || submitting}
//                     >
//                       {loadingBrands ? (
//                         <MenuItem disabled>Loading Brands...</MenuItem>
//                       ) : (
//                         brands.map((brand) => (
//                           <MenuItem key={brand.value} value={brand.value}>
//                             {brand.label}
//                           </MenuItem>
//                         ))
//                       )}
//                     </TextField>
//                   </Grid>

//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       select
//                       fullWidth
//                       label="Category"
//                       name="category_id"
//                       value={formData.category_id}
//                       onChange={handleChange}
//                       variant="outlined"
//                       helperText="Select the asset category"
//                       disabled={loadingCategories || submitting}
//                     >
//                       {loadingCategories ? (
//                         <MenuItem disabled>Loading Categories...</MenuItem>
//                       ) : (
//                         categories.map((cat) => (
//                           <MenuItem key={cat.value} value={cat.value}>
//                             {cat.label}
//                           </MenuItem>
//                         ))
//                       )}
//                     </TextField>
//                   </Grid>

//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       fullWidth
//                       type="number"
//                       label="Quantity"
//                       name="quantity"
//                       value={formData.quantity}
//                       onChange={handleChange}
//                       variant="outlined"
//                       inputProps={{ min: 1 }}
//                       helperText="Number of units purchased"
//                       disabled={submitting}
//                     />
//                   </Grid>

//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       fullWidth
//                       type="number"
//                       label="Price per unit"
//                       name="price"
//                       value={formData.price}
//                       onChange={handleChange}
//                       variant="outlined"
//                       inputProps={{ step: "0.01", min: 0 }}
//                       helperText="Cost of each asset"
//                       disabled={submitting}
//                     />
//                   </Grid>

//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       fullWidth
//                       label="Invoice Number"
//                       name="invoice_number"
//                       value={formData.invoice_number}
//                       onChange={handleChange}
//                       variant="outlined"
//                       helperText="Unique invoice identifier"
//                       disabled={submitting}
//                     />
//                   </Grid>

//                   <Grid item xs={12} sm={6}>
//                     <DatePicker
//                       label="Purchase Date"
//                       value={formData.purchase_date}
//                       onChange={(date) =>
//                         handleDateChange("purchase_date", date)
//                       }
//                       maxDate={new Date()}
//                       renderInput={(params) => (
//                         <TextField
//                           {...params}
//                           fullWidth
//                           variant="outlined"
//                           helperText="Date when the asset was purchased"
//                         />
//                       )}
//                       disabled={submitting}
//                     />
//                   </Grid>

//                   <Grid item xs={12} sm={6}>
//                     <DatePicker
//                       label="Warranty End Date"
//                       value={formData.warranty_end_date}
//                       onChange={(date) =>
//                         handleDateChange("warranty_end_date", date)
//                       }
//                       minDate={getMinWarrantyDate()}
//                       renderInput={(params) => (
//                         <TextField
//                           {...params}
//                           fullWidth
//                           variant="outlined"
//                           helperText="When the warranty expires"
//                         />
//                       )}
//                       disabled={!formData.purchase_date || submitting}
//                     />
//                   </Grid>

//                   <Grid item xs={12} sx={{ mt: 2 }}>
//                     <Button
//                       type="submit"
//                       variant="contained"
//                       color="primary"
//                       size="large"
//                       sx={{ py: 1.5 }}
//                       disabled={submitting}
//                     >
//                       {submitting ? "Saving..." : "Save Asset Purchase"}
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </form>
//             </CardContent>
//           </Card>
//         </Box>
//       </Box>
//     </LocalizationProvider>
//   );
// };

// export default NewPurchaseAssets;









// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Grid,
//   TextField,
//   Button,
//   MenuItem,
//   Typography,
//   Paper,
//   CircularProgress,
//   createTheme,
//   ThemeProvider,
// } from "@mui/material";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { format } from "date-fns";
// import axios from "axios";
// import Swal from "sweetalert2";

// // Define the custom theme based on the provided standards
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#8C257C",
//       dark: "#6d1d60",
//       contrastText: "#FFFFFF",
//     },
//     secondary: {
//       main: "#F58E35",
//     },
//     action: {
//       disabledBackground: 'rgba(140, 37, 124, 0.5)', // Lighter purple for disabled state
//       disabled: '#FFFFFF'
//     }
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           textTransform: 'none', // As per modern UI trends, buttons are not all-caps
//         },
//         containedPrimary: {
//           '&:hover': {
//             backgroundColor: '#6d1d60',
//           },
//         },
//       },
//     },
//   },
// });

// const NewPurchaseAssets = () => {
//   const [formData, setFormData] = useState({
//     brand_id: "",
//     category_id: "",
//     quantity: "",
//     price: "",
//     invoice_number: "",
//     purchase_date: null,
//     warranty_end_date: null,
//   });

//   const [brands, setBrands] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [loadingBrands, setLoadingBrands] = useState(false);
//   const [loadingCategories, setLoadingCategories] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     const fetchBrands = async () => {
//       try {
//         setLoadingBrands(true);
//         const res = await axios.get(
//           "https://tdtlworld.com/hrms-backend/api/assets-brand/"
//         );
//         setBrands(res.data);
//       } catch (error) {
//         console.error("Error fetching brands:", error);
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: "Failed to load brands. Please try again.",
//           timer: 3000,
//           showConfirmButton: false,
//         });
//       } finally {
//         setLoadingBrands(false);
//       }
//     };
//     fetchBrands();
//   }, []);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         setLoadingCategories(true);
//         const res = await axios.get(
//           "https://tdtlworld.com/hrms-backend/api/assets-category/"
//         );
//         setCategories(res.data);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: "Failed to load categories. Please try again.",
//           timer: 3000,
//           showConfirmButton: false,
//         });
//       } finally {
//         setLoadingCategories(false);
//       }
//     };
//     fetchCategories();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleDateChange = (name, date) => {
//     const newFormData = { ...formData, [name]: date };

//     if (name === "purchase_date") {
//       if (
//         newFormData.warranty_end_date &&
//         date &&
//         date >= newFormData.warranty_end_date
//       ) {
//         newFormData.warranty_end_date = null;
//       }
//     }
//     setFormData(newFormData);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);

//     const dataToSend = {
//       brand_id: Number(formData.brand_id),
//       category_id: Number(formData.category_id),
//       quantity: Number(formData.quantity),
//       price: Number(formData.price),
//       invoice_number: formData.invoice_number,
//       purchase_date: formData.purchase_date
//         ? format(formData.purchase_date, "yyyy-MM-dd")
//         : null,
//       warranty_end_date: formData.warranty_end_date
//         ? format(formData.warranty_end_date, "yyyy-MM-dd")
//         : null,
//     };

//     try {
//       const response = await axios.post(
//         "https://tdtlworld.com/hrms-backend/apis/add_new_asset_to_stock/",
//         dataToSend,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.status === 201 || response.status === 200) {
//         Swal.fire({
//           icon: "success",
//           title: "Success!",
//           text: response.data.message || "Asset purchase recorded successfully!",
//           timer: 3000,
//           showConfirmButton: false,
//         });
//         setFormData({
//           brand_id: "",
//           category_id: "",
//           quantity: "",
//           price: "",
//           invoice_number: "",
//           purchase_date: null,
//           warranty_end_date: null,
//         });
//       } else {
//         Swal.fire({
//           icon: "info",
//           title: "Info",
//           text: response.data.message || "Something went wrong, please check.",
//           timer: 3000,
//           showConfirmButton: false,
//         });
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       let errorMessage = "There was an error saving the asset. Please try again.";
//       if (error.response && error.response.data && error.response.data.message) {
//         errorMessage = error.response.data.message;
//       } else if (error.message) {
//         errorMessage = error.message;
//       }

//       Swal.fire({
//         icon: "error",
//         title: "Submission Failed",
//         text: errorMessage,
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const getMinWarrantyDate = () => {
//     if (!formData.purchase_date) return null;
//     const nextDay = new Date(formData.purchase_date);
//     nextDay.setDate(nextDay.getDate() + 1);
//     return nextDay;
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <LocalizationProvider dateAdapter={AdapterDateFns}>
//         <Box component={Paper} p={3}>
//           <Typography
//             variant="h5"
//             sx={{
//               color: "primary.main",
//               fontWeight: "bold",
//               mb: 3, // Increased margin-bottom for better spacing
//             }}
//           >
//             New Asset Purchase
//           </Typography>

//           <form onSubmit={handleSubmit}>
//             <Grid container spacing={3}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   select
//                   fullWidth
//                   required
//                   label="Brand"
//                   name="brand_id"
//                   value={formData.brand_id}
//                   onChange={handleChange}
//                   variant="outlined"
//                   helperText="Select the brand of the asset"
//                   disabled={loadingBrands || submitting}
//                 >
//                   {loadingBrands ? (
//                     <MenuItem disabled>Loading Brands...</MenuItem>
//                   ) : (
//                     brands.map((brand) => (
//                       <MenuItem key={brand.value} value={brand.value}>
//                         {brand.label}
//                       </MenuItem>
//                     ))
//                   )}
//                 </TextField>
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   select
//                   fullWidth
//                   required
//                   label="Category"
//                   name="category_id"
//                   value={formData.category_id}
//                   onChange={handleChange}
//                   variant="outlined"
//                   helperText="Select the asset category"
//                   disabled={loadingCategories || submitting}
//                 >
//                   {loadingCategories ? (
//                     <MenuItem disabled>Loading Categories...</MenuItem>
//                   ) : (
//                     categories.map((cat) => (
//                       <MenuItem key={cat.value} value={cat.value}>
//                         {cat.label}
//                       </MenuItem>
//                     ))
//                   )}
//                 </TextField>
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   required
//                   type="number"
//                   label="Quantity"
//                   name="quantity"
//                   value={formData.quantity}
//                   onChange={handleChange}
//                   variant="outlined"
//                   inputProps={{ min: 1 }}
//                   helperText="Number of units purchased"
//                   disabled={submitting}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   required
//                   type="number"
//                   label="Price per unit"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleChange}
//                   variant="outlined"
//                   inputProps={{ step: "0.01", min: 0 }}
//                   helperText="Cost of each asset"
//                   disabled={submitting}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   required
//                   label="Invoice Number"
//                   name="invoice_number"
//                   value={formData.invoice_number}
//                   onChange={handleChange}
//                   variant="outlined"
//                   helperText="Unique invoice identifier"
//                   disabled={submitting}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <DatePicker
//                   label="Purchase Date"
//                   value={formData.purchase_date}
//                   onChange={(date) => handleDateChange("purchase_date", date)}
//                   maxDate={new Date()}
//                   disabled={submitting}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       fullWidth
//                       required
//                       variant="outlined"
//                       helperText="Date when the asset was purchased"
//                     />
//                   )}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <DatePicker
//                   label="Warranty End Date"
//                   value={formData.warranty_end_date}
//                   onChange={(date) => handleDateChange("warranty_end_date", date)}
//                   minDate={getMinWarrantyDate()}
//                   disabled={!formData.purchase_date || submitting}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       fullWidth
//                       variant="outlined"
//                       helperText="When the warranty expires (optional)"
//                     />
//                   )}
//                 />
//               </Grid>

//               <Grid item xs={12} sx={{ mt: 2 }}>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                   size="large"
//                   sx={{ py: 1.5, minWidth: '220px' }}
//                   disabled={submitting}
//                 >
//                   {submitting ? (
//                     <CircularProgress size={24} color="inherit" />
//                   ) : (
//                     "Save Asset Purchase"
//                   )}
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         </Box>
//       </LocalizationProvider>
//     </ThemeProvider>
//   );
// };

// export default NewPurchaseAssets;











// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Grid,
//   TextField,
//   Button,
//   MenuItem,
//   Typography,
//   AppBar,
//   Toolbar,
//   Card,
//   CardContent,
//   CircularProgress,
// } from "@mui/material";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { format } from "date-fns";
// import axios from "axios";
// import Swal from "sweetalert2";

// // Define the color theme constants
// const THEME_PURPLE = '#8C257C';
// const THEME_ORANGE = '#F58E35';
// const THEME_PURPLE_HOVER = '#701d63';

// const NewPurchaseAssets = () => {
//   const initialFormState = {
//     brand_id: "",
//     category_id: "",
//     product_name: "",
//     manufacturer: "",
//     asset_code: "",
//     serial_number: "",
//     employee_id: "",
//     quantity: "",
//     is_working: "true", // Default to 'true' for 'Yes'
//     purchase_date: null,
//     invoice_number: "",
//     warranty_end_date: null,
//     price: "",
//   };

//   const [formData, setFormData] = useState(initialFormState);

//   const [brands, setBrands] = useState([]);
//   const [categories, setCategories] = useState([]);
//   // TODO: Fetch real employee data
//   const [employees, setEmployees] = useState([
//     { value: '1', label: 'John Doe' },
//     { value: '2', label: 'Jane Smith' }
//   ]);
//   const [loading, setLoading] = useState({ brands: false, categories: false, employees: false });
//   const [submitting, setSubmitting] = useState(false);

//   const fetchData = async (url, setData, field) => {
//     setLoading(prev => ({ ...prev, [field]: true }));
//     try {
//       const res = await axios.get(url);
//       setData(res.data);
//     } catch (error) {
//       console.error(`Error fetching ${field}:`, error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: `Failed to load ${field}. Please try again.`,
//       });
//     } finally {
//       setLoading(prev => ({ ...prev, [field]: false }));
//     }
//   };

//   useEffect(() => {
//     fetchData("https://tdtlworld.com/hrms-backend/api/assets-brand/", setBrands, 'brands');
//     fetchData("https://tdtlworld.com/hrms-backend/api/assets-category/", setCategories, 'categories');
//     // TODO: Add API call for employees, e.g.,
//     // fetchData("https://tdtlworld.com/hrms-backend/api/employees/", setEmployees, 'employees');
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleDateChange = (name, date) => {
//     setFormData((prev) => ({ ...prev, [name]: date }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);

//     // --- CRITICAL: Verify these keys match your backend API's expectations ---
//     const dataToSend = {
//       brand_id: Number(formData.brand_id) || null,
//       category_id: Number(formData.category_id) || null,
//       product_name: formData.product_name,
//       manufacturer: formData.manufacturer,
//       asset_code: formData.asset_code,
//       serial_number: formData.serial_number,
//       employee_id: Number(formData.employee_id) || null,
//       quantity: Number(formData.quantity) || null,
//       is_working: formData.is_working === 'true', // Convert string to boolean
//       purchase_date: formData.purchase_date
//         ? format(formData.purchase_date, "yyyy-MM-dd")
//         : null,
//       invoice_number: formData.invoice_number,
//       warranty_end_date: formData.warranty_end_date
//         ? format(formData.warranty_end_date, "yyyy-MM-dd")
//         : null,
//       price: Number(formData.price) || null
//     };

//     console.log("Payload to API:", dataToSend);

//     try {
//       const response = await axios.post(
//         "https://tdtlworld.com/hrms-backend/api/assets-inventory/", // Adjusted API endpoint assumption
//         dataToSend
//       );

//       Swal.fire({
//         icon: "success",
//         title: "Success!",
//         text: response.data.message || "Asset purchase recorded successfully!",
//       }).then(() => {
//         setFormData(initialFormState); // Reset form
//       });
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       const errorMessage =
//         error.response?.data?.message ||
//         "There was an error saving the asset. Please try again.";

//       Swal.fire({
//         icon: "error",
//         title: "Submission Failed",
//         text: errorMessage,
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const getMinWarrantyDate = () => {
//     if (!formData.purchase_date) return null;
//     const nextDay = new Date(formData.purchase_date);
//     nextDay.setDate(nextDay.getDate() + 1);
//     return nextDay;
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Box sx={{ flexGrow: 1 }}>
//           <Toolbar>
//             <Typography variant="h4" fontWeight="bold" component="div" sx={{color:"#8C257C", flexGrow: 1}} >
//               New Asset Purchase
//             </Typography>
//           </Toolbar>
       

//         <Box component="form" onSubmit={handleSubmit} sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
//             <CardContent>
//               {/* <Typography variant="h5"  fontWeight="bold" sx={{color:"#8C257C"}} gutterBottom>
//               Asset <Typography component="span" variant="h5"  fontWeight="bold" sx={{color:"#8C257C"}}>Detail Form</Typography>
//             </Typography> */}
//               <Grid container spacing={3}>

//                 {/* Brand */}
//                 <Grid item xs={12} sm={6} md={4}>
//                   <TextField select fullWidth required label="Brand" name="brand_id" value={formData.brand_id} onChange={handleChange} disabled={loading.brands || submitting}>
//                     {loading.brands ? <MenuItem disabled>Loading...</MenuItem> : brands.map((brand) => (<MenuItem key={brand.value} value={brand.value}>{brand.label}</MenuItem>))}
//                   </TextField>
//                 </Grid>

//                 {/* Category */}
//                 <Grid item xs={12} sm={6} md={4}>
//                   <TextField select fullWidth required label="Category" name="category_id" value={formData.category_id} onChange={handleChange} disabled={loading.categories || submitting}>
//                     {loading.categories ? <MenuItem disabled>Loading...</MenuItem> : categories.map((cat) => (<MenuItem key={cat.value} value={cat.value}>{cat.label}</MenuItem>))}
//                   </TextField>
//                 </Grid>

//                 {/* Product */}
//                 <Grid item xs={12} sm={6} md={4}>
//                   <TextField fullWidth required label="Product Name" name="product_name" value={formData.product_name} onChange={handleChange} disabled={submitting} />
//                 </Grid>

//                 {/* Manufacturer */}
//                 <Grid item xs={12} sm={6} md={4}>
//                   <TextField fullWidth label="Manufacturer" name="manufacturer" value={formData.manufacturer} onChange={handleChange} disabled={submitting} />
//                 </Grid>

//                 {/* Asset Code */}
//                 <Grid item xs={12} sm={6} md={4}>
//                   <TextField fullWidth required label="Asset Code" name="asset_code" value={formData.asset_code} onChange={handleChange} disabled={submitting} />
//                 </Grid>

//                 {/* Serial Number */}
//                 <Grid item xs={12} sm={6} md={4}>
//                   <TextField fullWidth required label="Serial Number" name="serial_number" value={formData.serial_number} onChange={handleChange} disabled={submitting} />
//                 </Grid>

//                 {/* Employee */}
//                 <Grid item xs={12} sm={6} md={4}>
//                   <TextField select fullWidth label="Assigned Employee" name="employee_id" value={formData.employee_id} onChange={handleChange} disabled={loading.employees || submitting}>
//                     <MenuItem value=""><em>None</em></MenuItem>
//                     {loading.employees ? <MenuItem disabled>Loading...</MenuItem> : employees.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{emp.label}</MenuItem>))}
//                   </TextField>
//                 </Grid>
               
//                 {/* Quantity */}
//                 <Grid item xs={12} sm={6} md={4}>
//                     <TextField fullWidth required type="number" label="Quantity" name="quantity" value={formData.quantity} onChange={handleChange} inputProps={{ min: 1 }} disabled={submitting}/>
//                 </Grid>

//                 {/* Is Working */}
//                 <Grid item xs={12} sm={6} md={4}>
//                   <TextField select fullWidth label="Is Working?" name="is_working" value={formData.is_working} onChange={handleChange} disabled={submitting}>
//                     <MenuItem value="true">Yes</MenuItem>
//                     <MenuItem value="false">No</MenuItem>
//                   </TextField>
//                 </Grid>

//                 {/* Purchase Date */}
//                 <Grid item xs={12} sm={6} md={4}>
//                   <DatePicker label="Purchase Date" value={formData.purchase_date} onChange={(date) => handleDateChange("purchase_date", date)} maxDate={new Date()} renderInput={(params) => <TextField {...params} fullWidth required />} disabled={submitting} />
//                 </Grid>
               
//                 {/* Invoice Number */}
//                 <Grid item xs={12} sm={6} md={4}>
//                   <TextField fullWidth required label="Invoice Number" name="invoice_number" value={formData.invoice_number} onChange={handleChange} disabled={submitting} />
//                 </Grid>

//                 {/* Warranty End Date */}
//                 <Grid item xs={12} sm={6} md={4}>
//                   <DatePicker label="Warranty End Date" value={formData.warranty_end_date} onChange={(date) => handleDateChange("warranty_end_date", date)} minDate={getMinWarrantyDate()} renderInput={(params) => <TextField {...params} fullWidth />} disabled={!formData.purchase_date || submitting} />
//                 </Grid>
               
//                 {/* Price */}
//                 <Grid item xs={12} sm={6} md={4}>
//                     <TextField fullWidth required type="number" label="Price per unit" name="price" value={formData.price} onChange={handleChange} inputProps={{ step: "0.01", min: 0 }} disabled={submitting}/>
//                 </Grid>

//                 <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
//                   <Button type="submit" variant="contained" size="large" sx={{ py: 1.5, px: 4, backgroundColor: THEME_PURPLE, '&:hover': { backgroundColor: THEME_PURPLE_HOVER } }} disabled={submitting}>
//                     {submitting ? <CircularProgress size={24} color="inherit" /> : "Save Asset"}
//                   </Button>
//                 </Grid>

//               </Grid>
//             </CardContent>
         
//         </Box>
//       </Box>
//     </LocalizationProvider>
//   );
// };

// export default NewPurchaseAssets;











// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Grid,
//   TextField,
//   Button,
//   MenuItem,
//   Typography,
//   Toolbar,
//   CardContent,
//   CircularProgress,
// } from "@mui/material";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { format } from "date-fns";
// import axios from "axios";
// import Swal from "sweetalert2";

// // Define the color theme constants
// const THEME_PURPLE = '#8C257C';
// const THEME_ORANGE = '#F58E35';
// const THEME_PURPLE_HOVER = '#701d63';

// const NewPurchaseAssets = () => {
//   const initialFormState = {
//     brand_id: "",
//     category_id: "",
//     product_id: "", // This will hold the selected product's constants_id
//     manufacturer: "",
//     asset_code: "",
//     serial_number: "",
//     quantity: "",
//     is_working: "true",
//     purchase_date: null,
//     invoice_number: "",
//     warranty_end_date: null,
//     price: "",
//   };

//   const [formData, setFormData] = useState(initialFormState);

//   const [brands, setBrands] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]); // State for the new product dropdown
//   const [loading, setLoading] = useState({ brands: false, categories: false, products: false });
//   const [submitting, setSubmitting] = useState(false);

//   // Generic fetcher for APIs that return { value, label } format
//   const fetchGenericData = async (url, setData, field) => {
//     setLoading(prev => ({ ...prev, [field]: true }));
//     try {
//       const res = await axios.get(url);
//       setData(res.data);
//     } catch (error) {
//       console.error(`Error fetching ${field}:`, error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: `Failed to load ${field}. Please try again.`,
//       });
//     } finally {
//       setLoading(prev => ({ ...prev, [field]: false }));
//     }
//   };

//   // Specific fetcher for the Products API to handle its unique response structure
//   const fetchProducts = async () => {
//     setLoading(prev => ({ ...prev, products: true }));
//     try {
//       const res = await axios.get("https://tdtlworld.com/hrms-backend/apis/create_edit_product/");
//       // Transform the response data to a { value, label } format for the dropdown
//       const formattedProducts = res.data.map(product => ({
//         value: product.constants_id,
//         label: product.category_name,
//       }));
//       setProducts(formattedProducts);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to load products. Please try again.",
//       });
//     } finally {
//       setLoading(prev => ({ ...prev, products: false }));
//     }
//   };

//   useEffect(() => {
//     fetchGenericData("https://tdtlworld.com/hrms-backend/api/assets-brand/", setBrands, 'brands');
//     fetchGenericData("https://tdtlworld.com/hrms-backend/api/assets-category/", setCategories, 'categories');
//     fetchProducts(); // Use the dedicated function to fetch and format products
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleDateChange = (name, date) => {
//     setFormData((prev) => ({ ...prev, [name]: date }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);

//     const dataToSend = {
//       brand_id: Number(formData.brand_id) || null,
//       category_id: Number(formData.category_id) || null,
//       // The payload key is 'product_id', and its value is the selected 'constants_id'
//       product_id: Number(formData.product_id) || null,
//       manufacturer: formData.manufacturer,
//       asset_code: formData.asset_code,
//       serial_number: formData.serial_number,
//       quantity: Number(formData.quantity) || null,
//       is_working: formData.is_working === 'true',
//       purchase_date: formData.purchase_date
//         ? format(formData.purchase_date, "yyyy-MM-dd")
//         : null,
//       invoice_number: formData.invoice_number,
//       warranty_end_date: formData.warranty_end_date
//         ? format(formData.warranty_end_date, "yyyy-MM-dd")
//         : null,
//       price: Number(formData.price) || null
//     };

//     console.log("Payload to API:", dataToSend);

//     try {
//       const response = await axios.post(
//         "https://tdtlworld.com/hrms-backend/api/assets-inventory/",
//         dataToSend
//       );

//       Swal.fire({
//         icon: "success",
//         title: "Success!",
//         text: response.data.message || "Asset purchase recorded successfully!",
//       }).then(() => {
//         setFormData(initialFormState); // Reset form
//       });
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       const errorMessage =
//         error.response?.data?.message ||
//         "There was an error saving the asset. Please try again.";

//       Swal.fire({
//         icon: "error",
//         title: "Submission Failed",
//         text: errorMessage,
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const getMinWarrantyDate = () => {
//     if (!formData.purchase_date) return null;
//     const nextDay = new Date(formData.purchase_date);
//     nextDay.setDate(nextDay.getDate() + 1);
//     return nextDay;
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Box sx={{ flexGrow: 1 }}>
//         <Toolbar>
//           <Typography variant="h4" fontWeight="bold" component="div" sx={{color:"#8C257C", flexGrow: 1}} >
//             New Asset Purchase
//           </Typography>
//         </Toolbar>

//         <Box component="form" onSubmit={handleSubmit} sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
//           <CardContent>
//             <Grid container spacing={3}>

//               {/* Brand */}
//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField select fullWidth required label="Brand" name="brand_id" value={formData.brand_id} onChange={handleChange} disabled={loading.brands || submitting}>
//                   {loading.brands ? <MenuItem disabled>Loading...</MenuItem> : brands.map((brand) => (<MenuItem key={brand.value} value={brand.value}>{brand.label}</MenuItem>))}
//                 </TextField>
//               </Grid>

//               {/* Category */}
//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField select fullWidth required label="Category" name="category_id" value={formData.category_id} onChange={handleChange} disabled={loading.categories || submitting}>
//                   {loading.categories ? <MenuItem disabled>Loading...</MenuItem> : categories.map((cat) => (<MenuItem key={cat.value} value={cat.value}>{cat.label}</MenuItem>))}
//                 </TextField>
//               </Grid>

//               {/* Product - Dropdown with new API */}
//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField select fullWidth required label="Product Name" name="product_id" value={formData.product_id} onChange={handleChange} disabled={loading.products || submitting}>
//                   {loading.products ? <MenuItem disabled>Loading...</MenuItem> : products.map((product) => (<MenuItem key={product.value} value={product.value}>{product.label}</MenuItem>))}
//                 </TextField>
//               </Grid>

//               {/* Manufacturer */}
//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField fullWidth label="Manufacturer" name="manufacturer" value={formData.manufacturer} onChange={handleChange} disabled={submitting} />
//               </Grid>

//               {/* Asset Code */}
//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField fullWidth required label="Asset Code" name="asset_code" value={formData.asset_code} onChange={handleChange} disabled={submitting} />
//               </Grid>

//               {/* Serial Number */}
//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField fullWidth required label="Serial Number" name="serial_number" value={formData.serial_number} onChange={handleChange} disabled={submitting} />
//               </Grid>
              
//               {/* Quantity */}
//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField fullWidth required type="number" label="Quantity" name="quantity" value={formData.quantity} onChange={handleChange} inputProps={{ min: 1 }} disabled={submitting}/>
//               </Grid>

//               {/* Is Working */}
//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField select fullWidth label="Is Working?" name="is_working" value={formData.is_working} onChange={handleChange} disabled={submitting}>
//                   <MenuItem value="true">Yes</MenuItem>
//                   <MenuItem value="false">No</MenuItem>
//                 </TextField>
//               </Grid>

//               {/* Purchase Date */}
//               <Grid item xs={12} sm={6} md={4}>
//                 <DatePicker label="Purchase Date" value={formData.purchase_date} onChange={(date) => handleDateChange("purchase_date", date)} maxDate={new Date()} renderInput={(params) => <TextField {...params} fullWidth required />} disabled={submitting} />
//               </Grid>
              
//               {/* Invoice Number */}
//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField fullWidth required label="Invoice Number" name="invoice_number" value={formData.invoice_number} onChange={handleChange} disabled={submitting} />
//               </Grid>

//               {/* Warranty End Date */}
//               <Grid item xs={12} sm={6} md={4}>
//                 <DatePicker label="Warranty End Date" value={formData.warranty_end_date} onChange={(date) => handleDateChange("warranty_end_date", date)} minDate={getMinWarrantyDate()} renderInput={(params) => <TextField {...params} fullWidth />} disabled={!formData.purchase_date || submitting} />
//               </Grid>
              
//               {/* Price */}
//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField fullWidth required type="number" label="Price per unit" name="price" value={formData.price} onChange={handleChange} inputProps={{ step: "0.01", min: 0 }} disabled={submitting}/>
//               </Grid>

//               <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
//                 <Button type="submit" variant="contained" size="large" sx={{ py: 1.5, px: 4, backgroundColor: THEME_PURPLE, '&:hover': { backgroundColor: THEME_PURPLE_HOVER } }} disabled={submitting}>
//                   {submitting ? <CircularProgress size={24} color="inherit" /> : "Save Asset"}
//                 </Button>
//               </Grid>

//             </Grid>
//           </CardContent>
//         </Box>
//       </Box>
//     </LocalizationProvider>
//   );
// };

// export default NewPurchaseAssets;















// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Grid,
//   TextField,
//   Button,
//   MenuItem,
//   Typography,
//   Toolbar,
//   CardContent,
//   CircularProgress,
// } from "@mui/material";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { format } from "date-fns";
// import axios from "axios";
// import Swal from "sweetalert2";

// // Define the color theme constants
// const THEME_PURPLE = '#8C257C';
// const THEME_ORANGE = '#F58E35';
// const THEME_PURPLE_HOVER = '#701d63';

// const NewPurchaseAssets = () => {
//   const initialFormState = {
//     brand_id: "",
//     category_id: "",
//     product_id: "", // This will hold the selected product's constants_id
//     manufacturer: "", // Still in form state, but not sent in new API
//     asset_code: "",   // Still in form state, but not sent in new API
//     serial_number: "",// Still in form state, but not sent in new API
//     quantity: "",
//     is_working: "true",// Still in form state, but not sent in new API
//     purchase_date: null,
//     invoice_number: "",
//     warranty_end_date: null,
//     price: "",
//   };

//   const [formData, setFormData] = useState(initialFormState);

//   const [brands, setBrands] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState({ brands: false, categories: false, products: false });
//   const [submitting, setSubmitting] = useState(false);

//   const fetchGenericData = async (url, setData, field) => {
//     setLoading(prev => ({ ...prev, [field]: true }));
//     try {
//       const res = await axios.get(url);
//       setData(res.data);
//     } catch (error) {
//       console.error(`Error fetching ${field}:`, error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: `Failed to load ${field}. Please try again.`,
//       });
//     } finally {
//       setLoading(prev => ({ ...prev, [field]: false }));
//     }
//   };

//   const fetchProducts = async () => {
//     setLoading(prev => ({ ...prev, products: true }));
//     try {
//       const res = await axios.get("https://tdtlworld.com/hrms-backend/apis/create_edit_product/");
//       const formattedProducts = res.data.map(product => ({
//         value: product.constants_id,
//         label: product.category_name,
//       }));
//       setProducts(formattedProducts);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to load products. Please try again.",
//       });
//     } finally {
//       setLoading(prev => ({ ...prev, products: false }));
//     }
//   };

//   useEffect(() => {
//     fetchGenericData("https://tdtlworld.com/hrms-backend/api/assets-brand/", setBrands, 'brands');
//     fetchGenericData("https://tdtlworld.com/hrms-backend/api/assets-category/", setCategories, 'categories');
//     fetchProducts();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleDateChange = (name, date) => {
//     setFormData((prev) => ({ ...prev, [name]: date }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);

//     // --- CRITICAL: This payload is structured for the new API endpoint ---
//     const dataToSend = {
//       brand_id: Number(formData.brand_id) || null,
//       category_id: Number(formData.category_id) || null,
//       product_id: Number(formData.product_id) || null,
//       quantity: Number(formData.quantity) || null,
//       price: Number(formData.price) || null,
//       invoice_number: formData.invoice_number,
//       purchase_date: formData.purchase_date
//         ? format(formData.purchase_date, "yyyy-MM-dd")
//         : null,
//       warranty_end_date: formData.warranty_end_date
//         ? format(formData.warranty_end_date, "yyyy-MM-dd")
//         : null
//     };

//     console.log("Payload to API:", dataToSend);

//     try {
//       // --- Use the new API endpoint ---
//       const response = await axios.post(
//         "https://tdtlworld.com/hrms-backend/apis/add_new_asset_to_stock/",
//         dataToSend
//       );

//       Swal.fire({
//         icon: "success",
//         title: "Success!",
//         // Use the message from the new API's response
//         text: response.data.message || "Asset stock added successfully!",
//       }).then(() => {
//         setFormData(initialFormState); // Reset form
//       });
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       const errorMessage =
//         error.response?.data?.message ||
//         "There was an error saving the asset. Please try again.";

//       Swal.fire({
//         icon: "error",
//         title: "Submission Failed",
//         text: errorMessage,
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const getMinWarrantyDate = () => {
//     if (!formData.purchase_date) return null;
//     const nextDay = new Date(formData.purchase_date);
//     nextDay.setDate(nextDay.getDate() + 1);
//     return nextDay;
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Box sx={{ flexGrow: 1 }}>
//         <Toolbar>
//           <Typography variant="h4" fontWeight="bold" component="div" sx={{color:"#8C257C", flexGrow: 1}} >
//             New Asset Purchase
//           </Typography>
//         </Toolbar>

//         <Box component="form" onSubmit={handleSubmit} sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
//           <CardContent>
//             <Grid container spacing={3}>

//               {/* Brand */}
//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField select fullWidth required label="Brand" name="brand_id" value={formData.brand_id} onChange={handleChange} disabled={loading.brands || submitting}>
//                   {loading.brands ? <MenuItem disabled>Loading...</MenuItem> : brands.map((brand) => (<MenuItem key={brand.value} value={brand.value}>{brand.label}</MenuItem>))}
//                 </TextField>
//               </Grid>

//               {/* Category */}
//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField select fullWidth required label="Category" name="category_id" value={formData.category_id} onChange={handleChange} disabled={loading.categories || submitting}>
//                   {loading.categories ? <MenuItem disabled>Loading...</MenuItem> : categories.map((cat) => (<MenuItem key={cat.value} value={cat.value}>{cat.label}</MenuItem>))}
//                 </TextField>
//               </Grid>

//               {/* Product */}
//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField select fullWidth required label="Product Name" name="product_id" value={formData.product_id} onChange={handleChange} disabled={loading.products || submitting}>
//                   {loading.products ? <MenuItem disabled>Loading...</MenuItem> : products.map((product) => (<MenuItem key={product.value} value={product.value}>{product.label}</MenuItem>))}
//                 </TextField>
//               </Grid>

//               {/* Manufacturer */}
//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField fullWidth label="Manufacturer" name="manufacturer" value={formData.manufacturer} onChange={handleChange} disabled={submitting} />
//               </Grid>

//               {/* Asset Code */}
//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField fullWidth required label="Asset Code" name="asset_code" value={formData.asset_code} onChange={handleChange} disabled={submitting} />
//               </Grid>

//               {/* Serial Number */}
//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField fullWidth required label="Serial Number" name="serial_number" value={formData.serial_number} onChange={handleChange} disabled={submitting} />
//               </Grid>
              
//               {/* Quantity */}
//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField fullWidth required type="number" label="Quantity" name="quantity" value={formData.quantity} onChange={handleChange} inputProps={{ min: 1 }} disabled={submitting}/>
//               </Grid>

//               {/* Is Working */}
//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField select fullWidth label="Is Working?" name="is_working" value={formData.is_working} onChange={handleChange} disabled={submitting}>
//                   <MenuItem value="true">Yes</MenuItem>
//                   <MenuItem value="false">No</MenuItem>
//                 </TextField>
//               </Grid>

//               {/* Purchase Date */}
//               <Grid item xs={12} sm={6} md={4}>
//                 <DatePicker label="Purchase Date" value={formData.purchase_date} onChange={(date) => handleDateChange("purchase_date", date)} maxDate={new Date()} renderInput={(params) => <TextField {...params} fullWidth required />} disabled={submitting} />
//               </Grid>
              
//               {/* Invoice Number */}
//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField fullWidth required label="Invoice Number" name="invoice_number" value={formData.invoice_number} onChange={handleChange} disabled={submitting} />
//               </Grid>

//               {/* Warranty End Date */}
//               <Grid item xs={12} sm={6} md={4}>
//                 <DatePicker label="Warranty End Date" value={formData.warranty_end_date} onChange={(date) => handleDateChange("warranty_end_date", date)} minDate={getMinWarrantyDate()} renderInput={(params) => <TextField {...params} fullWidth />} disabled={!formData.purchase_date || submitting} />
//               </Grid>
              
//               {/* Price */}
//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField fullWidth required type="number" label="Price per unit" name="price" value={formData.price} onChange={handleChange} inputProps={{ step: "0.01", min: 0 }} disabled={submitting}/>
//               </Grid>

//               <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
//                 <Button type="submit" variant="contained" size="large" sx={{ py: 1.5, px: 4, backgroundColor: THEME_PURPLE, '&:hover': { backgroundColor: THEME_PURPLE_HOVER } }} disabled={submitting}>
//                   {submitting ? <CircularProgress size={24} color="inherit" /> : "Save Asset"}
//                 </Button>
//               </Grid>

//             </Grid>
//           </CardContent>
//         </Box>
//       </Box>
//     </LocalizationProvider>
//   );
// };

// export default NewPurchaseAssets;








// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Grid,
//   TextField,
//   Button,
//   MenuItem,
//   Typography,
//   Toolbar,
//   CardContent,
//   CircularProgress,
// } from "@mui/material";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { format as formatDate } from "date-fns";
// import axios from "axios";
// import Swal from "sweetalert2";

// const THEME_PURPLE = '#8C257C';
// const THEME_ORANGE = '#F58E35';
// const THEME_PURPLE_HOVER = '#701d63';

// const NewPurchaseAssets = () => {
//   const initialFormState = {
//     brand_id: "",
//     category_id: "",
//     product_id: "",
//     manufacturer: "",
//     asset_code: "",
//     serial_number: "",
//     quantity: "",
//     is_working: "true",
//     purchase_date: null,
//     invoice_number: "",
//     warranty_end_date: null,
//     price: "",
//   };

//   const [formData, setFormData] = useState(initialFormState);
//   const [brands, setBrands] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState({ brands: false, categories: false, products: false });
//   const [submitting, setSubmitting] = useState(false);

//   const fetchGenericData = async (url, setData, field) => {
//     setLoading(prev => ({ ...prev, [field]: true }));
//     try {
//       const res = await axios.get(url);
//       setData(res.data);
//     } catch (error) {
//       console.error(`Error fetching ${field}:`, error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: `Failed to load ${field}. Please try again.`,
//       });
//     } finally {
//       setLoading(prev => ({ ...prev, [field]: false }));
//     }
//   };

//   const fetchProducts = async () => {
//     setLoading(prev => ({ ...prev, products: true }));
//     try {
//       const res = await axios.get("https://tdtlworld.com/hrms-backend/apis/create_edit_product/");
//       const formattedProducts = res.data.map(product => ({
//         value: product.constants_id,
//         label: product.category_name,
//       }));
//       setProducts(formattedProducts);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to load products. Please try again.",
//       });
//     } finally {
//       setLoading(prev => ({ ...prev, products: false }));
//     }
//   };

//   useEffect(() => {
//     fetchGenericData("https://tdtlworld.com/hrms-backend/api/assets-brand/", setBrands, 'brands');
//     fetchGenericData("https://tdtlworld.com/hrms-backend/api/assets-category/", setCategories, 'categories');
//     fetchProducts();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleDateChange = (name, date) => {
//     setFormData((prev) => ({ ...prev, [name]: date }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);

//     const dataToSend = {
//       brand_id: Number(formData.brand_id) || null,
//       category_id: Number(formData.category_id) || null,
//       product_id: Number(formData.product_id) || null,
//       quantity: Number(formData.quantity) || null,
//       price: Number(formData.price) || null,
//       invoice_number: formData.invoice_number,
//       purchase_date: formData.purchase_date
//         ? formatDate(formData.purchase_date, "yyyy-MM-dd")
//         : null,
//       warranty_end_date: formData.warranty_end_date
//         ? formatDate(formData.warranty_end_date, "yyyy-MM-dd")
//         : null
//     };

//     console.log("Payload to API:", dataToSend);

//     try {
//       const response = await axios.post(
//         "https://tdtlworld.com/hrms-backend/apis/add_new_asset_to_stock/",
//         dataToSend
//       );

//       Swal.fire({
//         icon: "success",
//         title: "Success!",
//         text: response.data.message || "Asset stock added successfully!",
//       }).then(() => {
//         setFormData(initialFormState);
//       });
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       const errorMessage =
//         error.response?.data?.message ||
//         "There was an error saving the asset. Please try again.";

//       Swal.fire({
//         icon: "error",
//         title: "Submission Failed",
//         text: errorMessage,
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const getMinWarrantyDate = () => {
//     if (!formData.purchase_date) return null;
//     const nextDay = new Date(formData.purchase_date);
//     nextDay.setDate(nextDay.getDate() + 1);
//     return nextDay;
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Box sx={{ flexGrow: 1 }}>
//         <Toolbar>
//           <Typography variant="h4" fontWeight="bold" component="div" sx={{color:"#8C257C", flexGrow: 1}} >
//             New Asset Purchase
//           </Typography>
//         </Toolbar>

//         <Box component="form" onSubmit={handleSubmit} sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
//           <CardContent>
//             <Grid container spacing={3}>

//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField select fullWidth required label="Category" name="category_id" value={formData.category_id} onChange={handleChange} disabled={loading.categories || submitting}>
//                   {loading.categories ? <MenuItem disabled>Loading...</MenuItem> : categories.map((cat) => (<MenuItem key={cat.value} value={cat.value}>{cat.label}</MenuItem>))}
//                 </TextField>
//               </Grid>

//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField select fullWidth required label="Brand" name="brand_id" value={formData.brand_id} onChange={handleChange} disabled={loading.brands || submitting}>
//                   {loading.brands ? <MenuItem disabled>Loading...</MenuItem> : brands.map((brand) => (<MenuItem key={brand.value} value={brand.value}>{brand.label}</MenuItem>))}
//                 </TextField>
//               </Grid>

//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField select fullWidth required label="Asset Product Name" name="product_id" value={formData.product_id} onChange={handleChange} disabled={loading.products || submitting}>
//                   {loading.products ? <MenuItem disabled>Loading...</MenuItem> : products.map((product) => (<MenuItem key={product.value} value={product.value}>{product.label}</MenuItem>))}
//                 </TextField>
//               </Grid>

//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField fullWidth label="Manufacturer" name="manufacturer" value={formData.manufacturer} onChange={handleChange} disabled={submitting} />
//               </Grid>

//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField fullWidth required label="Asset Code" name="asset_code" value={formData.asset_code} onChange={handleChange} disabled={submitting} />
//               </Grid>

//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField fullWidth required label="Serial Number" name="serial_number" value={formData.serial_number} onChange={handleChange} disabled={submitting} />
//               </Grid>
              
//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField fullWidth required type="number" label="Quantity" name="quantity" value={formData.quantity} onChange={handleChange} inputProps={{ min: 1 }} disabled={submitting}/>
//               </Grid>

//               <Grid item xs={12} sm={6} md={4}>
//                 <DatePicker
//                   label="Purchase Date"
//                   value={formData.purchase_date}
//                   onChange={(date) => handleDateChange("purchase_date", date)}
//                   maxDate={new Date()}
//                   format="dd-MM-yyyy"
//                   renderInput={(params) => <TextField {...params} fullWidth required />}
//                   disabled={submitting}
//                 />
//               </Grid>
              
//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField fullWidth required label="Invoice Number" name="invoice_number" value={formData.invoice_number} onChange={handleChange} disabled={submitting} />
//               </Grid>

//               <Grid item xs={12} sm={6} md={4}>
//                 <DatePicker
//                   label="Warranty End Date"
//                   value={formData.warranty_end_date}
//                   onChange={(date) => handleDateChange("warranty_end_date", date)}
//                   minDate={getMinWarrantyDate()}
//                   format="dd-MM-yyyy"
//                   renderInput={(params) => <TextField {...params} fullWidth />}
//                   disabled={!formData.purchase_date || submitting}
//                 />
//               </Grid>
              
//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField fullWidth required type="number" label="Price per unit" name="price" value={formData.price} onChange={handleChange} inputProps={{ step: "0.01", min: 0 }} disabled={submitting}/>
//               </Grid>

//               <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
//                 <Button type="submit" variant="contained" size="large" sx={{ py: 1.5, px: 4, backgroundColor: THEME_PURPLE, '&:hover': { backgroundColor: THEME_PURPLE_HOVER } }} disabled={submitting}>
//                   {submitting ? <CircularProgress size={24} color="inherit" /> : "Save Asset"}
//                 </Button>
//               </Grid>

//             </Grid>
//           </CardContent>
//         </Box>
//       </Box>
//     </LocalizationProvider>
//   );
// };

// export default NewPurchaseAssets;








// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Grid,
//   TextField,
//   Button,
//   MenuItem,
//   Typography,
//   Toolbar,
//   CardContent,
//   CircularProgress,
// } from "@mui/material";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { format as formatDate } from "date-fns";
// import axios from "axios";
// import Swal from "sweetalert2";

// const THEME_PURPLE = '#8C257C';
// const THEME_ORANGE = '#F58E35';
// const THEME_PURPLE_HOVER = '#701d63';

// const NewPurchaseAssets = () => {
//   const initialFormState = {
//     brand_id: "",
//     category_id: "",
//     product_id: "",
//     manufacturer: "",
//     asset_code: "",
//     serial_number: "",
//     quantity: "",
//     is_working: "true",
//     purchase_date: null,
//     invoice_number: "",
//     warranty_end_date: null,
//     price: "",
//   };

//   const [formData, setFormData] = useState(initialFormState);
//   const [brands, setBrands] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState({ brands: false, categories: false, products: false });
//   const [submitting, setSubmitting] = useState(false);

//   const fetchGenericData = async (url, setData, field) => {
//     setLoading(prev => ({ ...prev, [field]: true }));
//     try {
//       const res = await axios.get(url);
//       setData(res.data);
//     } catch (error) {
//       console.error(`Error fetching ${field}:`, error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: `Failed to load ${field}. Please try again.`,
//       });
//     } finally {
//       setLoading(prev => ({ ...prev, [field]: false }));
//     }
//   };

//   const fetchProducts = async () => {
//     setLoading(prev => ({ ...prev, products: true }));
//     try {
//       const res = await axios.get("https://tdtlworld.com/hrms-backend/apis/create_edit_product/");
//       const formattedProducts = res.data.map(product => ({
//         value: product.constants_id,
//         label: product.category_name,
//       }));
//       setProducts(formattedProducts);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to load products. Please try again.",
//       });
//     } finally {
//       setLoading(prev => ({ ...prev, products: false }));
//     }
//   };

//   useEffect(() => {
//     fetchGenericData("https://tdtlworld.com/hrms-backend/api/assets-brand/", setBrands, 'brands');
//     fetchGenericData("https://tdtlworld.com/hrms-backend/api/assets-category/", setCategories, 'categories');
//     fetchProducts();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleDateChange = (name, date) => {
//     setFormData((prev) => ({ ...prev, [name]: date }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);

//     const dataToSend = {
//       brand_id: Number(formData.brand_id) || null,
//       category_id: Number(formData.category_id) || null,
//       product_id: Number(formData.product_id) || null,
//       quantity: Number(formData.quantity) || null,
//       price: Number(formData.price) || null,
//       invoice_number: formData.invoice_number,
//       purchase_date: formData.purchase_date
//         ? formatDate(formData.purchase_date, "yyyy-MM-dd")
//         : null,
//       warranty_end_date: formData.warranty_end_date
//         ? formatDate(formData.warranty_end_date, "yyyy-MM-dd")
//         : null
//     };

//     console.log("Payload to API:", dataToSend);

//     try {
//       const response = await axios.post(
//         "https://tdtlworld.com/hrms-backend/apis/add_new_asset_to_stock/",
//         dataToSend
//       );

//       Swal.fire({
//         icon: "success",
//         title: "Success!",
//         text: response.data.message || "Asset stock added successfully!",
//       }).then(() => {
//         setFormData(initialFormState);
//       });
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       const errorMessage =
//         error.response?.data?.message ||
//         "There was an error saving the asset. Please try again.";

//       Swal.fire({
//         icon: "error",
//         title: "Submission Failed",
//         text: errorMessage,
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const getMinWarrantyDate = () => {
//     if (!formData.purchase_date) return null;
//     const nextDay = new Date(formData.purchase_date);
//     nextDay.setDate(nextDay.getDate() + 1);
//     return nextDay;
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Box sx={{ flexGrow: 1 }}>
//         <Toolbar>
//           <Typography variant="h4" fontWeight="bold" component="div" sx={{color:"#8C257C", flexGrow: 1}} >
//             New Asset Purchase
//           </Typography>
//         </Toolbar>

//         <Box component="form" onSubmit={handleSubmit} sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
//           <CardContent>
//             <Grid container spacing={3}>

//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField select fullWidth required label="Category" name="category_id" value={formData.category_id} onChange={handleChange} disabled={loading.categories || submitting}>
//                   {loading.categories ? <MenuItem disabled>Loading...</MenuItem> : categories.map((cat) => (<MenuItem key={cat.value} value={cat.value}>{cat.label}</MenuItem>))}
//                 </TextField>
//               </Grid>

//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField select fullWidth required label="Brand" name="brand_id" value={formData.brand_id} onChange={handleChange} disabled={loading.brands || submitting}>
//                   {loading.brands ? <MenuItem disabled>Loading...</MenuItem> : brands.map((brand) => (<MenuItem key={brand.value} value={brand.value}>{brand.label}</MenuItem>))}
//                 </TextField>
//               </Grid>

//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField select fullWidth required label="Asset Product Name" name="product_id" value={formData.product_id} onChange={handleChange} disabled={loading.products || submitting}>
//                   {loading.products ? <MenuItem disabled>Loading...</MenuItem> : products.map((product) => (<MenuItem key={product.value} value={product.value}>{product.label}</MenuItem>))}
//                 </TextField>
//               </Grid>

//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField fullWidth label="Manufacturer" name="manufacturer" value={formData.manufacturer} onChange={handleChange} disabled={submitting} />
//               </Grid>

//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField fullWidth required label="Asset Code" name="asset_code" value={formData.asset_code} onChange={handleChange} disabled={submitting} />
//               </Grid>

//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField fullWidth required label="Serial Number" name="serial_number" value={formData.serial_number} onChange={handleChange} disabled={submitting} />
//               </Grid>
              
//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField fullWidth required type="number" label="Quantity" name="quantity" value={formData.quantity} onChange={handleChange} inputProps={{ min: 1 }} disabled={submitting}/>
//               </Grid>

             
              
//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField fullWidth required label="Invoice Number" name="invoice_number" value={formData.invoice_number} onChange={handleChange} disabled={submitting} />
//               </Grid>
//                 <Grid item xs={12} sm={6} md={4}>
//                 <TextField fullWidth required type="number" label="Price per unit" name="price" value={formData.price} onChange={handleChange} inputProps={{ step: "0.01", min: 0 }} disabled={submitting}/>
//               </Grid>

//                <Grid item xs={12} sm={6} md={4}>
//                 <DatePicker
//                   label="Purchase Date"
//                   value={formData.purchase_date}
//                   onChange={(date) => handleDateChange("purchase_date", date)}
//                   maxDate={new Date()}
//                   format="dd-MM-yyyy"
//                   sx={{ width: '100%' }} // <-- FIX APPLIED HERE
//                   renderInput={(params) => <TextField {...params} fullWidth required />}
//                   disabled={submitting}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6} md={4}>
//                 <DatePicker
//                   label="Warranty End Date"
//                   value={formData.warranty_end_date}
//                   onChange={(date) => handleDateChange("warranty_end_date", date)}
//                   minDate={getMinWarrantyDate()}
//                   format="dd-MM-yyyy"
//                   sx={{ width: '100%' }} // <-- FIX APPLIED HERE
//                   renderInput={(params) => <TextField {...params} fullWidth />}
//                   disabled={!formData.purchase_date || submitting}
//                 />
//               </Grid>
              
            

//               <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
//                 <Button type="submit" variant="contained" size="large" sx={{ py: 1.5, px: 4, backgroundColor: THEME_PURPLE, '&:hover': { backgroundColor: THEME_PURPLE_HOVER } }} disabled={submitting}>
//                   {submitting ? <CircularProgress size={24} color="inherit" /> : "Save Asset"}
//                 </Button>
//               </Grid>

//             </Grid>
//           </CardContent>
//         </Box>
//       </Box>
//     </LocalizationProvider>
//   );
// };

// export default NewPurchaseAssets;






// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Grid,
//   TextField,
//   Button,
//   MenuItem,
//   Typography,
//   Toolbar,
//   CardContent,
//   CircularProgress,
// } from "@mui/material";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { format as formatDate } from "date-fns";
// import axios from "axios";
// import Swal from "sweetalert2";

// const THEME_PURPLE = '#8C257C';
// const THEME_ORANGE = '#F58E35';
// const THEME_PURPLE_HOVER = '#701d63';

// const NewPurchaseAssets = () => {
//   const initialFormState = {
//     brand_id: "",
//     category_id: "",
//     product_id: "",
//     manufacturer: "",
//     asset_code: "",
//     serial_number: "",
//     quantity: "",
//     is_working: "true",
//     purchase_date: null,
//     invoice_number: "",
//     warranty_end_date: null,
//     price: "",
//   };

//   const [formData, setFormData] = useState(initialFormState);
//   const [brands, setBrands] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState({ brands: false, categories: false, products: false });
//   const [submitting, setSubmitting] = useState(false);

//   const fetchGenericData = async (url, setData, field) => {
//     setLoading(prev => ({ ...prev, [field]: true }));
//     try {
//       const res = await axios.get(url);
//       setData(res.data);
//     } catch (error) {
//       console.error(`Error fetching ${field}:`, error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: `Failed to load ${field}. Please try again.`,
//       });
//     } finally {
//       setLoading(prev => ({ ...prev, [field]: false }));
//     }
//   };

//   const fetchProducts = async () => {
//     setLoading(prev => ({ ...prev, products: true }));
//     try {
//       const res = await axios.get("https://tdtlworld.com/hrms-backend/apis/create_edit_product/");
//       const formattedProducts = res.data.map(product => ({
//         value: product.constants_id,
//         label: product.category_name,
//       }));
//       setProducts(formattedProducts);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to load products. Please try again.",
//       });
//     } finally {
//       setLoading(prev => ({ ...prev, products: false }));
//     }
//   };

//   useEffect(() => {
//     fetchGenericData("https://tdtlworld.com/hrms-backend/api/assets-brand/", setBrands, 'brands');
//     fetchGenericData("https://tdtlworld.com/hrms-backend/api/assets-category/", setCategories, 'categories');
//     fetchProducts();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "manufacturer") {
//       if (/^[a-zA-Z\s]*$/.test(value)) {
//         setFormData((prev) => ({ ...prev, [name]: value }));
//       }
//     } else if (name === "asset_code" || name === "serial_number" || name === "invoice_number") {
//       if (/^[0-9]*$/.test(value)) {
//         setFormData((prev) => ({ ...prev, [name]: value }));
//       }
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleDateChange = (name, date) => {
//     setFormData((prev) => ({ ...prev, [name]: date }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);

//     const dataToSend = {
//       brand_id: Number(formData.brand_id) || null,
//       category_id: Number(formData.category_id) || null,
//       product_id: Number(formData.product_id) || null,
//       quantity: Number(formData.quantity) || null,
//       price: Number(formData.price) || null,
//       invoice_number: formData.invoice_number,
//       purchase_date: formData.purchase_date
//         ? formatDate(formData.purchase_date, "yyyy-MM-dd")
//         : null,
//       warranty_end_date: formData.warranty_end_date
//         ? formatDate(formData.warranty_end_date, "yyyy-MM-dd")
//         : null
//     };

//     console.log("Payload to API:", dataToSend);

//     try {
//       const response = await axios.post(
//         "https://tdtlworld.com/hrms-backend/apis/add_new_asset_to_stock/",
//         dataToSend
//       );

//       Swal.fire({
//         icon: "success",
//         title: "Success!",
//         text: response.data.message || "Asset stock added successfully!",
//       }).then(() => {
//         setFormData(initialFormState);
//       });
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       const errorMessage =
//         error.response?.data?.message ||
//         "There was an error saving the asset. Please try again.";

//       Swal.fire({
//         icon: "error",
//         title: "Submission Failed",
//         text: errorMessage,
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const getMinWarrantyDate = () => {
//     if (!formData.purchase_date) return null;
//     const nextDay = new Date(formData.purchase_date);
//     nextDay.setDate(nextDay.getDate() + 1);
//     return nextDay;
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Box sx={{ flexGrow: 1 }}>
//         <Toolbar>
//           <Typography variant="h4" fontWeight="bold" component="div" sx={{color:"#8C257C", flexGrow: 1}} >
//             New Asset Purchase
//           </Typography>
//         </Toolbar>

//         <Box component="form" onSubmit={handleSubmit} sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
//           <CardContent>
//             <Grid container spacing={3}>

//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField select fullWidth required label="Category" name="category_id" value={formData.category_id} onChange={handleChange} disabled={loading.categories || submitting}>
//                   {loading.categories ? <MenuItem disabled>Loading...</MenuItem> : categories.map((cat) => (<MenuItem key={cat.value} value={cat.value}>{cat.label}</MenuItem>))}
//                 </TextField>
//               </Grid>

//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField select fullWidth required label="Brand" name="brand_id" value={formData.brand_id} onChange={handleChange} disabled={loading.brands || submitting}>
//                   {loading.brands ? <MenuItem disabled>Loading...</MenuItem> : brands.map((brand) => (<MenuItem key={brand.value} value={brand.value}>{brand.label}</MenuItem>))}
//                 </TextField>
//               </Grid>

//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField select fullWidth required label="Asset Product Name" name="product_id" value={formData.product_id} onChange={handleChange} disabled={loading.products || submitting}>
//                   {loading.products ? <MenuItem disabled>Loading...</MenuItem> : products.map((product) => (<MenuItem key={product.value} value={product.value}>{product.label}</MenuItem>))}
//                 </TextField>
//               </Grid>

//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField fullWidth label="Manufacturer" name="manufacturer" value={formData.manufacturer} onChange={handleChange} disabled={submitting} />
//               </Grid>

//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField fullWidth required label="Asset Code" name="asset_code" value={formData.asset_code} onChange={handleChange} disabled={submitting} />
//               </Grid>

//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField fullWidth required label="Serial Number" name="serial_number" value={formData.serial_number} onChange={handleChange} disabled={submitting} />
//               </Grid>
             
//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField fullWidth required type="number" label="Quantity" name="quantity" value={formData.quantity} onChange={handleChange} inputProps={{ min: 1 }} disabled={submitting}/>
//               </Grid>
             
//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField fullWidth required label="Invoice Number" name="invoice_number" value={formData.invoice_number} onChange={handleChange} disabled={submitting} />
//               </Grid>

//               <Grid item xs={12} sm={6} md={4}>
//                 <TextField fullWidth required type="number" label="Price per unit" name="price" value={formData.price} onChange={handleChange} inputProps={{ step: "0.01", min: 0 }} disabled={submitting}/>
//               </Grid>

//                <Grid item xs={12} sm={6} md={4}>
//                 <DatePicker
//                   label="Purchase Date"
//                   value={formData.purchase_date}
//                   onChange={(date) => handleDateChange("purchase_date", date)}
//                   maxDate={new Date()}
//                   format="dd-MM-yyyy"
//                   sx={{ width: '100%' }}
//                   renderInput={(params) => <TextField {...params} fullWidth required />}
//                   disabled={submitting}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6} md={4}>
//                 <DatePicker
//                   label="Warranty End Date"
//                   value={formData.warranty_end_date}
//                   onChange={(date) => handleDateChange("warranty_end_date", date)}
//                   minDate={getMinWarrantyDate()}
//                   format="dd-MM-yyyy"
//                   sx={{ width: '100%' }}
//                   renderInput={(params) => <TextField {...params} fullWidth />}
//                   disabled={!formData.purchase_date || submitting}
//                 />
//               </Grid>

//               <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
//                 <Button type="submit" variant="contained" size="large" sx={{ py: 1.5, px: 4, backgroundColor: THEME_PURPLE, '&:hover': { backgroundColor: THEME_PURPLE_HOVER } }} disabled={submitting}>
//                   {submitting ? <CircularProgress size={24} color="inherit" /> : "Save Asset"}
//                 </Button>
//               </Grid>

//             </Grid>
//           </CardContent>
//         </Box>
//       </Box>
//     </LocalizationProvider>
//   );
// };

// export default NewPurchaseAssets;








// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Grid,
//   TextField,
//   Button,
//   MenuItem,
//   Typography,
//   CardContent,
//   CircularProgress,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   Stack,
//   InputAdornment,
//   TablePagination,
//   Skeleton,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { format as formatDate, parseISO } from "date-fns";
// import axios from "axios";
// import Swal from "sweetalert2";

// // Icon Imports
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import Add from "@mui/icons-material/Add";
// import SearchIcon from '@mui/icons-material/Search';

// // Theme Constants
// const THEME_PURPLE = '#8C257C';
// const THEME_PURPLE_HOVER = '#6d1d60';

// const NewPurchaseAssets = () => {
//   const initialFormState = {
//     brand_id: "",
//     category_id: "",
//     product_id: "",
//     manufacturer: "",
//     asset_code: "",
//     serial_number: "",
//     quantity: "",
//     purchase_date: null,
//     invoice_number: "",
//     warranty_end_date: null,
//     price: "",
//   };

//   // --- COMPONENT STATE ---
//   const [formData, setFormData] = useState(initialFormState);
//   const [brands, setBrands] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [dropdownLoading, setDropdownLoading] = useState({ brands: false, categories: false, products: false });
//   const [submitting, setSubmitting] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [assetList, setAssetList] = useState([]);
//   const [loading, setLoading] = useState(true); // Main loading state for table skeletons
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   // --- RESPONSIVENESS ---
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   // --- DATA FETCHING ---
//   const fetchGenericData = async (url, setData, field) => {
//     setDropdownLoading(prev => ({ ...prev, [field]: true }));
//     try {
//       const res = await axios.get(url);
//       setData(res.data);
//     } catch (error) {
//       console.error(`Error fetching ${field}:`, error);
//     } finally {
//       setDropdownLoading(prev => ({ ...prev, [field]: false }));
//     }
//   };

//   const fetchProducts = async () => {
//     setDropdownLoading(prev => ({ ...prev, products: true }));
//     try {
//       const res = await axios.get("https://tdtlworld.com/hrms-backend/apis/create_edit_product/");
//       const formattedProducts = res.data.map(product => ({
//         value: product.constants_id,
//         label: product.category_name,
//       }));
//       setProducts(formattedProducts);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       setDropdownLoading(prev => ({ ...prev, products: false }));
//     }
//   };

//   const fetchAssetList = async () => {
//     setLoading(true);
//     try {
//         const res = await axios.get("https://tdtlworld.com/hrms-backend/apis/get_assets_instock_data/");
//         if (res.data && res.data.status === "success") {
//             setAssetList(res.data.data || []); 
//         } else {
//             setAssetList([]);
//             throw new Error(res.data.message || "Failed to fetch asset data.");
//         }
//     } catch (error) {
//         console.error("Error fetching asset list:", error);
//         Swal.fire({
//             icon: "error",
//             title: "Loading Failed",
//             text: "Failed to load the asset list. Please try again.",
//             timer: 3000,
//             showConfirmButton: false,
//         });
//     } finally {
//         setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchGenericData("https://tdtlworld.com/hrms-backend/api/assets-brand/", setBrands, 'brands');
//     fetchGenericData("https://tdtlworld.com/hrms-backend/api/assets-category/", setCategories, 'categories');
//     fetchProducts();
//     fetchAssetList(); 
//   }, []);

//   // --- EVENT HANDLERS ---
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => {
//     if (submitting) return;
//     setOpen(false);
//     setFormData(initialFormState);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleDateChange = (name, date) => {
//     setFormData((prev) => ({ ...prev, [name]: date }));
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     const dataToSend = {
//       brand_id: Number(formData.brand_id) || null,
//       category_id: Number(formData.category_id) || null,
//       product_id: Number(formData.product_id) || null,
//       quantity: Number(formData.quantity) || null,
//       price: Number(formData.price) || null,
//       invoice_number: formData.invoice_number,
//       purchase_date: formData.purchase_date ? formatDate(formData.purchase_date, "yyyy-MM-dd") : null,
//       warranty_end_date: formData.warranty_end_date ? formatDate(formData.warranty_end_date, "yyyy-MM-dd") : null
//     };
//     try {
//       const response = await axios.post( "https://tdtlworld.com/hrms-backend/apis/add_new_asset_to_stock/", dataToSend );
//       Swal.fire({
//         icon: "success",
//         title: "Success!",
//         text: response.data.message || "Asset stock added successfully!",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//       handleClose();
//       fetchAssetList();
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       const errorMessage = error.response?.data?.message || "There was an error saving the asset.";
//       Swal.fire({ icon: "error", title: "Submission Failed", text: errorMessage, timer: 3000, showConfirmButton: false });
//     } finally {
//       setSubmitting(false);
//     }
//   };
  
//   const handleViewDetails = (asset) => {
//     const formattedPurchaseDate = asset.purchase_date ? formatDate(parseISO(asset.purchase_date), "dd/MM/yyyy") : 'N/A';
//     const formattedWarrantyDate = asset.warranty_end_date ? formatDate(parseISO(asset.warranty_end_date), "dd/MM/yyyy") : 'N/A';
//     const formattedCreatedDate = asset.created_date ? formatDate(parseISO(asset.created_date), "dd/MM/yyyy") : 'N/A';
//     Swal.fire({
//       title: '<strong>Asset Stock Details</strong>', icon: 'info',
//       html: `
//         <div style="text-align: left; padding-left: 20px;">
//           <p><strong>Product:</strong> ${asset.product || 'N/A'}</p>
//           <p><strong>Brand:</strong> ${asset.brand || 'N/A'}</p>
//           <p><strong>Category:</strong> ${asset.category || 'N/A'}</p><hr/>
//           <p><strong>Quantity in Stock:</strong> ${asset.quantity || '0'}</p>
//           <p><strong>Price per Unit:</strong> ₹${asset.price || '0.00'}</p>
//           <p><strong>Invoice Number:</strong> ${asset.invoice_number || 'N/A'}</p>
//           <p><strong>Purchase Date:</strong> ${formattedPurchaseDate}</p>
//           <p><strong>Warranty End Date:</strong> ${formattedWarrantyDate}</p>
//           <p><strong>Entry Created On:</strong> ${formattedCreatedDate}</p>
//         </div>`,
//       showCloseButton: true, focusConfirm: false, confirmButtonText: 'Close',
//     });
//   };

//   // --- DERIVED STATE & HELPERS ---
//   const filteredAssets = React.useMemo(() => 
//     assetList.filter(asset => 
//       (asset.product?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
//       (asset.brand?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
//       (asset.category?.toLowerCase() || '').includes(searchTerm.toLowerCase())
//     ), [assetList, searchTerm]);

//   const paginatedAssets = filteredAssets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  
//   const getMinWarrantyDate = () => {
//     if (!formData.purchase_date) return null;
//     const nextDay = new Date(formData.purchase_date);
//     nextDay.setDate(nextDay.getDate() + 1);
//     return nextDay;
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Box component={Paper} p={3}>
//         <Typography variant="h5" sx={{ color: THEME_PURPLE, fontWeight: 'bold', mb: 2 }}>
//           Manage Asset Stock
//         </Typography>

//         <Stack
//           direction={isMobile ? 'column' : 'row'}
//           justifyContent="space-between"
//           alignItems={isMobile ? 'stretch' : 'center'}
//           spacing={2}
//           sx={{ mb: 2 }}
//         >
//           <Button
//             variant="contained"
//             startIcon={<Add />}
//             onClick={handleOpen}
//             sx={{
//               backgroundColor: THEME_PURPLE,
//               color: 'white',
//               '&:hover': { backgroundColor: THEME_PURPLE_HOVER },
//             }}
//           >
//             Add New Purchase
//           </Button>
//           <TextField
//             size="small"
//             placeholder="Search by Product, Brand, Category..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{ width: isMobile ? '100%' : 'auto' }}
//           />
//         </Stack>
        
//         <TableContainer>
//           <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//             <TableHead sx={{ backgroundColor: THEME_PURPLE }}>
//               <TableRow>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Sr No.</TableCell>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Category</TableCell>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Brand</TableCell>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Product</TableCell>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Created Date</TableCell>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 Array.from(new Array(rowsPerPage)).map((_, index) => (
//                   <TableRow key={index}>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell align="center">
//                       <Skeleton variant="rectangular" width={40} height={30} sx={{ margin: 'auto' }} />
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : paginatedAssets.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={6} align="center">No assets found.</TableCell>
//                 </TableRow>
//               ) : (
//                 paginatedAssets.map((asset, index) => (
//                   <TableRow key={asset.instock_id} sx={{ '&:hover': { backgroundColor: 'action.hover' } }}>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>{asset.category}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>{asset.brand}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>{asset.product}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>
//                       {asset.created_date ? formatDate(parseISO(asset.created_date), 'dd/MM/yyyy') : 'N/A'}
//                     </TableCell>
//                     <TableCell>
//                       <Box display="flex" justifyContent="center" gap={0.5}>
//                         <IconButton color="primary" onClick={() => handleViewDetails(asset)} sx={{ color: THEME_PURPLE }}>
//                           <VisibilityIcon />
//                         </IconButton>
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <Box
//             component="footer"
//             sx={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 flexWrap: 'wrap',
//                 p: 2,
//                 gap: 2
//             }}
//         >
//             <Typography variant="body2" color="text.secondary">
//                 Showing {paginatedAssets.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredAssets.length)} of {filteredAssets.length} results
//             </Typography>
//             <TablePagination
//                 component="div"
//                 count={filteredAssets.length}
//                 page={page}
//                 onPageChange={handleChangePage}
//                 rowsPerPage={rowsPerPage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//                 rowsPerPageOptions={[5, 10, 15, 25]}
//                 sx={{
//                     '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
//                         color: 'text.secondary',
//                     },
//                     '& .MuiSvgIcon-root': {
//                         color: THEME_PURPLE,
//                     },
//                 }}
//             />
//         </Box>

//         <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
//           <DialogTitle sx={{ color: THEME_PURPLE, fontWeight: 'bold' }}>
//             New Asset Purchase
//           </DialogTitle>
//           <Box component="form" onSubmit={handleSubmit}>
//             <DialogContent>
//               <CardContent>
//                 <Grid container spacing={3} sx={{ mt: 1 }}>
//                   <Grid item xs={12} sm={6} md={4}> <TextField select fullWidth required label="Category" name="category_id" value={formData.category_id} onChange={handleChange} disabled={dropdownLoading.categories || submitting}> {dropdownLoading.categories ? <MenuItem disabled>Loading...</MenuItem> : categories.map((cat) => (<MenuItem key={cat.value} value={cat.value}>{cat.label}</MenuItem>))} </TextField> </Grid>
//                   <Grid item xs={12} sm={6} md={4}> <TextField select fullWidth required label="Brand" name="brand_id" value={formData.brand_id} onChange={handleChange} disabled={dropdownLoading.brands || submitting}> {dropdownLoading.brands ? <MenuItem disabled>Loading...</MenuItem> : brands.map((brand) => (<MenuItem key={brand.value} value={brand.value}>{brand.label}</MenuItem>))} </TextField> </Grid>
//                   <Grid item xs={12} sm={6} md={4}> <TextField select fullWidth required label="Asset Product Name" name="product_id" value={formData.product_id} onChange={handleChange} disabled={dropdownLoading.products || submitting}> {dropdownLoading.products ? <MenuItem disabled>Loading...</MenuItem> : products.map((product) => (<MenuItem key={product.value} value={product.value}>{product.label}</MenuItem>))} </TextField> </Grid>
//                   <Grid item xs={12} sm={6} md={4}> <TextField fullWidth label="Manufacturer" name="manufacturer" value={formData.manufacturer} onChange={handleChange} disabled={submitting} /> </Grid>
//                   <Grid item xs={12} sm={6} md={4}> <TextField fullWidth required label="Asset Code" name="asset_code" value={formData.asset_code} onChange={handleChange} disabled={submitting} /> </Grid>
//                   <Grid item xs={12} sm={6} md={4}> <TextField fullWidth required label="Serial Number" name="serial_number" value={formData.serial_number} onChange={handleChange} disabled={submitting} /> </Grid>
//                   <Grid item xs={12} sm={6} md={4}> <TextField fullWidth required type="number" label="Quantity" name="quantity" value={formData.quantity} onChange={handleChange} inputProps={{ min: 1 }} disabled={submitting}/> </Grid>
//                   <Grid item xs={12} sm={6} md={4}> <TextField fullWidth required label="Invoice Number" name="invoice_number" value={formData.invoice_number} onChange={handleChange} disabled={submitting} /> </Grid>
//                   <Grid item xs={12} sm={6} md={4}> <TextField fullWidth required type="number" label="Price per unit" name="price" value={formData.price} onChange={handleChange} inputProps={{ step: "0.01", min: 0 }} disabled={submitting}/> </Grid>
//                   <Grid item xs={12} sm={6} md={4}> <DatePicker label="Purchase Date" value={formData.purchase_date} onChange={(date) => handleDateChange("purchase_date", date)} maxDate={new Date()} format="dd/MM/yyyy" sx={{ width: '100%' }} renderInput={(params) => <TextField {...params} fullWidth required />} disabled={submitting}/> </Grid>
//                   <Grid item xs={12} sm={6} md={4}> <DatePicker label="Warranty End Date" value={formData.warranty_end_date} onChange={(date) => handleDateChange("warranty_end_date", date)} minDate={getMinWarrantyDate()} format="dd/MM/yyyy" sx={{ width: '100%' }} renderInput={(params) => <TextField {...params} fullWidth />} disabled={!formData.purchase_date || submitting}/> </Grid>
//                 </Grid>
//               </CardContent>
//             </DialogContent>
//             <DialogActions sx={{ p: '16px 24px' }}>
//               <Button onClick={handleClose} disabled={submitting} sx={{ color: '#757575', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}>Cancel</Button>
//               <Button type="submit" variant="contained" sx={{ backgroundColor: THEME_PURPLE, '&:hover': { backgroundColor: THEME_PURPLE_HOVER } }} disabled={submitting}>
//                 {submitting ? <CircularProgress size={24} color="inherit" /> : "Save Asset"}
//               </Button>
//             </DialogActions>
//           </Box>
//         </Dialog>
//       </Box>
//     </LocalizationProvider>
//   );
// };

// export default NewPurchaseAssets;








// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Grid,
//   TextField,
//   Button,
//   MenuItem,
//   Typography,
//   CardContent,
//   CircularProgress,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   Stack,
//   InputAdornment,
//   Skeleton,
//   useTheme,
//   useMediaQuery,
//   FormControl,
//   Select,
//   Pagination,
// } from "@mui/material";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { format as formatDate, parseISO } from "date-fns";
// import axios from "axios";
// import Swal from "sweetalert2";

// // Icon Imports
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import Add from "@mui/icons-material/Add";
// import SearchIcon from '@mui/icons-material/Search';

// // Theme Constants
// const THEME_PURPLE = '#8C257C';
// const THEME_PURPLE_HOVER = '#6d1d60';
// const THEME_ORANGE = '#F58E35';

// const NewPurchaseAssets = () => {
//   const initialFormState = {
//     brand_id: "",
//     category_id: "",
//     product_id: "",
//     manufacturer: "",
//     asset_code: "",
//     serial_number: "",
//     quantity: "",
//     purchase_date: null,
//     invoice_number: "",
//     warranty_end_date: null,
//     price: "",
//   };

//   // --- COMPONENT STATE ---
//   const [formData, setFormData] = useState(initialFormState);
//   const [brands, setBrands] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [dropdownLoading, setDropdownLoading] = useState({ brands: false, categories: false, products: false });
//   const [submitting, setSubmitting] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [assetList, setAssetList] = useState([]);
//   const [loading, setLoading] = useState(true); // Main loading state for table skeletons
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   // --- RESPONSIVENESS ---
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   // --- DATA FETCHING ---
//   const fetchGenericData = async (url, setData, field) => {
//     setDropdownLoading(prev => ({ ...prev, [field]: true }));
//     try {
//       const res = await axios.get(url);
//       setData(res.data);
//     } catch (error) {
//       console.error(`Error fetching ${field}:`, error);
//     } finally {
//       setDropdownLoading(prev => ({ ...prev, [field]: false }));
//     }
//   };

//   const fetchProducts = async () => {
//     setDropdownLoading(prev => ({ ...prev, products: true }));
//     try {
//       const res = await axios.get("https://tdtlworld.com/hrms-backend/apis/create_edit_product/");
//       const formattedProducts = res.data.map(product => ({
//         value: product.constants_id,
//         label: product.category_name,
//       }));
//       setProducts(formattedProducts);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       setDropdownLoading(prev => ({ ...prev, products: false }));
//     }
//   };

//   const fetchAssetList = async () => {
//     setLoading(true);
//     try {
//         const res = await axios.get("https://tdtlworld.com/hrms-backend/apis/get_assets_instock_data/");
//         if (res.data && res.data.status === "success") {
//             setAssetList(res.data.data || []); 
//         } else {
//             setAssetList([]);
//             throw new Error(res.data.message || "Failed to fetch asset data.");
//         }
//     } catch (error) {
//         console.error("Error fetching asset list:", error);
//         Swal.fire({
//             icon: "error",
//             title: "Loading Failed",
//             text: "Failed to load the asset list. Please try again.",
//             timer: 3000,
//             showConfirmButton: false,
//         });
//     } finally {
//         setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchGenericData("https://tdtlworld.com/hrms-backend/api/assets-brand/", setBrands, 'brands');
//     fetchGenericData("https://tdtlworld.com/hrms-backend/api/assets-category/", setCategories, 'categories');
//     fetchProducts();
//     fetchAssetList(); 
//   }, []);

//   // --- EVENT HANDLERS ---
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => {
//     if (submitting) return;
//     setOpen(false);
//     setFormData(initialFormState);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleDateChange = (name, date) => {
//     setFormData((prev) => ({ ...prev, [name]: date }));
//   };

//   const handlePaginationChange = (event, newPage) => {
//     setPage(newPage - 1);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     const dataToSend = {
//       brand_id: Number(formData.brand_id) || null,
//       category_id: Number(formData.category_id) || null,
//       product_id: Number(formData.product_id) || null,
//       quantity: Number(formData.quantity) || null,
//       price: Number(formData.price) || null,
//       invoice_number: formData.invoice_number,
//       purchase_date: formData.purchase_date ? formatDate(formData.purchase_date, "yyyy-MM-dd") : null,
//       warranty_end_date: formData.warranty_end_date ? formatDate(formData.warranty_end_date, "yyyy-MM-dd") : null
//     };
//     try {
//       const response = await axios.post( "https://tdtlworld.com/hrms-backend/apis/add_new_asset_to_stock/", dataToSend );
//       Swal.fire({
//         icon: "success",
//         title: "Success!",
//         text: response.data.message || "Asset stock added successfully!",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//       handleClose();
//       fetchAssetList();
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       const errorMessage = error.response?.data?.message || "There was an error saving the asset.";
//       Swal.fire({ icon: "error", title: "Submission Failed", text: errorMessage, timer: 3000, showConfirmButton: false });
//     } finally {
//       setSubmitting(false);
//     }
//   };
  
//   const handleViewDetails = (asset) => {
//     const formattedPurchaseDate = asset.purchase_date ? formatDate(parseISO(asset.purchase_date), "dd/MM/yyyy") : 'N/A';
//     const formattedWarrantyDate = asset.warranty_end_date ? formatDate(parseISO(asset.warranty_end_date), "dd/MM/yyyy") : 'N/A';
//     const formattedCreatedDate = asset.created_date ? formatDate(parseISO(asset.created_date), "dd/MM/yyyy") : 'N/A';
//     Swal.fire({
//       title: '<strong>Asset Stock Details</strong>', icon: 'info',
//       html: `
//         <div style="text-align: left; padding-left: 20px;">
//           <p><strong>Product:</strong> ${asset.product || 'N/A'}</p>
//           <p><strong>Brand:</strong> ${asset.brand || 'N/A'}</p>
//           <p><strong>Category:</strong> ${asset.category || 'N/A'}</p><hr/>
//           <p><strong>Quantity in Stock:</strong> ${asset.quantity || '0'}</p>
//           <p><strong>Price per Unit:</strong> ₹${asset.price || '0.00'}</p>
//           <p><strong>Invoice Number:</strong> ${asset.invoice_number || 'N/A'}</p>
//           <p><strong>Purchase Date:</strong> ${formattedPurchaseDate}</p>
//           <p><strong>Warranty End Date:</strong> ${formattedWarrantyDate}</p>
//           <p><strong>Entry Created On:</strong> ${formattedCreatedDate}</p>
//         </div>`,
//       showCloseButton: true, focusConfirm: false, confirmButtonText: 'Close',
//     });
//   };

//   // --- DERIVED STATE & HELPERS ---
//   const filteredAssets = React.useMemo(() => 
//     assetList.filter(asset => 
//       (asset.product?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
//       (asset.brand?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
//       (asset.category?.toLowerCase() || '').includes(searchTerm.toLowerCase())
//     ), [assetList, searchTerm]);

//   const paginatedAssets = filteredAssets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  
//   const startEntry = filteredAssets.length > 0 ? page * rowsPerPage + 1 : 0;
//   const endEntry = Math.min((page + 1) * rowsPerPage, filteredAssets.length);

//   const getMinWarrantyDate = () => {
//     if (!formData.purchase_date) return null;
//     const nextDay = new Date(formData.purchase_date);
//     nextDay.setDate(nextDay.getDate() + 1);
//     return nextDay;
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Box component={Paper} p={3}>
//         <Typography variant="h5" sx={{ color: THEME_PURPLE, fontWeight: 'bold', mb: 2 }}>
//           Manage Asset Stock
//         </Typography>

//         <Stack
//           direction={isMobile ? 'column' : 'row'}
//           justifyContent="space-between"
//           alignItems={isMobile ? 'stretch' : 'center'}
//           spacing={2}
//           sx={{ mb: 2 }}
//         >
//           <Button
//             variant="contained"
//             startIcon={<Add />}
//             onClick={handleOpen}
//             sx={{
//               backgroundColor: THEME_PURPLE,
//               color: 'white',
//               '&:hover': { backgroundColor: THEME_PURPLE_HOVER },
//             }}
//           >
//             Add New Purchase
//           </Button>
//           <TextField
//             size="small"
//             placeholder="Search by Product, Brand, Category..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{ width: isMobile ? '100%' : 'auto' }}
//           />
//         </Stack>
        
//         <TableContainer>
//           <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//             <TableHead sx={{ backgroundColor: THEME_PURPLE }}>
//               <TableRow>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Sr No.</TableCell>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Category</TableCell>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Brand</TableCell>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Product</TableCell>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Created Date</TableCell>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 Array.from(new Array(rowsPerPage)).map((_, index) => (
//                   <TableRow key={index}>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell align="center">
//                       <Skeleton variant="rectangular" width={40} height={30} sx={{ margin: 'auto' }} />
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : paginatedAssets.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={6} align="center">No assets found.</TableCell>
//                 </TableRow>
//               ) : (
//                 paginatedAssets.map((asset, index) => (
//                   <TableRow key={asset.instock_id} sx={{ '&:hover': { backgroundColor: 'action.hover' } }}>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>{asset.category}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>{asset.brand}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>{asset.product}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>
//                       {asset.created_date ? formatDate(parseISO(asset.created_date), 'dd/MM/yyyy') : 'N/A'}
//                     </TableCell>
//                     <TableCell>
//                       <Box display="flex" justifyContent="center" gap={0.5}>
//                         <IconButton color="primary" onClick={() => handleViewDetails(asset)} sx={{ color: THEME_PURPLE }}>
//                           <VisibilityIcon />
//                         </IconButton>
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
//             {filteredAssets.length > 0 && (
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                         <FormControl variant="outlined" size="small">
//                             <Select
//                                 value={rowsPerPage}
//                                 onChange={handleChangeRowsPerPage}
//                                 sx={{
//                                     backgroundColor: THEME_PURPLE,
//                                     color: 'white',
//                                     borderRadius: '4px',
//                                     '&:hover': { backgroundColor: THEME_PURPLE_HOVER },
//                                     '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
//                                     '& .MuiSvgIcon-root': { color: 'white' },
//                                 }}
//                             >
//                                 {[5, 10, 15, 25].map((value) => ( <MenuItem key={value} value={value}>{value}</MenuItem> ))}
//                             </Select>
//                         </FormControl>
//                         <Typography variant="body2" color="text.secondary">
//                           {`Showing ${startEntry} to ${endEntry} of ${filteredAssets.length} results`}
//                         </Typography>
//                     </Box>
//                     <Pagination
//                         count={Math.ceil(filteredAssets.length / rowsPerPage)}
//                         page={page + 1}
//                         onChange={handlePaginationChange}
//                         showFirstButton showLastButton
//                         sx={{
//                             '& .MuiPaginationItem-root:hover': { backgroundColor: THEME_ORANGE, color: 'white' },
//                             '& .MuiPaginationItem-page': {
//                                 color: THEME_PURPLE,
//                                 '&.Mui-selected': {
//                                     backgroundColor: THEME_PURPLE,
//                                     color: 'white',
//                                     '&:hover': { backgroundColor: THEME_ORANGE }
//                                 },
//                             },
//                             '& .MuiPaginationItem-icon': { color: THEME_PURPLE }
//                         }}
//                     />
//                 </Box>
//             )}
//         </Box>

//         <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
//           <DialogTitle sx={{ color: THEME_PURPLE, fontWeight: 'bold' }}>
//             New Asset Purchase
//           </DialogTitle>
//           <Box component="form" onSubmit={handleSubmit}>
//             <DialogContent>
//               <CardContent>
//                 <Grid container spacing={3} sx={{ mt: 1 }}>
//                   <Grid item xs={12} sm={6} md={4}> <TextField select fullWidth required label="Category" name="category_id" value={formData.category_id} onChange={handleChange} disabled={dropdownLoading.categories || submitting}> {dropdownLoading.categories ? <MenuItem disabled>Loading...</MenuItem> : categories.map((cat) => (<MenuItem key={cat.value} value={cat.value}>{cat.label}</MenuItem>))} </TextField> </Grid>
//                   <Grid item xs={12} sm={6} md={4}> <TextField select fullWidth required label="Brand" name="brand_id" value={formData.brand_id} onChange={handleChange} disabled={dropdownLoading.brands || submitting}> {dropdownLoading.brands ? <MenuItem disabled>Loading...</MenuItem> : brands.map((brand) => (<MenuItem key={brand.value} value={brand.value}>{brand.label}</MenuItem>))} </TextField> </Grid>
//                   <Grid item xs={12} sm={6} md={4}> <TextField select fullWidth required label="Asset Product Name" name="product_id" value={formData.product_id} onChange={handleChange} disabled={dropdownLoading.products || submitting}> {dropdownLoading.products ? <MenuItem disabled>Loading...</MenuItem> : products.map((product) => (<MenuItem key={product.value} value={product.value}>{product.label}</MenuItem>))} </TextField> </Grid>
//                   <Grid item xs={12} sm={6} md={4}> <TextField fullWidth label="Manufacturer" name="manufacturer" value={formData.manufacturer} onChange={handleChange} disabled={submitting} /> </Grid>
//                   <Grid item xs={12} sm={6} md={4}> <TextField fullWidth required label="Asset Code" name="asset_code" value={formData.asset_code} onChange={handleChange} disabled={submitting} /> </Grid>
//                   <Grid item xs={12} sm={6} md={4}> <TextField fullWidth required label="Serial Number" name="serial_number" value={formData.serial_number} onChange={handleChange} disabled={submitting} /> </Grid>
//                   <Grid item xs={12} sm={6} md={4}> <TextField fullWidth required type="number" label="Quantity" name="quantity" value={formData.quantity} onChange={handleChange} inputProps={{ min: 1 }} disabled={submitting}/> </Grid>
//                   <Grid item xs={12} sm={6} md={4}> <TextField fullWidth required label="Invoice Number" name="invoice_number" value={formData.invoice_number} onChange={handleChange} disabled={submitting} /> </Grid>
//                   <Grid item xs={12} sm={6} md={4}> <TextField fullWidth required type="number" label="Price per unit" name="price" value={formData.price} onChange={handleChange} inputProps={{ step: "0.01", min: 0 }} disabled={submitting}/> </Grid>
//                   <Grid item xs={12} sm={6} md={4}> <DatePicker label="Purchase Date" value={formData.purchase_date} onChange={(date) => handleDateChange("purchase_date", date)} maxDate={new Date()} format="dd/MM/yyyy" sx={{ width: '100%' }} renderInput={(params) => <TextField {...params} fullWidth required />} disabled={submitting}/> </Grid>
//                   <Grid item xs={12} sm={6} md={4}> <DatePicker label="Warranty End Date" value={formData.warranty_end_date} onChange={(date) => handleDateChange("warranty_end_date", date)} minDate={getMinWarrantyDate()} format="dd/MM/yyyy" sx={{ width: '100%' }} renderInput={(params) => <TextField {...params} fullWidth />} disabled={!formData.purchase_date || submitting}/> </Grid>
//                 </Grid>
//               </CardContent>
//             </DialogContent>
//             <DialogActions sx={{ p: '16px 24px' }}>
//               <Button onClick={handleClose} disabled={submitting} sx={{ color: '#757575', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}>Cancel</Button>
//               <Button type="submit" variant="contained" sx={{ backgroundColor: THEME_PURPLE, '&:hover': { backgroundColor: THEME_PURPLE_HOVER } }} disabled={submitting}>
//                 {submitting ? <CircularProgress size={24} color="inherit" /> : "Save Asset"}
//               </Button>
//             </DialogActions>
//           </Box>
//         </Dialog>
//       </Box>
//     </LocalizationProvider>
//   );
// };

// export default NewPurchaseAssets;












// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Grid,
//   TextField,
//   Button,
//   MenuItem,
//   Typography,
//   CardContent,
//   CircularProgress,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   Stack,
//   InputAdornment,
//   Skeleton,
//   useTheme,
//   useMediaQuery,
//   FormControl,
//   Select,
//   Pagination,
// } from "@mui/material";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { format as formatDate, parseISO } from "date-fns";
// import axios from "axios";
// import Swal from "sweetalert2";

// // Icon Imports
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import Add from "@mui/icons-material/Add";
// import SearchIcon from '@mui/icons-material/Search';

// // Theme Constants
// const THEME_PURPLE = '#8C257C';
// const THEME_PURPLE_HOVER = '#6d1d60';
// const THEME_ORANGE = '#F58E35';

// const NewPurchaseAssets = () => {
//   const initialFormState = {
//     brand_id: "",
//     category_id: "",
//     product_id: "",
//     manufacturer: "",
//     asset_code: "",
//     serial_number: "",
//     quantity: "",
//     purchase_date: null,
//     invoice_number: "",
//     warranty_end_date: null,
//     price: "",
//   };

//   // --- COMPONENT STATE ---
//   const [formData, setFormData] = useState(initialFormState);
//   const [brands, setBrands] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [dropdownLoading, setDropdownLoading] = useState({ brands: false, categories: false, products: false });
//   const [submitting, setSubmitting] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [assetList, setAssetList] = useState([]);
//   const [loading, setLoading] = useState(true); // Main loading state for table skeletons
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   // --- RESPONSIVENESS ---
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   // --- DATA FETCHING ---
//   const fetchGenericData = async (url, setData, field) => {
//     setDropdownLoading(prev => ({ ...prev, [field]: true }));
//     try {
//       const res = await axios.get(url);
//       setData(res.data);
//     } catch (error) {
//       console.error(`Error fetching ${field}:`, error);
//     } finally {
//       setDropdownLoading(prev => ({ ...prev, [field]: false }));
//     }
//   };

//   const fetchProducts = async () => {
//     setDropdownLoading(prev => ({ ...prev, products: true }));
//     try {
//       const res = await axios.get("https://tdtlworld.com/hrms-backend/apis/create_edit_product/");
//       const formattedProducts = res.data.map(product => ({
//         value: product.constants_id,
//         label: product.category_name,
//       }));
//       setProducts(formattedProducts);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       setDropdownLoading(prev => ({ ...prev, products: false }));
//     }
//   };

//   const fetchAssetList = async () => {
//     setLoading(true);
//     try {
//         const res = await axios.get("https://tdtlworld.com/hrms-backend/apis/get_assets_instock_data/");
//         if (res.data && res.data.status === "success") {
//             setAssetList(res.data.data || []);
//         } else {
//             setAssetList([]);
//             throw new Error(res.data.message || "Failed to fetch asset data.");
//         }
//     } catch (error) {
//         console.error("Error fetching asset list:", error);
//         Swal.fire({
//             icon: "error",
//             title: "Loading Failed",
//             text: "Failed to load the asset list. Please try again.",
//             timer: 3000,
//             showConfirmButton: false,
//         });
//     } finally {
//         setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchGenericData("https://tdtlworld.com/hrms-backend/api/assets-brand/", setBrands, 'brands');
//     fetchGenericData("https://tdtlworld.com/hrms-backend/api/assets-category/", setCategories, 'categories');
//     fetchProducts();
//     fetchAssetList();
//   }, []);

//   // --- EVENT HANDLERS ---
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => {
//     if (submitting) return;
//     setOpen(false);
//     setFormData(initialFormState);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleDateChange = (name, date) => {
//     setFormData((prev) => ({ ...prev, [name]: date }));
//   };

//   const handlePaginationChange = (event, newPage) => {
//     setPage(newPage - 1);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);
//     const dataToSend = {
//       brand_id: Number(formData.brand_id) || null,
//       category_id: Number(formData.category_id) || null,
//       product_id: Number(formData.product_id) || null,
//       quantity: Number(formData.quantity) || null,
//       price: Number(formData.price) || null,
//       invoice_number: formData.invoice_number,
//       purchase_date: formData.purchase_date ? formatDate(formData.purchase_date, "yyyy-MM-dd") : null,
//       warranty_end_date: formData.warranty_end_date ? formatDate(formData.warranty_end_date, "yyyy-MM-dd") : null
//     };
//     try {
//       const response = await axios.post( "https://tdtlworld.com/hrms-backend/apis/add_new_asset_to_stock/", dataToSend );
//       Swal.fire({
//         icon: "success",
//         title: "Success!",
//         text: response.data.message || "Asset stock added successfully!",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//       handleClose();
//       fetchAssetList();
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       const errorMessage = error.response?.data?.message || "There was an error saving the asset.";
//       Swal.fire({ icon: "error", title: "Submission Failed", text: errorMessage, timer: 3000, showConfirmButton: false });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleViewDetails = (asset) => {
//     const formattedPurchaseDate = asset.purchase_date ? formatDate(parseISO(asset.purchase_date), "dd/MM/yyyy") : 'N/A';
//     const formattedWarrantyDate = asset.warranty_end_date ? formatDate(parseISO(asset.warranty_end_date), "dd/MM/yyyy") : 'N/A';
//     const formattedCreatedDate = asset.created_date ? formatDate(parseISO(asset.created_date), "dd/MM/yyyy") : 'N/A';
//     Swal.fire({
//       title: '<strong >Asset Stock Details</strong>',
     
//       position: 'center', // This will center the modal
//       html: `
//         <div style="text-align: left; padding-left: 20px;">
//           <p><strong>Product:</strong> ${asset.product || 'N/A'}</p>
//           <p><strong>Brand:</strong> ${asset.brand || 'N/A'}</p>
//           <p><strong>Category:</strong> ${asset.category || 'N/A'}</p><hr/>
//           <p><strong>Quantity in Stock:</strong> ${asset.quantity || '0'}</p>
//           <p><strong>Price per Unit:</strong> ₹${asset.price || '0.00'}</p>
//           <p><strong>Invoice Number:</strong> ${asset.invoice_number || 'N/A'}</p>
//           <p><strong>Purchase Date:</strong> ${formattedPurchaseDate}</p>
//           <p><strong>Warranty End Date:</strong> ${formattedWarrantyDate}</p>
//           <p><strong>Entry Created On:</strong> ${formattedCreatedDate}</p>
//         </div>`,
//       showCloseButton: true,
//       focusConfirm: false,
//       confirmButtonText: 'Close',
//       confirmButtonColor: THEME_PURPLE, // Apply theme color to the button
//     });
//   };

//   // --- DERIVED STATE & HELPERS ---
//   const filteredAssets = React.useMemo(() =>
//     assetList.filter(asset =>
//       (asset.product?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
//       (asset.brand?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
//       (asset.category?.toLowerCase() || '').includes(searchTerm.toLowerCase())
//     ), [assetList, searchTerm]);

//   const paginatedAssets = filteredAssets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   const startEntry = filteredAssets.length > 0 ? page * rowsPerPage + 1 : 0;
//   const endEntry = Math.min((page + 1) * rowsPerPage, filteredAssets.length);

//   const getMinWarrantyDate = () => {
//     if (!formData.purchase_date) return null;
//     const nextDay = new Date(formData.purchase_date);
//     nextDay.setDate(nextDay.getDate() + 1);
//     return nextDay;
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Box component={Paper} p={3}>
//         <Typography variant="h4" sx={{ color: THEME_PURPLE, fontWeight: 'bold', mb: 5 }}>
//           New Asset Purchase
//         </Typography>

//         <Stack
//           direction={isMobile ? 'column' : 'row'}
//           justifyContent="space-between"
//           alignItems={isMobile ? 'stretch' : 'center'}
//           spacing={2}
//           sx={{ mb: 2 }}
//         >
//           <Button
//             variant="contained"
//             startIcon={<Add />}
//             onClick={handleOpen}
//             sx={{
//               backgroundColor: THEME_PURPLE,
//               color: 'white',
//               '&:hover': { backgroundColor: THEME_PURPLE_HOVER },
//             }}
//           >
//             Add New
//           </Button>
//           <TextField
//             size="small"
//             placeholder="Search by Product, Brand, Category..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{ width: isMobile ? '100%' : 'auto' }}
//           />
//         </Stack>

//         <TableContainer>
//           <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//             <TableHead sx={{ backgroundColor: THEME_PURPLE }}>
//               <TableRow>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>SR. NO.</TableCell>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>CATEGORY</TableCell>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>BRAND</TableCell>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>PRODUCT</TableCell>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>CREATED DATE</TableCell>
//                 <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>ACTION</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 Array.from(new Array(rowsPerPage)).map((_, index) => (
//                   <TableRow key={index}>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell align="center">
//                       <Skeleton variant="rectangular" width={40} height={30} sx={{ margin: 'auto' }} />
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : paginatedAssets.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={6} align="center">No assets found.</TableCell>
//                 </TableRow>
//               ) : (
//                 paginatedAssets.map((asset, index) => (
//                   <TableRow key={asset.instock_id} sx={{ '&:hover': { backgroundColor: 'action.hover' } }}>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>{asset.category}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>{asset.brand}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>{asset.product}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>
//                       {asset.created_date ? formatDate(parseISO(asset.created_date), 'dd/MM/yyyy') : 'N/A'}
//                     </TableCell>
//                     <TableCell>
//                       <Box display="flex" justifyContent="center" gap={0.5}>
//                         <IconButton onClick={() => handleViewDetails(asset)} sx={{ color: THEME_PURPLE }}>
//                           <VisibilityIcon />
//                         </IconButton>
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
//             {filteredAssets.length > 0 && (
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                         <FormControl variant="outlined" size="small">
//                             <Select
//                                 value={rowsPerPage}
//                                 onChange={handleChangeRowsPerPage}
//                                 sx={{
//                                     backgroundColor: THEME_PURPLE,
//                                     color: 'white',
//                                     borderRadius: '4px',
//                                     '&:hover': { backgroundColor: THEME_PURPLE_HOVER },
//                                     '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
//                                     '& .MuiSvgIcon-root': { color: 'white' },
//                                 }}
//                             >
//                                 {[5, 10, 15, 25].map((value) => ( <MenuItem key={value} value={value}>{value}</MenuItem> ))}
//                             </Select>
//                         </FormControl>
//                         <Typography variant="body2" color="text.secondary">
//                           {`Showing ${startEntry} to ${endEntry} of ${filteredAssets.length} results`}
//                         </Typography>
//                     </Box>
//                     <Pagination
//                         count={Math.ceil(filteredAssets.length / rowsPerPage)}
//                         page={page + 1}
//                         onChange={handlePaginationChange}
//                         showFirstButton showLastButton
//                         sx={{
//                             '& .MuiPaginationItem-root:hover': { backgroundColor: THEME_ORANGE, color: 'white' },
//                             '& .MuiPaginationItem-page': {
//                                 color: THEME_PURPLE,
//                                 '&.Mui-selected': {
//                                     backgroundColor: THEME_PURPLE,
//                                     color: 'white',
//                                     '&:hover': { backgroundColor: THEME_ORANGE }
//                                 },
//                             },
//                             '& .MuiPaginationItem-icon': { color: THEME_PURPLE }
//                         }}
//                     />
//                 </Box>
//             )}
//         </Box>

//         <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
//           <DialogTitle sx={{ color: THEME_PURPLE, fontWeight: 'bold' }}>
//             New Asset Purchase
//           </DialogTitle>
//           <Box component="form" onSubmit={handleSubmit}>
//             <DialogContent>
//               <CardContent>
//                 <Grid container spacing={3} sx={{ mt: 1 }}>
//                   <Grid item xs={12} sm={6} md={4}> <TextField select fullWidth required label="Category" name="category_id" value={formData.category_id} onChange={handleChange} disabled={dropdownLoading.categories || submitting}> {dropdownLoading.categories ? <MenuItem disabled>Loading...</MenuItem> : categories.map((cat) => (<MenuItem key={cat.value} value={cat.value}>{cat.label}</MenuItem>))} </TextField> </Grid>
//                   <Grid item xs={12} sm={6} md={4}> <TextField select fullWidth required label="Brand" name="brand_id" value={formData.brand_id} onChange={handleChange} disabled={dropdownLoading.brands || submitting}> {dropdownLoading.brands ? <MenuItem disabled>Loading...</MenuItem> : brands.map((brand) => (<MenuItem key={brand.value} value={brand.value}>{brand.label}</MenuItem>))} </TextField> </Grid>
//                   <Grid item xs={12} sm={6} md={4}> <TextField select fullWidth required label="Asset Product Name" name="product_id" value={formData.product_id} onChange={handleChange} disabled={dropdownLoading.products || submitting}> {dropdownLoading.products ? <MenuItem disabled>Loading...</MenuItem> : products.map((product) => (<MenuItem key={product.value} value={product.value}>{product.label}</MenuItem>))} </TextField> </Grid>
//                   <Grid item xs={12} sm={6} md={4}> <TextField fullWidth label="Manufacturer" name="manufacturer" value={formData.manufacturer} onChange={handleChange} disabled={submitting} /> </Grid>
//                   <Grid item xs={12} sm={6} md={4}> <TextField fullWidth required label="Asset Code" name="asset_code" value={formData.asset_code} onChange={handleChange} disabled={submitting} /> </Grid>
//                   <Grid item xs={12} sm={6} md={4}> <TextField fullWidth required label="Serial Number" name="serial_number" value={formData.serial_number} onChange={handleChange} disabled={submitting} /> </Grid>
//                   <Grid item xs={12} sm={6} md={4}> <TextField fullWidth required type="number" label="Quantity" name="quantity" value={formData.quantity} onChange={handleChange} inputProps={{ min: 1 }} disabled={submitting}/> </Grid>
//                   <Grid item xs={12} sm={6} md={4}> <TextField fullWidth required label="Invoice Number" name="invoice_number" value={formData.invoice_number} onChange={handleChange} disabled={submitting} /> </Grid>
//                   <Grid item xs={12} sm={6} md={4}> <TextField fullWidth required type="number" label="Price per unit" name="price" value={formData.price} onChange={handleChange} inputProps={{ step: "0.01", min: 0 }} disabled={submitting}/> </Grid>
//                   <Grid item xs={12} sm={6} md={4}> <DatePicker label="Purchase Date" value={formData.purchase_date} onChange={(date) => handleDateChange("purchase_date", date)} maxDate={new Date()} format="dd/MM/yyyy" sx={{ width: '100%' }} renderInput={(params) => <TextField {...params} fullWidth required />} disabled={submitting}/> </Grid>
//                   <Grid item xs={12} sm={6} md={4}> <DatePicker label="Warranty End Date" value={formData.warranty_end_date} onChange={(date) => handleDateChange("warranty_end_date", date)} minDate={getMinWarrantyDate()} format="dd/MM/yyyy" sx={{ width: '100%' }} renderInput={(params) => <TextField {...params} fullWidth />} disabled={!formData.purchase_date || submitting}/> </Grid>
//                 </Grid>
//               </CardContent>
//             </DialogContent>
//             <DialogActions sx={{ p: '16px 24px' }}>
//               <Button onClick={handleClose} disabled={submitting} sx={{ color: '#757575', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}>Cancel</Button>
//               <Button type="submit" variant="contained" sx={{ backgroundColor: THEME_PURPLE, '&:hover': { backgroundColor: THEME_PURPLE_HOVER } }} disabled={submitting}>
//                 {submitting ? <CircularProgress size={24} color="inherit" /> : "Save Asset"}
//               </Button>
//             </DialogActions>
//           </Box>
//         </Dialog>
//       </Box>
//     </LocalizationProvider>
//   );
// };



// export default NewPurchaseAssets;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import {
//   Box,
//   Button,
//   Grid,
//   TextField,
//   Typography,
//   Paper,
//   MenuItem,
//   CircularProgress,
//   Tabs,
//   Tab,
//   FormControl,
//   Select,
//   InputLabel,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Chip,
//   RadioGroup,
//   FormControlLabel,
//   Radio
// } from "@mui/material";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from "dayjs";

// // Theme Constants
// const THEME_PURPLE = '#8C257C';
// const THEME_PURPLE_HOVER = '#6d1d60';

// // API Endpoints
// const API_BASE_URL = 'https://tdtlworld.com/hrms-backend';
// const CATEGORIES_API = `${API_BASE_URL}/api/assets-category/`;
// const BRANDS_API = `${API_BASE_URL}/api/assets-brand/`;
// const PRODUCTS_API = `${API_BASE_URL}/apis/create_edit_product/`;
// // Note: Use your actual API for Requisition when available. 
// const ADD_ASSET_API = `${API_BASE_URL}/apis/add_new_asset_to_stock/`; 

// const NewPurchaseAssets = () => {
//   const [tabValue, setTabValue] = useState(0); // 0 = Add Asset, 1 = Requisition
  
//   // Dropdown Data
//   const [categories, setCategories] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [loadingDropdowns, setLoadingDropdowns] = useState(false);

//   // --- TAB 1: ADD ASSET STATE ---
//   const [addForm, setAddForm] = useState({
//     caNo: 'Auto Generated', // Read only
//     assetName: '',
//     categoryId: '',
//     typeId: '', // Product ID
//     brandId: '',
//     modelNo: '',
//     invoiceNo: '',
//     purchaseDate: null,
//     warrantyDate: null,
//     price: '',
//     image: null
//   });
//   const [submittingAdd, setSubmittingAdd] = useState(false);

//   // --- TAB 2: REQUISITION STATE ---
//   const [reqForm, setReqForm] = useState({
//     reqNo: 'Auto Generated',
//     assetName: '',
//     categoryId: '',
//     typeId: '',
//     brandId: '',
//     specification: '',
//     quantity: '',
//     expectedDate: null
//   });
//   const [reqFilter, setReqFilter] = useState('Pending'); // 'Pending' or 'Received'
//   // Dummy Data for Requisition Table (Replace with API fetch later)
//   const [requisitionList, setRequisitionList] = useState([
//     { id: 1, reqNo: 'REQ-001', assetName: 'Dell Latitude', expectedDate: '2023-12-01', status: 'Pending' },
//     { id: 2, reqNo: 'REQ-002', assetName: 'Macbook Pro', expectedDate: '2023-11-20', status: 'Received' },
//   ]);

//   // --- INITIAL DATA LOADING ---
//   useEffect(() => {
//     const loadDropdowns = async () => {
//       setLoadingDropdowns(true);
//       try {
//         const [catRes, brandRes, prodRes] = await Promise.all([
//           axios.get(CATEGORIES_API),
//           axios.get(BRANDS_API),
//           axios.get(PRODUCTS_API)
//         ]);
//         setCategories(catRes.data.map(c => ({ id: c.value, label: c.label })));
//         setBrands(brandRes.data.map(b => ({ id: b.value, label: b.label })));
//         setProducts(prodRes.data.map(p => ({ id: p.constants_id, label: p.category_name })));
//       } catch (error) {
//         console.error("Error loading dropdowns", error);
//       } finally {
//         setLoadingDropdowns(false);
//       }
//     };
//     loadDropdowns();
//   }, []);

//   // --- HANDLERS ---
//   const handleTabChange = (event, newValue) => setTabValue(newValue);

//   // Add Asset Handlers
//   const handleAddChange = (e) => {
//     const { name, value } = e.target;
//     setAddForm(prev => ({ ...prev, [name]: value }));
//   };
//   const handleImageChange = (e) => {
//     if(e.target.files && e.target.files[0]) {
//         setAddForm(prev => ({ ...prev, image: e.target.files[0] }));
//     }
//   };

//   const saveAddAsset = async () => {
//     setSubmittingAdd(true);
//     try {
//         // Construct Payload
//         const payload = {
//             brand_id: Number(addForm.brandId),
//             category_id: Number(addForm.categoryId),
//             product_id: Number(addForm.typeId),
//             quantity: 1, // Defaulting to 1 based on image not showing Qty field in Add Asset
//             price: Number(addForm.price),
//             invoice_number: addForm.invoiceNo,
//             purchase_date: addForm.purchaseDate ? dayjs(addForm.purchaseDate).format("YYYY-MM-DD") : null,
//             warranty_end_date: addForm.warrantyDate ? dayjs(addForm.warrantyDate).format("YYYY-MM-DD") : null,
//             // Add other fields if API supports them (Model No, Name, etc.)
//         };

//         await axios.post(ADD_ASSET_API, payload);
//         Swal.fire("Success", "Asset Added Successfully", "success");
//         // Reset Form
//         setAddForm({
//             caNo: 'Auto Generated', assetName: '', categoryId: '', typeId: '', brandId: '',
//             modelNo: '', invoiceNo: '', purchaseDate: null, warrantyDate: null, price: '', image: null
//         });
//     } catch (error) {
//         Swal.fire("Error", "Failed to add asset", "error");
//         console.error(error);
//     } finally {
//         setSubmittingAdd(false);
//     }
//   };

//   // Requisition Handlers
//   const handleReqChange = (e) => {
//     const { name, value } = e.target;
//     setReqForm(prev => ({ ...prev, [name]: value }));
//   };

//   const saveRequisition = () => {
//     // Placeholder logic for Saving Requisition
//     const newReq = {
//         id: requisitionList.length + 1,
//         reqNo: `REQ-00${requisitionList.length + 1}`,
//         assetName: reqForm.assetName,
//         expectedDate: reqForm.expectedDate ? dayjs(reqForm.expectedDate).format('YYYY-MM-DD') : 'N/A',
//         status: 'Pending'
//     };
//     setRequisitionList([...requisitionList, newReq]);
//     Swal.fire("Success", "Requisition Sent", "success");
//     setReqForm({ reqNo: 'Auto Generated', assetName: '', categoryId: '', typeId: '', brandId: '', specification: '', quantity: '', expectedDate: null });
//   };

//   // --- RENDER HELPERS ---
//   const filteredRequisitions = requisitionList.filter(r => 
//     reqFilter === 'All' ? true : r.status === reqFilter
//   );

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Box sx={{ width: '100%' }}>
        
//         {/* Header and Tabs */}
//         <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
//              <Tabs 
//                 value={tabValue} 
//                 onChange={handleTabChange} 
//                 textColor="inherit"
//                 TabIndicatorProps={{ style: { backgroundColor: THEME_PURPLE } }}
//                 sx={{ 
//                     '& .MuiTab-root': { fontWeight: 'bold', color: 'text.secondary' },
//                     '& .Mui-selected': { color: THEME_PURPLE } 
//                 }}
//              >
//                 <Tab label="Add Asset" />
//                 <Tab label="Asset Requisition" />
//              </Tabs>
//         </Box>

//         {/* --- VIEW 1: ADD ASSET --- */}
//         {tabValue === 0 && (
//           <Paper variant="outlined" sx={{ p: 3 }}>
//             <Typography variant="h5" color={THEME_PURPLE} fontWeight="bold" gutterBottom>+ Add Asset</Typography>
//             <Grid container spacing={2}>
//                 <Grid item xs={12} md={4}>
//                     <TextField fullWidth size="small" label="CA no." value={addForm.caNo} disabled helperText="(Auto generated)" />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                     <TextField fullWidth size="small" label="Name of Asset" name="assetName" value={addForm.assetName} onChange={handleAddChange} />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                     <FormControl fullWidth size="small">
//                         <InputLabel>Select Category</InputLabel>
//                         <Select label="Select Category" name="categoryId" value={addForm.categoryId} onChange={handleAddChange}>
//                             {categories.map(c => <MenuItem key={c.id} value={c.id}>{c.label}</MenuItem>)}
//                         </Select>
//                     </FormControl>
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                     <FormControl fullWidth size="small">
//                         <InputLabel>Type (Product)</InputLabel>
//                         <Select label="Type (Product)" name="typeId" value={addForm.typeId} onChange={handleAddChange}>
//                              {products.map(p => <MenuItem key={p.id} value={p.id}>{p.label}</MenuItem>)}
//                         </Select>
//                     </FormControl>
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                     <FormControl fullWidth size="small">
//                         <InputLabel>Brand</InputLabel>
//                         <Select label="Brand" name="brandId" value={addForm.brandId} onChange={handleAddChange}>
//                             {brands.map(b => <MenuItem key={b.id} value={b.id}>{b.label}</MenuItem>)}
//                         </Select>
//                     </FormControl>
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                     <TextField fullWidth size="small" label="Model No." name="modelNo" value={addForm.modelNo} onChange={handleAddChange} />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                     <TextField fullWidth size="small" label="Invoice No." name="invoiceNo" value={addForm.invoiceNo} onChange={handleAddChange} />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                     <DatePicker label="Purchase Date" value={addForm.purchaseDate} onChange={(d) => setAddForm(prev=>({...prev, purchaseDate: d}))} slotProps={{ textField: { size: 'small', fullWidth: true } }} />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                     <DatePicker label="Warranty Date" value={addForm.warrantyDate} onChange={(d) => setAddForm(prev=>({...prev, warrantyDate: d}))} slotProps={{ textField: { size: 'small', fullWidth: true } }} />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                     <TextField fullWidth size="small" type="number" label="Price" name="price" value={addForm.price} onChange={handleAddChange} />
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                     <Button variant="outlined" component="label" fullWidth sx={{ color: THEME_PURPLE, borderColor: THEME_PURPLE }}>
//                         {addForm.image ? addForm.image.name : "Upload Image"}
//                         <input type="file" hidden accept="image/*" onChange={handleImageChange} />
//                     </Button>
//                 </Grid>
//             </Grid>
//             <Box mt={3} display="flex" justifyContent="flex-end">
//                 <Button variant="contained" onClick={saveAddAsset} disabled={submittingAdd} sx={{ bgcolor: THEME_PURPLE, '&:hover': { bgcolor: THEME_PURPLE_HOVER } }}>
//                     {submittingAdd ? <CircularProgress size={24} color="inherit"/> : "Save"}
//                 </Button>
//             </Box>
//           </Paper>
//         )}

//         {/* --- VIEW 2: ASSET REQUISITION --- */}
//         {tabValue === 1 && (
//           <Box>
//             {/* Requisition Form */}
//             <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
//                 <Typography variant="h5" color={THEME_PURPLE} fontWeight="bold" gutterBottom>Asset Requisition</Typography>
//                 <Grid container spacing={2}>
//                     <Grid item xs={12} md={4}>
//                         <TextField fullWidth size="small" label="Requisition Number" value={reqForm.reqNo} disabled helperText="(Auto Generate)" />
//                     </Grid>
//                     <Grid item xs={12} md={4}>
//                         <TextField fullWidth size="small" label="Name of Asset" name="assetName" value={reqForm.assetName} onChange={handleReqChange} />
//                     </Grid>
//                     <Grid item xs={12} md={4}>
//                         <FormControl fullWidth size="small">
//                             <InputLabel>Select Category</InputLabel>
//                             <Select label="Select Category" name="categoryId" value={reqForm.categoryId} onChange={handleReqChange}>
//                                 {categories.map(c => <MenuItem key={c.id} value={c.id}>{c.label}</MenuItem>)}
//                             </Select>
//                         </FormControl>
//                     </Grid>
//                     <Grid item xs={12} md={4}>
//                          <FormControl fullWidth size="small">
//                             <InputLabel>Type</InputLabel>
//                             <Select label="Type" name="typeId" value={reqForm.typeId} onChange={handleReqChange}>
//                                 {products.map(p => <MenuItem key={p.id} value={p.id}>{p.label}</MenuItem>)}
//                             </Select>
//                         </FormControl>
//                     </Grid>
//                     <Grid item xs={12} md={4}>
//                          <FormControl fullWidth size="small">
//                             <InputLabel>Brand</InputLabel>
//                             <Select label="Brand" name="brandId" value={reqForm.brandId} onChange={handleReqChange}>
//                                 {brands.map(b => <MenuItem key={b.id} value={b.id}>{b.label}</MenuItem>)}
//                             </Select>
//                         </FormControl>
//                     </Grid>
//                     <Grid item xs={12} md={4}>
//                         <TextField fullWidth size="small" label="Specification" name="specification" value={reqForm.specification} onChange={handleReqChange} />
//                     </Grid>
//                     <Grid item xs={12} md={4}>
//                         <TextField fullWidth size="small" type="number" label="Quantity" name="quantity" value={reqForm.quantity} onChange={handleReqChange} />
//                     </Grid>
//                     <Grid item xs={12} md={4}>
//                         <DatePicker label="Expected Date" value={reqForm.expectedDate} onChange={(d) => setReqForm(prev=>({...prev, expectedDate: d}))} slotProps={{ textField: { size: 'small', fullWidth: true } }} />
//                     </Grid>
//                 </Grid>
//                 <Box mt={3} display="flex" justifyContent="flex-end">
//                     <Button variant="contained" onClick={saveRequisition} sx={{ bgcolor: THEME_PURPLE, '&:hover': { bgcolor: THEME_PURPLE_HOVER } }}>
//                         Save Requisition
//                     </Button>
//                 </Box>
//             </Paper>

//             {/* Filter */}
//             <Box mb={2} display="flex" alignItems="center" gap={2}>
//                 <Typography fontWeight="bold">Filter Status:</Typography>
//                 <FormControl component="fieldset">
//                     <RadioGroup row value={reqFilter} onChange={(e) => setReqFilter(e.target.value)}>
//                         <FormControlLabel value="Pending" control={<Radio sx={{color: THEME_PURPLE, '&.Mui-checked': {color: THEME_PURPLE}}} />} label="Pending" />
//                         <FormControlLabel value="Received" control={<Radio sx={{color: THEME_PURPLE, '&.Mui-checked': {color: THEME_PURPLE}}} />} label="Received" />
//                     </RadioGroup>
//                 </FormControl>
//             </Box>

//             {/* Requisition Table */}
//             <TableContainer component={Paper} variant="outlined">
//                 <Table size="small">
//                     <TableHead sx={{ bgcolor: THEME_PURPLE }}>
//                         <TableRow>
//                             {['Sr No', 'Requisition No.', 'Name of Asset', 'Expected Date', 'View', 'Status'].map(h => (
//                                 <TableCell key={h} sx={{ color: 'white', fontWeight: 'bold' }}>{h}</TableCell>
//                             ))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {filteredRequisitions.length > 0 ? (
//                             filteredRequisitions.map((row, index) => (
//                                 <TableRow key={row.id} hover>
//                                     <TableCell>{index + 1}</TableCell>
//                                     <TableCell>{row.reqNo}</TableCell>
//                                     <TableCell>{row.assetName}</TableCell>
//                                     <TableCell>{row.expectedDate}</TableCell>
//                                     <TableCell>
//                                         <Button size="small" sx={{ color: THEME_PURPLE }}>View Details</Button>
//                                     </TableCell>
//                                     <TableCell>
//                                         <Chip 
//                                             label={row.status} 
//                                             size="small" 
//                                             variant="outlined" 
//                                             color={row.status === 'Received' ? 'success' : 'warning'} 
//                                         />
//                                     </TableCell>
//                                 </TableRow>
//                             ))
//                         ) : (
//                             <TableRow><TableCell colSpan={6} align="center">No requisitions found.</TableCell></TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//           </Box>
//         )}

//       </Box>
//     </LocalizationProvider>
//   );
// };

// export default NewPurchaseAssets;



import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  MenuItem,
  Typography,
  CardContent,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Stack,
  InputAdornment,
  Skeleton,
  useTheme,
  useMediaQuery,
  FormControl,
  Select,
  Pagination,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format as formatDate, parseISO } from "date-fns";
import axios from "axios";
import Swal from "sweetalert2";

// Icon Imports
import VisibilityIcon from '@mui/icons-material/Visibility';
import Add from "@mui/icons-material/Add";
import SearchIcon from '@mui/icons-material/Search';

// Theme Constants
const THEME_PURPLE = '#8C257C';
const THEME_PURPLE_HOVER = '#6d1d60';
const THEME_ORANGE = '#F58E35';

const NewPurchaseAssets = () => {
  const initialFormState = {
    brand_id: "",
    category_id: "",
    product_id: "",
    manufacturer: "",
    asset_code: "",
    serial_number: "",
    quantity: "",
    purchase_date: null,
    invoice_number: "",
    warranty_end_date: null,
    price: "",
  };

  // --- COMPONENT STATE ---
  const [formData, setFormData] = useState(initialFormState);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [dropdownLoading, setDropdownLoading] = useState({ brands: false, categories: false, products: false });
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [assetList, setAssetList] = useState([]);
  const [loading, setLoading] = useState(true); // Main loading state for table skeletons
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // --- RESPONSIVENESS ---
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // --- DATA FETCHING ---
  const fetchGenericData = async (url, setData, field) => {
    setDropdownLoading(prev => ({ ...prev, [field]: true }));
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (error) {
      console.error(`Error fetching ${field}:`, error);
    } finally {
      setDropdownLoading(prev => ({ ...prev, [field]: false }));
    }
  };

  const fetchProducts = async () => {
    setDropdownLoading(prev => ({ ...prev, products: true }));
    try {
      const res = await axios.get("https://tdtlworld.com/hrms-backend/apis/create_edit_product/");
      const formattedProducts = res.data.map(product => ({
        value: product.constants_id,
        label: product.category_name,
      }));
      setProducts(formattedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setDropdownLoading(prev => ({ ...prev, products: false }));
    }
  };

  const fetchAssetList = async () => {
    setLoading(true);
    try {
        const res = await axios.get("https://tdtlworld.com/hrms-backend/apis/get_assets_instock_data/");
        if (res.data && res.data.status === "success") {
            setAssetList(res.data.data || []);
        } else {
            setAssetList([]);
            throw new Error(res.data.message || "Failed to fetch asset data.");
        }
    } catch (error) {
        console.error("Error fetching asset list:", error);
        Swal.fire({
            icon: "error",
            title: "Loading Failed",
            text: "Failed to load the asset list. Please try again.",
            timer: 3000,
            showConfirmButton: false,
        });
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchGenericData("https://tdtlworld.com/hrms-backend/api/assets-brand/", setBrands, 'brands');
    fetchGenericData("https://tdtlworld.com/hrms-backend/api/assets-category/", setCategories, 'categories');
    fetchProducts();
    fetchAssetList();
  }, []);

  // --- EVENT HANDLERS ---
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    if (submitting) return;
    setOpen(false);
    setFormData(initialFormState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, date) => {
    setFormData((prev) => ({ ...prev, [name]: date }));
  };

  const handlePaginationChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const dataToSend = {
      brand_id: Number(formData.brand_id) || null,
      category_id: Number(formData.category_id) || null,
      product_id: Number(formData.product_id) || null,
      quantity: Number(formData.quantity) || null,
      price: Number(formData.price) || null,
      invoice_number: formData.invoice_number,
      purchase_date: formData.purchase_date ? formatDate(formData.purchase_date, "yyyy-MM-dd") : null,
      warranty_end_date: formData.warranty_end_date ? formatDate(formData.warranty_end_date, "yyyy-MM-dd") : null
    };
    try {
      const response = await axios.post( "https://tdtlworld.com/hrms-backend/apis/add_new_asset_to_stock/", dataToSend );
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: response.data.message || "Asset stock added successfully!",
        timer: 3000,
        showConfirmButton: false,
      });
      handleClose();
      fetchAssetList();
    } catch (error) {
      console.error("Error submitting form:", error);
      const errorMessage = error.response?.data?.message || "There was an error saving the asset.";
      Swal.fire({ icon: "error", title: "Submission Failed", text: errorMessage, timer: 3000, showConfirmButton: false });
    } finally {
      setSubmitting(false);
    }
  };

  const handleViewDetails = (asset) => {
    const formattedPurchaseDate = asset.purchase_date ? formatDate(parseISO(asset.purchase_date), "dd/MM/yyyy") : 'N/A';
    const formattedWarrantyDate = asset.warranty_end_date ? formatDate(parseISO(asset.warranty_end_date), "dd/MM/yyyy") : 'N/A';
    const formattedCreatedDate = asset.created_date ? formatDate(parseISO(asset.created_date), "dd/MM/yyyy") : 'N/A';
    Swal.fire({
      title: '<strong >Asset Stock Details</strong>',
     
      position: 'center', // This will center the modal
      html: `
        <div style="text-align: left; padding-left: 20px;">
          <p><strong>Product:</strong> ${asset.product || 'N/A'}</p>
          <p><strong>Brand:</strong> ${asset.brand || 'N/A'}</p>
          <p><strong>Category:</strong> ${asset.category || 'N/A'}</p><hr/>
          <p><strong>Quantity in Stock:</strong> ${asset.quantity || '0'}</p>
          <p><strong>Price per Unit:</strong> ₹${asset.price || '0.00'}</p>
          <p><strong>Invoice Number:</strong> ${asset.invoice_number || 'N/A'}</p>
          <p><strong>Purchase Date:</strong> ${formattedPurchaseDate}</p>
          <p><strong>Warranty End Date:</strong> ${formattedWarrantyDate}</p>
          <p><strong>Entry Created On:</strong> ${formattedCreatedDate}</p>
        </div>`,
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: 'Close',
      confirmButtonColor: THEME_PURPLE, // Apply theme color to the button
    });
  };

  // --- DERIVED STATE & HELPERS ---
  const filteredAssets = React.useMemo(() =>
    assetList.filter(asset =>
      (asset.product?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (asset.brand?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (asset.category?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    ), [assetList, searchTerm]);

  const paginatedAssets = filteredAssets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const startEntry = filteredAssets.length > 0 ? page * rowsPerPage + 1 : 0;
  const endEntry = Math.min((page + 1) * rowsPerPage, filteredAssets.length);

  const getMinWarrantyDate = () => {
    if (!formData.purchase_date) return null;
    const nextDay = new Date(formData.purchase_date);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box component={Paper} p={3}>
        <Typography variant="h4" sx={{ color: THEME_PURPLE, fontWeight: 'bold', mb: 5 }}>
          New Asset Purchase
        </Typography>

        <Stack
          direction={isMobile ? 'column' : 'row'}
          justifyContent="space-between"
          alignItems={isMobile ? 'stretch' : 'center'}
          spacing={2}
          sx={{ mb: 2 }}
        >
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleOpen}
            sx={{
              backgroundColor: THEME_PURPLE,
              color: 'white',
              '&:hover': { backgroundColor: THEME_PURPLE_HOVER },
            }}
          >
            Add New
          </Button>
          <TextField
            size="small"
            placeholder="Search by Product, Brand, Category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: isMobile ? '100%' : 'auto' }}
          />
        </Stack>

        <TableContainer>
          <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
            <TableHead sx={{ backgroundColor: THEME_PURPLE }}>
              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>SR. NO.</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>CATEGORY</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>BRAND</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>PRODUCT</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>CREATED DATE</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>ACTION</TableCell>
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
                    <TableCell align="center">
                      <Skeleton variant="rectangular" width={40} height={30} sx={{ margin: 'auto' }} />
                    </TableCell>
                  </TableRow>
                ))
              ) : paginatedAssets.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">No assets found.</TableCell>
                </TableRow>
              ) : (
                paginatedAssets.map((asset, index) => (
                  <TableRow key={asset.instock_id} sx={{ '&:hover': { backgroundColor: 'action.hover' } }}>
                    <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem' }}>{asset.category}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem' }}>{asset.brand}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem' }}>{asset.product}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem' }}>
                      {asset.created_date ? formatDate(parseISO(asset.created_date), 'dd/MM/yyyy') : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <Box display="flex" justifyContent="center" gap={0.5}>
                        <IconButton onClick={() => handleViewDetails(asset)} sx={{ color: THEME_PURPLE }}>
                          <VisibilityIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
            {filteredAssets.length > 0 && (
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
                          {`Showing ${startEntry} to ${endEntry} of ${filteredAssets.length} results`}
                        </Typography>
                    </Box>
                    <Pagination
                        count={Math.ceil(filteredAssets.length / rowsPerPage)}
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

        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
          <DialogTitle sx={{ color: THEME_PURPLE, fontWeight: 'bold' }}>
            New Asset Purchase
          </DialogTitle>
          <Box component="form" onSubmit={handleSubmit}>
            <DialogContent>
              <CardContent>
                <Grid container spacing={3} sx={{ mt: 1 }}>
                  <Grid item xs={12} sm={6} md={4}> <TextField select fullWidth required label="Category" name="category_id" value={formData.category_id} onChange={handleChange} disabled={dropdownLoading.categories || submitting}> {dropdownLoading.categories ? <MenuItem disabled>Loading...</MenuItem> : categories.map((cat) => (<MenuItem key={cat.value} value={cat.value}>{cat.label}</MenuItem>))} </TextField> </Grid>
                  <Grid item xs={12} sm={6} md={4}> <TextField select fullWidth required label="Brand" name="brand_id" value={formData.brand_id} onChange={handleChange} disabled={dropdownLoading.brands || submitting}> {dropdownLoading.brands ? <MenuItem disabled>Loading...</MenuItem> : brands.map((brand) => (<MenuItem key={brand.value} value={brand.value}>{brand.label}</MenuItem>))} </TextField> </Grid>
                  <Grid item xs={12} sm={6} md={4}> <TextField select fullWidth required label="Asset Product Name" name="product_id" value={formData.product_id} onChange={handleChange} disabled={dropdownLoading.products || submitting}> {dropdownLoading.products ? <MenuItem disabled>Loading...</MenuItem> : products.map((product) => (<MenuItem key={product.value} value={product.value}>{product.label}</MenuItem>))} </TextField> </Grid>
                  <Grid item xs={12} sm={6} md={4}> <TextField fullWidth label="Manufacturer" name="manufacturer" value={formData.manufacturer} onChange={handleChange} disabled={submitting} /> </Grid>
                  <Grid item xs={12} sm={6} md={4}> <TextField fullWidth required label="Asset Code" name="asset_code" value={formData.asset_code} onChange={handleChange} disabled={submitting} /> </Grid>
                  <Grid item xs={12} sm={6} md={4}> <TextField fullWidth required label="Serial Number" name="serial_number" value={formData.serial_number} onChange={handleChange} disabled={submitting} /> </Grid>
                  <Grid item xs={12} sm={6} md={4}> <TextField fullWidth required type="number" label="Quantity" name="quantity" value={formData.quantity} onChange={handleChange} inputProps={{ min: 1 }} disabled={submitting}/> </Grid>
                  <Grid item xs={12} sm={6} md={4}> <TextField fullWidth required label="Invoice Number" name="invoice_number" value={formData.invoice_number} onChange={handleChange} disabled={submitting} /> </Grid>
                  <Grid item xs={12} sm={6} md={4}> <TextField fullWidth required type="number" label="Price per unit" name="price" value={formData.price} onChange={handleChange} inputProps={{ step: "0.01", min: 0 }} disabled={submitting}/> </Grid>
                  <Grid item xs={12} sm={6} md={4}> <DatePicker label="Purchase Date" value={formData.purchase_date} onChange={(date) => handleDateChange("purchase_date", date)} maxDate={new Date()} format="dd/MM/yyyy" sx={{ width: '100%' }} renderInput={(params) => <TextField {...params} fullWidth required />} disabled={submitting}/> </Grid>
                  <Grid item xs={12} sm={6} md={4}> <DatePicker label="Warranty End Date" value={formData.warranty_end_date} onChange={(date) => handleDateChange("warranty_end_date", date)} minDate={getMinWarrantyDate()} format="dd/MM/yyyy" sx={{ width: '100%' }} renderInput={(params) => <TextField {...params} fullWidth />} disabled={!formData.purchase_date || submitting}/> </Grid>
                </Grid>
              </CardContent>
            </DialogContent>
            <DialogActions sx={{ p: '16px 24px' }}>
              <Button onClick={handleClose} disabled={submitting} sx={{ color: '#757575', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}>Cancel</Button>
              <Button type="submit" variant="contained" sx={{ backgroundColor: THEME_PURPLE, '&:hover': { backgroundColor: THEME_PURPLE_HOVER } }} disabled={submitting}>
                {submitting ? <CircularProgress size={24} color="inherit" /> : "Save Asset"}
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default NewPurchaseAssets;