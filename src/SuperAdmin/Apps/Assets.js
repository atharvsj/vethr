




// import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import {
//   Box,
//   Button,
//   CardContent,
//   Chip,
//   CircularProgress,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   FormControl,
//   Grid,
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
//   Autocomplete,
//   TablePagination,
// } from '@mui/material';
// import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import dayjs from 'dayjs';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import vetrinaLogo from '../../Assests/vetrinalogo.jpg';


// const THEME_PURPLE = '#8C257C';
// const THEME_ORANGE = '#F58E35';
// const THEME_PURPLE_HOVER = '#701d63';

// const API_BASE_URL = 'https://tdtlworld.com/hrms-backend';
// const ASSETS_API_URL = `${API_BASE_URL}/assets/`;
// const CATEGORIES_API_URL = `${API_BASE_URL}/api/assets-category/`;
// const BRANDS_API_URL = `${API_BASE_URL}/api/assets-brand/`;
// const EMPLOYEES_API_URL = `${API_BASE_URL}/employee-dropdown/`;
// const ASSET_NAMES_API_URL = `${API_BASE_URL}/apis/get_available_qty/`;

// const initialFormState = {
//   productId: '',
//   assetName: '',
//   quantity: 1,
//   categoryId: '',
//   brandId: '',
//   employeeId: '',
//   manufacturer: '',
//   serialNumber: '',
//   assetCode: '',
//   isWorking: 'Yes',
//   invoiceNumber: '',
//   assetNote: '',
//   imageName: '',
// };

// const Assets = () => {
//   const [assets, setAssets] = useState([]);
//   const [loadingAssets, setLoadingAssets] = useState(true);
//   const [assetsError, setAssetsError] = useState(null);

//   const [categories, setCategories] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [loadingDropdowns, setLoadingDropdowns] = useState(true);
//   const [dropdownError, setDropdownError] = useState(null);

//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState(initialFormState);
//   const [purchaseDate, setPurchaseDate] = useState(null);
//   const [warrantyEndDate, setWarrantyEndDate] = useState(null);
//   const [assetImageFile, setAssetImageFile] = useState(null);
//   const [submittingForm, setSubmittingForm] = useState(false);
  
//   const [assetNameOptions, setAssetNameOptions] = useState([]);
//   const [loadingAssetNames, setLoadingAssetNames] = useState(false);

//   const [maxQuantity, setMaxQuantity] = useState(null);
//   const [quantityError, setQuantityError] = useState('');

//   const [searchQuery, setSearchQuery] = useState('');
  
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
//   const [assetActionInfo, setAssetActionInfo] = useState({ assetId: null, action: '', assetName: '' });
//   const [updatingReturnId, setUpdatingReturnId] = useState(null);

//   const [detailsOpen, setDetailsOpen] = useState(false);
//   const [selectedAsset, setSelectedAsset] = useState(null);
//   const assetDetailsRef = useRef(null);

//   const fetchAssets = useCallback(async () => {
//     if (employees.length === 0 && !loadingDropdowns) return;
//     setLoadingAssets(true);
//     setAssetsError(null);
//     try {
//       const employeeMap = new Map(employees.map(e => [e.id, e.name]));
//       const response = await axios.get(ASSETS_API_URL);
//       const transformedData = response.data.map((asset) => ({
//         id: asset.id,
//         assetName: asset.assets_name,
//         quantity: asset.quantity,
//         category: asset.category_name,
//         categoryId: asset.assets_category_id,
//         brand: asset.brand_name,
//         brandId: asset.brand_id,
//         employee: (asset.employee_name || (asset.employee_id ? employeeMap.get(asset.employee_id) : null)) || 'Unassigned',
//         employeeId: asset.employee_id,
//         manufacturer: asset.manufacturer,
//         serialNumber: asset.serial_number,
//         assetCode: asset.company_asset_code,
//         isWorking: asset.is_working,
//         purchaseDate: asset.purchase_date,
//         invoiceNumber: asset.invoice_number,
//         warrantyEndDate: asset.warranty_end_date,
//         assetNote: asset.asset_note,
//         imageUrl: asset.asset_image,
//         confirmation: asset.employee_confirmation || 'pending',
//         returnRequestStatus: asset.return_request_status,
//         isReturned: asset.returned,
//         createdAt: asset.created_at,
//       }));
//       const sortedData = transformedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       setAssets(sortedData);
//     } catch (error) {
//       console.error("Error fetching assets:", error);
//       const errorMessage = error.response?.data?.detail || "Could not fetch assets.";
//       setAssetsError(errorMessage);
//       Swal.fire({ icon: 'error', title: 'Failed to Load Assets', text: errorMessage });
//     } finally {
//       setLoadingAssets(false);
//     }
//   }, [employees, loadingDropdowns]);

//   const fetchDropdownData = useCallback(async () => {
//     setLoadingDropdowns(true);
//     setDropdownError(null);
//     try {
//       const [categoriesRes, brandsRes, employeesRes] = await Promise.all([
//         axios.get(CATEGORIES_API_URL),
//         axios.get(BRANDS_API_URL),
//         axios.get(EMPLOYEES_API_URL),
//       ]);
//       setCategories(categoriesRes.data.map(c => ({ id: c.value, name: c.label })));
//       setBrands(brandsRes.data.map(b => ({ id: b.value, name: b.label })));
//       setEmployees(employeesRes.data.map(e => ({ id: e.emp_id, name: `(${e.emp_id} - ${e.label} - ${e.division_name})` })));
//     } catch (error) {
//       console.error("Error fetching dropdown data:", error);
//       const errorMessage = "Could not load required form data. Please refresh.";
//       setDropdownError(errorMessage);
//       Swal.fire({ icon: 'error', title: 'Configuration Error', text: errorMessage });
//     } finally {
//       setLoadingDropdowns(false);
//     }
//   }, []);

//   useEffect(() => { fetchDropdownData(); }, [fetchDropdownData]);
//   useEffect(() => { if (!loadingDropdowns) fetchAssets(); }, [loadingDropdowns, fetchAssets]);
//   useEffect(() => { setPage(0); }, [searchQuery, rowsPerPage]);
//   useEffect(() => {
//     if (purchaseDate && warrantyEndDate && dayjs(warrantyEndDate).isBefore(dayjs(purchaseDate))) {
//       setWarrantyEndDate(null);
//     }
//   }, [purchaseDate, warrantyEndDate]);
  
//   useEffect(() => {
//     const fetchAssetNames = async () => {
//       if (formData.categoryId && formData.brandId) {
//         setLoadingAssetNames(true);
//         setAssetNameOptions([]);
//         try {
//           const response = await axios.get(`${ASSET_NAMES_API_URL}?category_id=${formData.categoryId}&brand_id=${formData.brandId}`);
//           const formattedOptions = response.data.map(p => ({
//             id: p.product_id,
//             name: p.product_name,
//             label: `${p.product_name} (In Stock: ${Math.floor(p.in_stock)})`,
//             inStock: p.in_stock,
//           }));
//           setAssetNameOptions(formattedOptions);
//         } catch (error) {
//           console.error("Error fetching asset names:", error);
//           Swal.fire({ icon: 'error', title: 'Could not fetch Asset Names', text: 'Please check your category and brand selection or try again later.' });
//         } finally {
//           setLoadingAssetNames(false);
//         }
//       } else {
//         setAssetNameOptions([]);
//       }
//     };
//     fetchAssetNames();
//   }, [formData.categoryId, formData.brandId]);

//   const handleInputChange = (event) => {
//     const { name: inputName, value } = event.target;
//     if (inputName === 'quantity') {
//       const numValue = Number(value);
//       if (numValue < 1) {
//         setQuantityError('Quantity must be at least 1.');
//       } else if (maxQuantity !== null && numValue > maxQuantity) {
//         setQuantityError(`Quantity cannot exceed the available stock of ${Math.floor(maxQuantity)}.`);
//       } else {
//         setQuantityError('');
//       }
//     }
//     setFormData((prev) => ({ ...prev, [inputName]: value }));
//   };

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setAssetImageFile(file);
//       setFormData((prev) => ({ ...prev, imageName: file.name }));
//     }
//   };

//   const resetForm = useCallback(() => {
//     setFormData(initialFormState);
//     setPurchaseDate(null);
//     setWarrantyEndDate(null);
//     setAssetImageFile(null);
//     setMaxQuantity(null);
//     setQuantityError('');
//   }, []);

//   const handleShowFormToggle = () => {
//     setShowForm(!showForm);
//     if (showForm) resetForm();
//   };
  
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleExportReport = () => {
//     const headers = [
//       'SR. NO.', 'ASSET PRODUCT NAME', 'CATEGORY', 'BRAND', 'QUANTITY', 'SERIAL NO.', 
//       'ASSIGNED TO', 'ASSET CODE', 'MANUFACTURER', 'PURCHASE DATE', 
//       'WARRANTY END DATE', 'INVOICE NO.', 'CREATED DATE', 'IS WORKING?', 
//       'CONFIRMATION', 'RETURN ASSET'
//     ];
//     const escapeCSV = (str) => `"${String(str || '').replace(/"/g, '""')}"`;
//     const data = assets.map((asset, index) => {
//       const returnStatus = asset.isReturned === 'Y' ? 'Returned' : 
//                           asset.returnRequestStatus === '1' ? 'Request Pending' : 
//                           asset.returnRequestStatus === 'denied' ? 'Return Denied' : 'No request';
//       return [
//         index + 1,
//         escapeCSV(asset.assetName),
//         escapeCSV(asset.category),
//         escapeCSV(asset.brand),
//         escapeCSV(asset.quantity),
//         escapeCSV(asset.serialNumber),
//         escapeCSV(asset.employee),
//         escapeCSV(asset.assetCode || 'N/A'),
//         escapeCSV(asset.manufacturer || 'N/A'),
//         escapeCSV(asset.purchaseDate ? dayjs(asset.purchaseDate).format('DD/MM/YYYY') : 'N/A'),
//         escapeCSV(asset.warrantyEndDate ? dayjs(asset.warrantyEndDate).format('DD/MM/YYYY') : 'N/A'),
//         escapeCSV(asset.invoiceNumber || 'N/A'),
//         escapeCSV(asset.createdAt ? dayjs(asset.createdAt).format('DD/MM/YYYY') : 'N/A'),
//         escapeCSV(asset.isWorking),
//         escapeCSV(asset.employeeId ? asset.confirmation : '—'),
//         escapeCSV(returnStatus),
//       ].join(',');
//     });
//     const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...data].join("\n");
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "assets_report.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };
 
//   const handleSave = async () => {
//     if (Number(formData.quantity) < 1) {
//       Swal.fire({ icon: 'error', title: 'Invalid Quantity', text: 'The quantity must be at least 1.', });
//       return;
//     }
//     if (maxQuantity !== null && Number(formData.quantity) > maxQuantity) {
//       Swal.fire({ icon: 'error', title: 'Invalid Quantity', text: `The quantity for "${formData.assetName}" cannot exceed the available stock of ${Math.floor(maxQuantity)}.`, });
//       return;
//     }

//     const requiredFields = { 
//         'Category': formData.categoryId,
//         'Brand': formData.brandId,
//         'Asset Product Name': formData.productId,
//         'Quantity': formData.quantity && Number(formData.quantity) >= 1,
//         'Employee': formData.employeeId,
//         'Serial Number': formData.serialNumber,
//         'Manufacturer': formData.manufacturer,
//         'Asset Code': formData.assetCode,
//         'Invoice Number': formData.invoiceNumber,
//         'Purchase Date': purchaseDate,
//         'Warranty End Date': warrantyEndDate,
//         'Asset Image': assetImageFile,
//     };
//     const missingFields = Object.keys(requiredFields).filter(key => !requiredFields[key]);
//     if (missingFields.length > 0) {
//       Swal.fire({ icon: 'warning', title: 'Missing Information', text: `Please fill all the following required fields: ${missingFields.join(', ')}.`, });
//       return;
//     }

//     setSubmittingForm(true);
//     const payload = new FormData();
//     payload.append('assets_name', formData.assetName);
//     payload.append('quantity', formData.quantity);
//     payload.append('assets_category_id', formData.categoryId);
//     payload.append('brand_id', formData.brandId);
//     payload.append('employee_id', formData.employeeId);
//     payload.append('product_id', formData.productId);
//     payload.append('serial_number', formData.serialNumber);
//     payload.append('purchase_date', purchaseDate.format('YYYY-MM-DD'));
//     payload.append('manufacturer', formData.manufacturer);
//     payload.append('is_working', formData.isWorking);
//     payload.append('company_asset_code', formData.assetCode);
//     payload.append('invoice_number', formData.invoiceNumber);
//     payload.append('warranty_end_date', warrantyEndDate.format('YYYY-MM-DD'));
//     if (formData.assetNote) payload.append('asset_note', formData.assetNote);
//     if (assetImageFile) payload.append('asset_image', assetImageFile, assetImageFile.name);

//     try {
//       await axios.post(ASSETS_API_URL, payload);
//       const successTitle = 'Asset Allocated!';
//       const allocatedEmployee = employees.find(e => e.id === formData.employeeId);
//       const successText = `The asset "${formData.assetName}" has been successfully assigned to ${allocatedEmployee.name}.`;
//       Swal.fire({ icon: 'success', title: successTitle, text: successText });
//       setShowForm(false);
//       resetForm();
//       fetchAssets();
//     } catch (error) {
//       console.error(`Error saving asset:`, error);
//       const errorMessage = error.response?.data ? Object.values(error.response.data).flat().join('; ') : "An unexpected server error occurred.";
//       Swal.fire({ icon: 'error', title: 'Submission Failed', text: errorMessage });
//     } finally {
//       setSubmittingForm(false);
//     }
//   };
 
//   const handleReturnActionClick = (assetId, action, assetName) => {
//     setAssetActionInfo({ assetId, action, assetName });
//     setConfirmationDialogOpen(true);
//   };
 
//   const handleConfirmationDialogConfirm = async () => {
//     const { assetId, action } = assetActionInfo;
//     if (!assetId || !action) return;
//     setUpdatingReturnId(assetId);
//     setConfirmationDialogOpen(false);
//     try {
//       const response = await axios.patch(`${ASSETS_API_URL}${assetId}/`, { action });
//       Swal.fire({ icon: 'success', title: 'Action Successful', text: response.data.message });
//       await fetchAssets();
//       if (selectedAsset && selectedAsset.id === assetId) {
//         const freshResponse = await axios.get(`${ASSETS_API_URL}${assetId}/`);
//         const refreshedAsset = { ...selectedAsset, returnRequestStatus: freshResponse.data.return_request_status, isReturned: freshResponse.data.returned };
//         setSelectedAsset(refreshedAsset);
//       }
//     } catch (error) {
//       console.error("Error updating return status:", error);
//       const errorMessage = error.response?.data?.message || "Failed to update status.";
//       Swal.fire({ icon: 'error', title: 'Action Failed', text: errorMessage });
//     } finally {
//       setUpdatingReturnId(null);
//       setAssetActionInfo({ assetId: null, action: '', assetName: '' });
//     }
//   };

//   const handleViewDetails = (asset) => {
//     setSelectedAsset(asset);
//     setDetailsOpen(true);
//   };

//   const handleCloseDetails = () => {
//     setDetailsOpen(false);
//     setSelectedAsset(null);
//   };
 
//   const handleDownloadPdf = () => {
//     const input = assetDetailsRef.current;
//     if (!input) return;
  
//     html2canvas(input, { scale: 2, useCORS: true })
//       .then((canvas) => {
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF('p', 'mm', 'a4');
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = pdf.internal.pageSize.getHeight();
  
//         pdf.setDrawColor(0);
//         pdf.rect(5, 5, pdfWidth - 10, pdfHeight - 10);
  
//         const headerY = 10;
//         pdf.addImage(vetrinaLogo, 'JPEG', 10, headerY, 40, 10);
//         pdf.setFontSize(20);
//         pdf.setTextColor('#8C257C');
//         pdf.text('Asset Details', pdfWidth / 2, headerY + 8, { align: 'center' });
  
//         const headerDividerY = headerY + 15;
//         pdf.setDrawColor(140, 37, 124);
//         pdf.line(10, headerDividerY, pdfWidth - 10, headerDividerY);
  
//         const contentMargin = 10;
//         const contentStartY = headerDividerY + 5;
//         const contentWidth = pdfWidth - (contentMargin * 2);
//         const canvasWidth = canvas.width;
//         const canvasHeight = canvas.height;
//         const contentHeight = (canvasHeight * contentWidth) / canvasWidth;
//         pdf.addImage(imgData, 'PNG', contentMargin, contentStartY, contentWidth, contentHeight);
  
//         const footerDividerY = pdfHeight - 20;
//         pdf.setDrawColor(140, 37, 124);
//         pdf.line(10, footerDividerY, pdfWidth - 10, footerDividerY);
  
//         pdf.setFontSize(10);
//         pdf.setTextColor(0, 0, 0);
//         pdf.setFont('helvetica', 'bold');
//         const footerText = 'Vetrina Healthcare Pvt. Ltd., Corporate Office - Punyai Pride, 1st Floor, Shivshambho Nagar, Lane 3A, Katraj Kondhwa Road, Katraj, Pune - 411046.';
//         const splitFooter = pdf.splitTextToSize(footerText, pdfWidth - 20);
//         pdf.text(splitFooter, pdfWidth / 2, footerDividerY + 5, { align: 'center' });
  
//         pdf.save(`asset-details-${selectedAsset.assetName.replace(/\s/g, '_')}.pdf`);
//       });
//   };

//   const filteredAssets = useMemo(() => {
//     if (!searchQuery) return assets;
//     const lowercasedQuery = searchQuery.toLowerCase();
//     return assets.filter((asset) => Object.values(asset).some((value) => String(value).toLowerCase().includes(lowercasedQuery)));
//   }, [assets, searchQuery]);

//   const paginatedAssets = filteredAssets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   const getConfirmationChip = (status) => {
//     if (status === 'accepted') return <Chip label="Confirmed" size="small" sx={{ backgroundColor: 'green', color: 'white' }} />;
//     if (status === 'rejected') return <Chip label="Rejected" color="error" size="small" />;
//     return <Chip label="Pending" color="warning" size="small" />;
//   };

//   const renderReturnActionCell = (asset) => {
//     if (updatingReturnId === asset.id) return <CircularProgress size={24} />;
//     if (asset.isReturned === 'Y') return <Chip label="Returned" size="small" sx={{ backgroundColor: 'green', color: 'white' }} />;
//     if (!asset.employeeId) return <Typography variant="caption" color="text.secondary">—</Typography>;
//     if (asset.confirmation !== 'accepted') return <Chip label="No request" size="small" color="warning" />;
//     if (asset.returnRequestStatus === '1') {
//       return (
//         <Box display="flex" gap={1} flexWrap="wrap">
//           <Button variant="contained" size="small" sx={{ backgroundColor: THEME_PURPLE, '&:hover': { backgroundColor: THEME_PURPLE_HOVER } }} onClick={() => handleReturnActionClick(asset.id, 'return_yes', asset.assetName)}>Received</Button>
//           <Button variant="contained" color="error" size="small" onClick={() => handleReturnActionClick(asset.id, 'return_no', asset.assetName)}>Not Received</Button>
//         </Box>
//       );
//     }
//     if (asset.returnRequestStatus === 'denied') return <Chip label="Return Denied" color="error" size="small" />;
//     return <Chip label="No request" size="small" color="warning" />;
//   };
  
//   const quantityLabel = maxQuantity !== null ? `Quantity (Max: ${Math.floor(maxQuantity)})` : 'Quantity';

//   if (loadingDropdowns) return <Box display="flex" justifyContent="center" alignItems="center" p={5}><CircularProgress /><Typography ml={2}>Loading configuration...</Typography></Box>;
//   if (dropdownError) return <Box p={3} textAlign="center"><Button variant="contained" onClick={fetchDropdownData} sx={{ backgroundColor: THEME_PURPLE }}>Retry Loading Data</Button></Box>;

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <CardContent sx={{ p: { xs: 1.5, sm: 3 } }}>
//           <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//             <Typography variant="h4" fontWeight="bold" sx={{color:"#8C257C"}}> Assets </Typography>
//           </Box>
//           <br />
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
//               <Button variant="contained" onClick={handleShowFormToggle} disabled={submittingForm} sx={{ backgroundColor: THEME_PURPLE, '&:hover': { backgroundColor: THEME_PURPLE_HOVER } }}>{showForm ? '− Cancel' : '+ Allocate Assets'}</Button>
//               <Button variant="contained" onClick={handleExportReport} sx={{ backgroundColor: THEME_PURPLE, '&:hover': { backgroundColor: THEME_PURPLE_HOVER } }}>Export Report</Button>
//             </Box>
//             <TextField size="small" placeholder="Search assets..." variant="outlined" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} sx={{ width: { xs: '100%', sm: 300 } }} />
//           </Box>

//           {showForm && (
//             <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, mb: 4 }}>
//               <Typography variant="h6" gutterBottom fontWeight="bold" color="#8C257C">Allocate New Asset</Typography>
//               <Grid container spacing={2.5}>
//                 <Grid item xs={12} sm={6} md={4}><Autocomplete options={categories} getOptionLabel={(o) => o.name} value={categories.find(c => c.id === formData.categoryId) || null} onChange={(e, v) => { setFormData(p => ({...p, categoryId: v?.id||'', productId: '', assetName: ''})); setMaxQuantity(null); setQuantityError(''); }} renderInput={(params) => <TextField {...params} label="Category" required size="small" />} /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><Autocomplete options={brands} getOptionLabel={(o) => o.name} value={brands.find(b => b.id === formData.brandId) || null} onChange={(e, v) => { setFormData(p => ({...p, brandId: v?.id||'', productId: '', assetName: ''})); setMaxQuantity(null); setQuantityError(''); }} renderInput={(params) => <TextField {...params} label="Brand" required size="small" />} /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><Autocomplete options={assetNameOptions} getOptionLabel={(o) => o.label || ''} value={assetNameOptions.find(p => p.id === formData.productId) || null} onChange={(e, v) => { setFormData(p => ({ ...p, productId: v?.id || '', assetName: v?.name || '', quantity: v && p.quantity > v.inStock ? Math.floor(v.inStock) : p.quantity, })); setMaxQuantity(v?.inStock || null); setQuantityError(''); }} disabled={!formData.categoryId || !formData.brandId} loading={loadingAssetNames} renderInput={(params) => <TextField {...params} label="Asset Product Name" required size="small" placeholder={!formData.categoryId || !formData.brandId ? 'Select Category & Brand' : ''} InputProps={{ ...params.InputProps, endAdornment: ( <>{loadingAssetNames ? <CircularProgress color="inherit" size={20} /> : null}{params.InputProps.endAdornment}</> ), }} />} /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><TextField name="quantity" label={quantityLabel} type="number" value={formData.quantity} onChange={handleInputChange} required fullWidth size="small" InputProps={{ inputProps: { min: 1, max: maxQuantity !== null ? Math.floor(maxQuantity) : undefined } }} error={!!quantityError} helperText={quantityError} /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><Autocomplete options={employees} getOptionLabel={(o) => o.name} value={employees.find(e => e.id === formData.employeeId) || null} onChange={(e, v) => setFormData(p => ({...p, employeeId: v?.id||''}))} renderInput={(params) => <TextField {...params} label="Employee" required size="small" />} /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><TextField name="serialNumber" label="Serial Number" value={formData.serialNumber} onChange={handleInputChange} required fullWidth size="small" /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><TextField name="manufacturer" label="Manufacturer" value={formData.manufacturer} onChange={handleInputChange} required fullWidth size="small" /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><TextField name="assetCode" label="Asset Code" value={formData.assetCode} onChange={handleInputChange} required fullWidth size="small" /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><FormControl fullWidth size="small" required><InputLabel>Is Working?</InputLabel><Select name="isWorking" value={formData.isWorking} onChange={handleInputChange} label="Is Working?"><MenuItem value="Yes">Yes</MenuItem><MenuItem value="No">No</MenuItem><MenuItem value="Needs Repair">Needs Repair</MenuItem></Select></FormControl></Grid>
//                 <Grid item xs={12} sm={6} md={4}><TextField name="invoiceNumber" label="Invoice Number" value={formData.invoiceNumber} onChange={handleInputChange} required fullWidth size="small" /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><DatePicker label="Purchase Date" value={purchaseDate} onChange={setPurchaseDate} format="DD-MM-YYYY" slotProps={{ textField: { fullWidth: true, size: 'small', required: true } }} maxDate={dayjs()} /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><DatePicker label="Warranty End Date" value={warrantyEndDate} onChange={setWarrantyEndDate} format="DD-MM-YYYY" slotProps={{ textField: { fullWidth: true, size: 'small', required: true } }} minDate={purchaseDate ? dayjs(purchaseDate).add(1, 'day') : null} disabled={!purchaseDate} /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><Button sx={{ borderColor: THEME_PURPLE, color: THEME_PURPLE, height: '100%' }} variant="outlined" component="label" fullWidth disabled={submittingForm}>Upload Image *<input type="file" hidden accept="image/*" onChange={handleImageChange} /></Button><Typography variant="caption" display="block" sx={{ mt: 1, wordBreak: 'break-all', textAlign: 'center' }}>{formData.imageName || "No file chosen"}</Typography></Grid>
//               </Grid>
//               <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
//                 <Button variant="outlined" onClick={resetForm} disabled={submittingForm}>Reset</Button>
//                 <Button variant="contained" onClick={handleSave} disabled={submittingForm} sx={{ backgroundColor: THEME_PURPLE, '&:hover': { backgroundColor: THEME_PURPLE_HOVER } }}>{submittingForm ? <CircularProgress size={24} color="inherit" /> : 'Save Asset'}</Button>
//               </Box>
//             </Paper>
//           )}

//           <Box>
//             {loadingAssets && assets.length === 0 ? <Box display="flex" justifyContent="center" p={5}><CircularProgress /></Box> : assetsError ? <Paper sx={{p:3, textAlign:'center', color:'red'}}>{assetsError}</Paper> : (
//               <Paper variant="outlined">
//                 <TableContainer>
//                   <Table size="small">
//                     <TableHead sx={{ backgroundColor: THEME_PURPLE, '& .MuiTableCell-root': { color: 'white', fontWeight: 'bold' } }}>
//                       <TableRow>
//                           <TableCell>SR. NO.</TableCell>
//                           <TableCell>ASSIGNED TO</TableCell>
//                           <TableCell>CREATED DATE</TableCell>
//                           <TableCell>CONFIRMATION</TableCell>
//                           <TableCell>RETURN</TableCell>
//                           <TableCell>ACTION</TableCell>
//                       </TableRow>
//                     </TableHead>    
//                     <TableBody>
//                       {paginatedAssets.length > 0 ? paginatedAssets.map((asset, index) => (
//                         <TableRow key={asset.id} hover>
//                           <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                           <TableCell>{asset.employee}</TableCell>
//                           <TableCell>{asset.createdAt ? dayjs(asset.createdAt).format('DD/MM/YYYY') : 'N/A'}</TableCell>
//                           <TableCell>{asset.employeeId ? getConfirmationChip(asset.confirmation) : '—'}</TableCell>
//                           <TableCell>{renderReturnActionCell(asset)}</TableCell>
//                            <TableCell>
//                             <Button variant="contained" size="small" sx={{ backgroundColor: THEME_PURPLE, '&:hover': { backgroundColor: THEME_PURPLE_HOVER } }} onClick={() => handleViewDetails(asset)}>
//                               View Details
//                             </Button>
//                           </TableCell>
//                         </TableRow>
//                       )) : <TableRow><TableCell colSpan={6} align="center" sx={{ py: 5 }}>No records available.</TableCell></TableRow>}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
                
//                 <Box sx={{ p: 0.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//                   <Typography variant="body2" color="text.secondary">
//                     Showing {filteredAssets.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredAssets.length)} of {filteredAssets.length} results
//                   </Typography>
//                   <TablePagination
//                     rowsPerPageOptions={[5, 10, 15, 25]}
//                     component="div"
//                     count={filteredAssets.length}
//                     page={page}
//                     onPageChange={handleChangePage}
//                     rowsPerPage={rowsPerPage}
//                     onRowsPerPageChange={handleChangeRowsPerPage}
//                   />
//                 </Box>
//               </Paper>
//             )}
//           </Box>
//         </CardContent>

//       <Dialog open={confirmationDialogOpen} onClose={() => !updatingReturnId && setConfirmationDialogOpen(false)}>
//         <DialogTitle sx={{backgroundColor: THEME_PURPLE, color: 'white'}}>Confirm Return Action</DialogTitle>
//         <DialogContent sx={{pt: '20px !important'}}>
//           <DialogContentText>Asset: <Typography component="span" fontWeight="bold">{`"${assetActionInfo.assetName}"`}</Typography>. Please confirm: <Typography component="span" fontWeight="bold">{assetActionInfo.action === 'return_yes' ? 'Confirm as Received' : 'Confirm as Not Received'}?</Typography></DialogContentText>
//         </DialogContent>
//         <DialogActions sx={{p: '16px 24px'}}>
//           <Button onClick={() => setConfirmationDialogOpen(false)} disabled={!!updatingReturnId} variant="outlined">Cancel</Button>
//           <Button onClick={handleConfirmationDialogConfirm} variant="contained" disabled={!!updatingReturnId} sx={{backgroundColor: THEME_PURPLE, '&:hover': {backgroundColor: THEME_PURPLE_HOVER}}}>{updatingReturnId === assetActionInfo.assetId ? <CircularProgress size={24} color="inherit" /> : 'Confirm'}</Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog open={detailsOpen} onClose={handleCloseDetails} fullWidth maxWidth="md">
//         <DialogTitle sx={{ backgroundColor: THEME_PURPLE, color: 'white' }}>
//             Asset Details
//         </DialogTitle>
//         <DialogContent>
//             <Box ref={assetDetailsRef} sx={{ p: 2 }}>
//                 {selectedAsset && (
//                     <Grid container spacing={2}>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Assigned To:</strong> {selectedAsset.employee || 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Asset Name:</strong> {selectedAsset.assetName}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Category:</strong> {selectedAsset.category || 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Brand:</strong> {selectedAsset.brand || 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Quantity:</strong> {selectedAsset.quantity || 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Serial No.:</strong> {selectedAsset.serialNumber || 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Asset Code:</strong> {selectedAsset.assetCode || 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Manufacturer:</strong> {selectedAsset.manufacturer || 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Created Date:</strong> {selectedAsset.createdAt ? dayjs(selectedAsset.createdAt).format('DD/MM/YYYY') : 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Purchase Date:</strong> {selectedAsset.purchaseDate ? dayjs(selectedAsset.purchaseDate).format('DD/MM/YYYY') : 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Warranty End:</strong> {selectedAsset.warrantyEndDate ? dayjs(selectedAsset.warrantyEndDate).format('DD/MM/YYYY') : 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Invoice No.:</strong> {selectedAsset.invoiceNumber || 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}>
//                             <Box display="flex" alignItems="center" gap={1}>
//                                <Typography variant="body1"><strong>Is Working:</strong></Typography>
//                                <Chip label={selectedAsset.isWorking} size="small" sx={{ backgroundColor: selectedAsset.isWorking === 'Yes' ? 'green' : selectedAsset.isWorking === 'No' ? 'red' : 'orange', color: 'white', fontWeight: 'bold' }} />
//                             </Box>
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <Box display="flex" alignItems="center" gap={1}>
//                                 <Typography variant="body1"><strong>Confirmation:</strong></Typography>
//                                 {selectedAsset.employeeId ? getConfirmationChip(selectedAsset.confirmation) : '—'}
//                              </Box>
//                         </Grid>
//                         <Grid item xs={12}>
//                             <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
//                                 <Typography variant="body1"><strong>Return Status:</strong></Typography>
//                                 {renderReturnActionCell(selectedAsset)}
//                             </Box>
//                         </Grid>
//                          {selectedAsset.imageUrl && (
//                             <Grid item xs={12}>
//                                 <Typography variant="body1"><strong>Asset Image:</strong></Typography>
//                                 <Box mt={1}>
//                                     <a href={selectedAsset.imageUrl} target="_blank" rel="noopener noreferrer">
//                                         <img src={selectedAsset.imageUrl} alt={selectedAsset.assetName} style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '4px', border: '1px solid #ddd' }} crossOrigin="anonymous" />
//                                     </a>
//                                  </Box>
//                             </Grid>
//                          )}
//                     </Grid>
//                 )}
//             </Box>
//         </DialogContent>
//         <DialogActions sx={{ p: '16px 24px', justifyContent: 'space-between' }}>
//             <Button onClick={handleDownloadPdf} variant="contained" sx={{ backgroundColor: THEME_ORANGE, '&:hover': { backgroundColor: '#e67e22' } }}>Download PDF</Button>
//             <Button onClick={handleCloseDetails} variant="contained" sx={{ backgroundColor: THEME_PURPLE, '&:hover': { backgroundColor: THEME_PURPLE_HOVER } }}>Close</Button>
//         </DialogActions>
//     </Dialog>
//     </LocalizationProvider>
//   );
// };

// export default Assets;















// import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import {
//   Box,
//   Button,
//   CardContent,
//   Chip,
//   CircularProgress,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   FormControl,
//   Grid,
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
//   Autocomplete,
//   TablePagination,
// } from '@mui/material';
// import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import dayjs from 'dayjs';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import vetrinaLogo from '../../Assests/vetrinalogo.jpg';


// const THEME_PURPLE = '#8C257C';
// const THEME_ORANGE = '#F58E35';
// const THEME_PURPLE_HOVER = '#701d63';

// const API_BASE_URL = 'https://tdtlworld.com/hrms-backend';
// const ASSETS_API_URL = `${API_BASE_URL}/assets/`;
// const CATEGORIES_API_URL = `${API_BASE_URL}/api/assets-category/`;
// const BRANDS_API_URL = `${API_BASE_URL}/api/assets-brand/`;
// const EMPLOYEES_API_URL = `${API_BASE_URL}/employee-dropdown/`;
// const ASSET_NAMES_API_URL = `${API_BASE_URL}/apis/get_available_qty/`;

// const initialFormState = {
//   productId: '',
//   assetName: '',
//   quantity: 1,
//   categoryId: '',
//   brandId: '',
//   employeeId: '',
//   manufacturer: '',
//   serialNumber: '',
//   assetCode: '',
//   isWorking: 'Yes',
//   invoiceNumber: '',
//   assetNote: '',
//   imageName: '',
// };

// const Assets = () => {
//   const [assets, setAssets] = useState([]);
//   const [loadingAssets, setLoadingAssets] = useState(true);
//   const [assetsError, setAssetsError] = useState(null);

//   const [categories, setCategories] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [loadingDropdowns, setLoadingDropdowns] = useState(true);
//   const [dropdownError, setDropdownError] = useState(null);

//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState(initialFormState);
//   const [purchaseDate, setPurchaseDate] = useState(null);
//   const [warrantyEndDate, setWarrantyEndDate] = useState(null);
//   const [assetImageFile, setAssetImageFile] = useState(null);
//   const [submittingForm, setSubmittingForm] = useState(false);
 
//   const [assetNameOptions, setAssetNameOptions] = useState([]);
//   const [loadingAssetNames, setLoadingAssetNames] = useState(false);

//   const [maxQuantity, setMaxQuantity] = useState(null);
//   const [quantityError, setQuantityError] = useState('');

//   const [searchQuery, setSearchQuery] = useState('');
 
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
//   const [assetActionInfo, setAssetActionInfo] = useState({ assetId: null, action: '', assetName: '' });
//   const [updatingReturnId, setUpdatingReturnId] = useState(null);

//   const [detailsOpen, setDetailsOpen] = useState(false);
//   const [selectedAsset, setSelectedAsset] = useState(null);
//   const assetDetailsRef = useRef(null);

//   const fetchAssets = useCallback(async () => {
//     if (employees.length === 0 && !loadingDropdowns) return;
//     setLoadingAssets(true);
//     setAssetsError(null);
//     try {
//       const employeeMap = new Map(employees.map(e => [e.id, e.name]));
//       const response = await axios.get(ASSETS_API_URL);
//       const transformedData = response.data.map((asset) => ({
//         id: asset.id,
//         assetName: asset.assets_name,
//         quantity: asset.quantity,
//         category: asset.category_name,
//         categoryId: asset.assets_category_id,
//         brand: asset.brand_name,
//         brandId: asset.brand_id,
//         employee: (asset.employee_name || (asset.employee_id ? employeeMap.get(asset.employee_id) : null)) || 'Unassigned',
//         employeeId: asset.employee_id,
//         manufacturer: asset.manufacturer,
//         serialNumber: asset.serial_number,
//         assetCode: asset.company_asset_code,
//         isWorking: asset.is_working,
//         purchaseDate: asset.purchase_date,
//         invoiceNumber: asset.invoice_number,
//         warrantyEndDate: asset.warranty_end_date,
//         assetNote: asset.asset_note,
//         imageUrl: asset.asset_image,
//         confirmation: asset.employee_confirmation || 'pending',
//         returnRequestStatus: asset.return_request_status,
//         isReturned: asset.returned,
//         createdAt: asset.created_at,
//       }));
//       const sortedData = transformedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       setAssets(sortedData);
//     } catch (error) {
//       console.error("Error fetching assets:", error);
//       const errorMessage = error.response?.data?.detail || "Could not fetch assets.";
//       setAssetsError(errorMessage);
//       Swal.fire({ icon: 'error', title: 'Failed to Load Assets', text: errorMessage });
//     } finally {
//       setLoadingAssets(false);
//     }
//   }, [employees, loadingDropdowns]);

//   const fetchDropdownData = useCallback(async () => {
//     setLoadingDropdowns(true);
//     setDropdownError(null);
//     try {
//       const [categoriesRes, brandsRes, employeesRes] = await Promise.all([
//         axios.get(CATEGORIES_API_URL),
//         axios.get(BRANDS_API_URL),
//         axios.get(EMPLOYEES_API_URL),
//       ]);
//       setCategories(categoriesRes.data.map(c => ({ id: c.value, name: c.label })));
//       setBrands(brandsRes.data.map(b => ({ id: b.value, name: b.label })));
//       setEmployees(employeesRes.data.map(e => ({ id: e.emp_id, name: `(${e.emp_id} - ${e.label} - ${e.division_name})` })));
//     } catch (error) {
//       console.error("Error fetching dropdown data:", error);
//       const errorMessage = "Could not load required form data. Please refresh.";
//       setDropdownError(errorMessage);
//       Swal.fire({ icon: 'error', title: 'Configuration Error', text: errorMessage });
//     } finally {
//       setLoadingDropdowns(false);
//     }
//   }, []);

//   useEffect(() => { fetchDropdownData(); }, [fetchDropdownData]);
//   useEffect(() => { if (!loadingDropdowns) fetchAssets(); }, [loadingDropdowns, fetchAssets]);
//   useEffect(() => { setPage(0); }, [searchQuery, rowsPerPage]);
//   useEffect(() => {
//     if (purchaseDate && warrantyEndDate && dayjs(warrantyEndDate).isBefore(dayjs(purchaseDate))) {
//       setWarrantyEndDate(null);
//     }
//   }, [purchaseDate, warrantyEndDate]);
 
//   useEffect(() => {
//     const fetchAssetNames = async () => {
//       if (formData.categoryId && formData.brandId) {
//         setLoadingAssetNames(true);
//         setAssetNameOptions([]);
//         try {
//           const response = await axios.get(`${ASSET_NAMES_API_URL}?category_id=${formData.categoryId}&brand_id=${formData.brandId}`);
//           const formattedOptions = response.data.map(p => ({
//             id: p.product_id,
//             name: p.product_name,
//             label: `${p.product_name} (In Stock: ${Math.floor(p.in_stock)})`,
//             inStock: p.in_stock,
//           }));
//           setAssetNameOptions(formattedOptions);
//         } catch (error) {
//           console.error("Error fetching asset names:", error);
//           Swal.fire({ icon: 'error', title: 'Could not fetch Asset Names', text: 'Please check your category and brand selection or try again later.' });
//         } finally {
//           setLoadingAssetNames(false);
//         }
//       } else {
//         setAssetNameOptions([]);
//       }
//     };
//     fetchAssetNames();
//   }, [formData.categoryId, formData.brandId]);

//   const handleInputChange = (event) => {
//     const { name: inputName, value } = event.target;
 
//     if (inputName === 'manufacturer') {
//       if (/^[a-zA-Z\s]*$/.test(value)) {
//         setFormData((prev) => ({ ...prev, [inputName]: value }));
//       }
//     } else if (inputName === 'assetCode' || inputName === 'serialNumber' || inputName === 'invoiceNumber') {
//       if (/^[0-9]*$/.test(value)) {
//         setFormData((prev) => ({ ...prev, [inputName]: value }));
//       }
//     } else if (inputName === 'quantity') {
//       const numValue = Number(value);
//       if (numValue < 1) {
//         setQuantityError('Quantity must be at least 1.');
//       } else if (maxQuantity !== null && numValue > maxQuantity) {
//         setQuantityError(`Quantity cannot exceed the available stock of ${Math.floor(maxQuantity)}.`);
//       } else {
//         setQuantityError('');
//       }
//       setFormData((prev) => ({ ...prev, [inputName]: value }));
//     } else {
//       setFormData((prev) => ({ ...prev, [inputName]: value }));
//     }
//   };

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setAssetImageFile(file);
//       setFormData((prev) => ({ ...prev, imageName: file.name }));
//     }
//   };

//   const resetForm = useCallback(() => {
//     setFormData(initialFormState);
//     setPurchaseDate(null);
//     setWarrantyEndDate(null);
//     setAssetImageFile(null);
//     setMaxQuantity(null);
//     setQuantityError('');
//   }, []);

//   const handleShowFormToggle = () => {
//     setShowForm(!showForm);
//     if (showForm) resetForm();
//   };
 
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleExportReport = () => {
//     const headers = [
//       'SR. NO.', 'ASSET PRODUCT NAME', 'CATEGORY', 'BRAND', 'QUANTITY', 'SERIAL NO.',
//       'ASSIGNED TO', 'ASSET CODE', 'MANUFACTURER', 'PURCHASE DATE',
//       'WARRANTY END DATE', 'INVOICE NO.', 'CREATED DATE', 'IS WORKING?',
//       'CONFIRMATION', 'RETURN ASSET'
//     ];
//     const escapeCSV = (str) => `"${String(str || '').replace(/"/g, '""')}"`;
//     const data = assets.map((asset, index) => {
//       const returnStatus = asset.isReturned === 'Y' ? 'Returned' :
//                           asset.returnRequestStatus === '1' ? 'Request Pending' :
//                           asset.returnRequestStatus === 'denied' ? 'Return Denied' : 'No request';
//       return [
//         index + 1,
//         escapeCSV(asset.assetName),
//         escapeCSV(asset.category),
//         escapeCSV(asset.brand),
//         escapeCSV(asset.quantity),
//         escapeCSV(asset.serialNumber),
//         escapeCSV(asset.employee),
//         escapeCSV(asset.assetCode || 'N/A'),
//         escapeCSV(asset.manufacturer || 'N/A'),
//         escapeCSV(asset.purchaseDate ? dayjs(asset.purchaseDate).format('DD/MM/YYYY') : 'N/A'),
//         escapeCSV(asset.warrantyEndDate ? dayjs(asset.warrantyEndDate).format('DD/MM/YYYY') : 'N/A'),
//         escapeCSV(asset.invoiceNumber || 'N/A'),
//         escapeCSV(asset.createdAt ? dayjs(asset.createdAt).format('DD/MM/YYYY') : 'N/A'),
//         escapeCSV(asset.isWorking),
//         escapeCSV(asset.employeeId ? asset.confirmation : '—'),
//         escapeCSV(returnStatus),
//       ].join(',');
//     });
//     const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...data].join("\n");
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "assets_report.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };
 
//   const handleSave = async () => {
//     if (Number(formData.quantity) < 1) {
//       Swal.fire({ icon: 'error', title: 'Invalid Quantity', text: 'The quantity must be at least 1.', });
//       return;
//     }
//     if (maxQuantity !== null && Number(formData.quantity) > maxQuantity) {
//       Swal.fire({ icon: 'error', title: 'Invalid Quantity', text: `The quantity for "${formData.assetName}" cannot exceed the available stock of ${Math.floor(maxQuantity)}.`, });
//       return;
//     }

//     const requiredFields = {
//         'Category': formData.categoryId,
//         'Brand': formData.brandId,
//         'Asset Product Name': formData.productId,
//         'Quantity': formData.quantity && Number(formData.quantity) >= 1,
//         'Employee': formData.employeeId,
//         'Serial Number': formData.serialNumber,
//         'Manufacturer': formData.manufacturer,
//         'Asset Code': formData.assetCode,
//         'Invoice Number': formData.invoiceNumber,
//         'Purchase Date': purchaseDate,
//         'Warranty End Date': warrantyEndDate,
//         'Asset Image': assetImageFile,
//     };
//     const missingFields = Object.keys(requiredFields).filter(key => !requiredFields[key]);
//     if (missingFields.length > 0) {
//       Swal.fire({ icon: 'warning', title: 'Missing Information', text: `Please fill all the following required fields: ${missingFields.join(', ')}.`, });
//       return;
//     }

//     setSubmittingForm(true);
//     const payload = new FormData();
//     payload.append('assets_name', formData.assetName);
//     payload.append('quantity', formData.quantity);
//     payload.append('assets_category_id', formData.categoryId);
//     payload.append('brand_id', formData.brandId);
//     payload.append('employee_id', formData.employeeId);
//     payload.append('product_id', formData.productId);
//     payload.append('serial_number', formData.serialNumber);
//     payload.append('purchase_date', purchaseDate.format('YYYY-MM-DD'));
//     payload.append('manufacturer', formData.manufacturer);
//     payload.append('is_working', formData.isWorking);
//     payload.append('company_asset_code', formData.assetCode);
//     payload.append('invoice_number', formData.invoiceNumber);
//     payload.append('warranty_end_date', warrantyEndDate.format('YYYY-MM-DD'));
//     if (formData.assetNote) payload.append('asset_note', formData.assetNote);
//     if (assetImageFile) payload.append('asset_image', assetImageFile, assetImageFile.name);

//     try {
//       await axios.post(ASSETS_API_URL, payload);
//       const successTitle = 'Asset Allocated!';
//       const allocatedEmployee = employees.find(e => e.id === formData.employeeId);
//       const successText = `The asset "${formData.assetName}" has been successfully assigned to ${allocatedEmployee.name}.`;
//       Swal.fire({ icon: 'success', title: successTitle, text: successText });
//       setShowForm(false);
//       resetForm();
//       fetchAssets();
//     } catch (error) {
//       console.error(`Error saving asset:`, error);
//       const errorMessage = error.response?.data ? Object.values(error.response.data).flat().join('; ') : "An unexpected server error occurred.";
//       Swal.fire({ icon: 'error', title: 'Submission Failed', text: errorMessage });
//     } finally {
//       setSubmittingForm(false);
//     }
//   };
 
//   const handleReturnActionClick = (assetId, action, assetName) => {
//     setAssetActionInfo({ assetId, action, assetName });
//     setConfirmationDialogOpen(true);
//   };
 
//   const handleConfirmationDialogConfirm = async () => {
//     const { assetId, action } = assetActionInfo;
//     if (!assetId || !action) return;
//     setUpdatingReturnId(assetId);
//     setConfirmationDialogOpen(false);
//     try {
//       const response = await axios.patch(`${ASSETS_API_URL}${assetId}/`, { action });
//       Swal.fire({ icon: 'success', title: 'Action Successful', text: response.data.message });
//       await fetchAssets();
//       if (selectedAsset && selectedAsset.id === assetId) {
//         const freshResponse = await axios.get(`${ASSETS_API_URL}${assetId}/`);
//         const refreshedAsset = { ...selectedAsset, returnRequestStatus: freshResponse.data.return_request_status, isReturned: freshResponse.data.returned };
//         setSelectedAsset(refreshedAsset);
//       }
//     } catch (error) {
//       console.error("Error updating return status:", error);
//       const errorMessage = error.response?.data?.message || "Failed to update status.";
//       Swal.fire({ icon: 'error', title: 'Action Failed', text: errorMessage });
//     } finally {
//       setUpdatingReturnId(null);
//       setAssetActionInfo({ assetId: null, action: '', assetName: '' });
//     }
//   };

//   const handleViewDetails = (asset) => {
//     setSelectedAsset(asset);
//     setDetailsOpen(true);
//   };

//   const handleCloseDetails = () => {
//     setDetailsOpen(false);
//     setSelectedAsset(null);
//   };
 
//   const handleDownloadPdf = () => {
//     const input = assetDetailsRef.current;
//     if (!input) return;
 
//     html2canvas(input, { scale: 2, useCORS: true })
//       .then((canvas) => {
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF('p', 'mm', 'a4');
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = pdf.internal.pageSize.getHeight();
 
//         pdf.setDrawColor(0);
//         pdf.rect(5, 5, pdfWidth - 10, pdfHeight - 10);
 
//         const headerY = 10;
//         pdf.addImage(vetrinaLogo, 'JPEG', 10, headerY, 40, 10);
//         pdf.setFontSize(20);
//         pdf.setTextColor('#8C257C');
//         pdf.text('Asset Details', pdfWidth / 2, headerY + 8, { align: 'center' });
 
//         const headerDividerY = headerY + 15;
//         pdf.setDrawColor(140, 37, 124);
//         pdf.line(10, headerDividerY, pdfWidth - 10, headerDividerY);
 
//         const contentMargin = 10;
//         const contentStartY = headerDividerY + 5;
//         const contentWidth = pdfWidth - (contentMargin * 2);
//         const canvasWidth = canvas.width;
//         const canvasHeight = canvas.height;
//         const contentHeight = (canvasHeight * contentWidth) / canvasWidth;
//         pdf.addImage(imgData, 'PNG', contentMargin, contentStartY, contentWidth, contentHeight);
 
//         const footerDividerY = pdfHeight - 20;
//         pdf.setDrawColor(140, 37, 124);
//         pdf.line(10, footerDividerY, pdfWidth - 10, footerDividerY);
 
//         pdf.setFontSize(10);
//         pdf.setTextColor(0, 0, 0);
//         pdf.setFont('helvetica', 'bold');
//         const footerText = 'Vetrina Healthcare Pvt. Ltd., Corporate Office - Punyai Pride, 1st Floor, Shivshambho Nagar, Lane 3A, Katraj Kondhwa Road, Katraj, Pune - 411046.';
//         const splitFooter = pdf.splitTextToSize(footerText, pdfWidth - 20);
//         pdf.text(splitFooter, pdfWidth / 2, footerDividerY + 5, { align: 'center' });
 
//         pdf.save(`asset-details-${selectedAsset.assetName.replace(/\s/g, '_')}.pdf`);
//       });
//   };

//   const filteredAssets = useMemo(() => {
//     if (!searchQuery) return assets;
//     const lowercasedQuery = searchQuery.toLowerCase();
//     return assets.filter((asset) => Object.values(asset).some((value) => String(value).toLowerCase().includes(lowercasedQuery)));
//   }, [assets, searchQuery]);

//   const paginatedAssets = filteredAssets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   const getConfirmationChip = (status) => {
//     if (status === 'accepted') return <Chip label="Confirmed" size="small" sx={{ backgroundColor: 'green', color: 'white' }} />;
//     if (status === 'rejected') return <Chip label="Rejected" color="error" size="small" />;
//     return <Chip label="Pending" color="warning" size="small" />;
//   };

//   const renderReturnActionCell = (asset) => {
//     if (updatingReturnId === asset.id) return <CircularProgress size={24} />;
//     if (asset.isReturned === 'Y') return <Chip label="Returned" size="small" sx={{ backgroundColor: 'green', color: 'white' }} />;
//     if (!asset.employeeId) return <Typography variant="caption" color="text.secondary">—</Typography>;
//     if (asset.confirmation !== 'accepted') return <Chip label="No request" size="small" color="warning" />;
//     if (asset.returnRequestStatus === '1') {
//       return (
//         <Box display="flex" gap={1} flexWrap="wrap">
//           <Button variant="contained" size="small" sx={{ backgroundColor: THEME_PURPLE, '&:hover': { backgroundColor: THEME_PURPLE_HOVER } }} onClick={() => handleReturnActionClick(asset.id, 'return_yes', asset.assetName)}>Received</Button>
//           <Button variant="contained" color="error" size="small" onClick={() => handleReturnActionClick(asset.id, 'return_no', asset.assetName)}>Not Received</Button>
//         </Box>
//       );
//     }
//     if (asset.returnRequestStatus === 'denied') return <Chip label="Return Denied" color="error" size="small" />;
//     return <Chip label="No request" size="small" color="warning" />;
//   };
 
//   const quantityLabel = maxQuantity !== null ? `Quantity (Max: ${Math.floor(maxQuantity)})` : 'Quantity';

//   if (loadingDropdowns) return <Box display="flex" justifyContent="center" alignItems="center" p={5}><CircularProgress /><Typography ml={2}>Loading configuration...</Typography></Box>;
//   if (dropdownError) return <Box p={3} textAlign="center"><Button variant="contained" onClick={fetchDropdownData} sx={{ backgroundColor: THEME_PURPLE }}>Retry Loading Data</Button></Box>;

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <CardContent sx={{ p: { xs: 1.5, sm: 3 } }}>
//           <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//             <Typography variant="h4" fontWeight="bold" sx={{color:"#8C257C"}}> Assets </Typography>
//           </Box>
//           <br />
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
//               <Button variant="contained" onClick={handleShowFormToggle} disabled={submittingForm} sx={{ backgroundColor: THEME_PURPLE, '&:hover': { backgroundColor: THEME_PURPLE_HOVER } }}>{showForm ? '− Cancel' : '+ Allocate Assets'}</Button>
//               <Button variant="contained" onClick={handleExportReport} sx={{ backgroundColor: THEME_PURPLE, '&:hover': { backgroundColor: THEME_PURPLE_HOVER } }}>Export Report</Button>
//             </Box>
//             <TextField size="small" placeholder="Search assets..." variant="outlined" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} sx={{ width: { xs: '100%', sm: 300 } }} />
//           </Box>

//           {showForm && (
//             <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, mb: 4 }}>
//               <Typography variant="h6" gutterBottom fontWeight="bold" color="#8C257C">Allocate New Asset</Typography>
//               <Grid container spacing={2.5}>
//                 <Grid item xs={12} sm={6} md={4}><Autocomplete options={categories} getOptionLabel={(o) => o.name} value={categories.find(c => c.id === formData.categoryId) || null} onChange={(e, v) => { setFormData(p => ({...p, categoryId: v?.id||'', productId: '', assetName: ''})); setMaxQuantity(null); setQuantityError(''); }} renderInput={(params) => <TextField {...params} label="Category" required size="small" />} /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><Autocomplete options={brands} getOptionLabel={(o) => o.name} value={brands.find(b => b.id === formData.brandId) || null} onChange={(e, v) => { setFormData(p => ({...p, brandId: v?.id||'', productId: '', assetName: ''})); setMaxQuantity(null); setQuantityError(''); }} renderInput={(params) => <TextField {...params} label="Brand" required size="small" />} /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><Autocomplete options={assetNameOptions} getOptionLabel={(o) => o.label || ''} value={assetNameOptions.find(p => p.id === formData.productId) || null} onChange={(e, v) => { setFormData(p => ({ ...p, productId: v?.id || '', assetName: v?.name || '', quantity: v && p.quantity > v.inStock ? Math.floor(v.inStock) : p.quantity, })); setMaxQuantity(v?.inStock || null); setQuantityError(''); }} disabled={!formData.categoryId || !formData.brandId} loading={loadingAssetNames} renderInput={(params) => <TextField {...params} label="Asset Product Name" required size="small" placeholder={!formData.categoryId || !formData.brandId ? 'Select Category & Brand' : ''} InputProps={{ ...params.InputProps, endAdornment: ( <>{loadingAssetNames ? <CircularProgress color="inherit" size={20} /> : null}{params.InputProps.endAdornment}</> ), }} />} /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><TextField name="quantity" label={quantityLabel} type="number" value={formData.quantity} onChange={handleInputChange} required fullWidth size="small" InputProps={{ inputProps: { min: 1, max: maxQuantity !== null ? Math.floor(maxQuantity) : undefined } }} error={!!quantityError} helperText={quantityError} /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><Autocomplete options={employees} getOptionLabel={(o) => o.name} value={employees.find(e => e.id === formData.employeeId) || null} onChange={(e, v) => setFormData(p => ({...p, employeeId: v?.id||''}))} renderInput={(params) => <TextField {...params} label="Employee" required size="small" />} /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><TextField name="serialNumber" label="Serial Number" value={formData.serialNumber} onChange={handleInputChange} required fullWidth size="small" /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><TextField name="manufacturer" label="Manufacturer" value={formData.manufacturer} onChange={handleInputChange} required fullWidth size="small" /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><TextField name="assetCode" label="Asset Code" value={formData.assetCode} onChange={handleInputChange} required fullWidth size="small" /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><FormControl fullWidth size="small" required><InputLabel>Is Working?</InputLabel><Select name="isWorking" value={formData.isWorking} onChange={handleInputChange} label="Is Working?"><MenuItem value="Yes">Yes</MenuItem><MenuItem value="No">No</MenuItem><MenuItem value="Needs Repair">Needs Repair</MenuItem></Select></FormControl></Grid>
//                 <Grid item xs={12} sm={6} md={4}><TextField name="invoiceNumber" label="Invoice Number" value={formData.invoiceNumber} onChange={handleInputChange} required fullWidth size="small" /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><DatePicker label="Purchase Date" value={purchaseDate} onChange={setPurchaseDate} format="DD-MM-YYYY" slotProps={{ textField: { fullWidth: true, size: 'small', required: true } }} maxDate={dayjs()} /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><DatePicker label="Warranty End Date" value={warrantyEndDate} onChange={setWarrantyEndDate} format="DD-MM-YYYY" slotProps={{ textField: { fullWidth: true, size: 'small', required: true } }} minDate={purchaseDate ? dayjs(purchaseDate).add(1, 'day') : null} disabled={!purchaseDate} /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><Button sx={{ borderColor: THEME_PURPLE, color: THEME_PURPLE, height: '100%' }} variant="outlined" component="label" fullWidth disabled={submittingForm}>Upload Image *<input type="file" hidden accept="image/*" onChange={handleImageChange} /></Button><Typography variant="caption" display="block" sx={{ mt: 1, wordBreak: 'break-all', textAlign: 'center' }}>{formData.imageName || "No file chosen"}</Typography></Grid>
//               </Grid>
//               <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
//                 <Button variant="outlined" onClick={resetForm} disabled={submittingForm}>Reset</Button>
//                 <Button variant="contained" onClick={handleSave} disabled={submittingForm} sx={{ backgroundColor: THEME_PURPLE, '&:hover': { backgroundColor: THEME_PURPLE_HOVER } }}>{submittingForm ? <CircularProgress size={24} color="inherit" /> : 'Save Asset'}</Button>
//               </Box>
//             </Paper>
//           )}

//           <Box>
//             {loadingAssets && assets.length === 0 ? <Box display="flex" justifyContent="center" p={5}><CircularProgress /></Box> : assetsError ? <Paper sx={{p:3, textAlign:'center', color:'red'}}>{assetsError}</Paper> : (
//               <Paper variant="outlined">
//                 <TableContainer>
//                   <Table size="small">
//                     <TableHead sx={{ backgroundColor: THEME_PURPLE, '& .MuiTableCell-root': { color: 'white', fontWeight: 'bold' } }}>
//                       <TableRow>
//                           <TableCell>SR. NO.</TableCell>
//                           <TableCell>ASSIGNED TO</TableCell>
//                           <TableCell>CREATED DATE</TableCell>
//                           <TableCell>CONFIRMATION</TableCell>
//                           <TableCell>RETURN</TableCell>
//                           <TableCell>ACTION</TableCell>
//                       </TableRow>
//                     </TableHead>    
//                     <TableBody>
//                       {paginatedAssets.length > 0 ? paginatedAssets.map((asset, index) => (
//                         <TableRow key={asset.id} hover>
//                           <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                           <TableCell>{asset.employee}</TableCell>
//                           <TableCell>{asset.createdAt ? dayjs(asset.createdAt).format('DD/MM/YYYY') : 'N/A'}</TableCell>
//                           <TableCell>{asset.employeeId ? getConfirmationChip(asset.confirmation) : '—'}</TableCell>
//                           <TableCell>{renderReturnActionCell(asset)}</TableCell>
//                            <TableCell>
//                             <Button variant="contained" size="small" sx={{ backgroundColor: THEME_PURPLE, '&:hover': { backgroundColor: THEME_PURPLE_HOVER } }} onClick={() => handleViewDetails(asset)}>
//                               View Details
//                             </Button>
//                           </TableCell>
//                         </TableRow>
//                       )) : <TableRow><TableCell colSpan={6} align="center" sx={{ py: 5 }}>No records available.</TableCell></TableRow>}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
               
//                 <Box sx={{ p: 0.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//                   <Typography variant="body2" color="text.secondary">
//                     Showing {filteredAssets.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredAssets.length)} of {filteredAssets.length} results
//                   </Typography>
//                   <TablePagination
//                     rowsPerPageOptions={[5, 10, 15, 25]}
//                     component="div"
//                     count={filteredAssets.length}
//                     page={page}
//                     onPageChange={handleChangePage}
//                     rowsPerPage={rowsPerPage}
//                     onRowsPerPageChange={handleChangeRowsPerPage}
//                   />
//                 </Box>
//               </Paper>
//             )}
//           </Box>
//         </CardContent>

//       <Dialog open={confirmationDialogOpen} onClose={() => !updatingReturnId && setConfirmationDialogOpen(false)}>
//         <DialogTitle sx={{backgroundColor: THEME_PURPLE, color: 'white'}}>Confirm Return Action</DialogTitle>
//         <DialogContent sx={{pt: '20px !important'}}>
//           <DialogContentText>Asset: <Typography component="span" fontWeight="bold">{`"${assetActionInfo.assetName}"`}</Typography>. Please confirm: <Typography component="span" fontWeight="bold">{assetActionInfo.action === 'return_yes' ? 'Confirm as Received' : 'Confirm as Not Received'}?</Typography></DialogContentText>
//         </DialogContent>
//         <DialogActions sx={{p: '16px 24px'}}>
//           <Button onClick={() => setConfirmationDialogOpen(false)} disabled={!!updatingReturnId} variant="outlined">Cancel</Button>
//           <Button onClick={handleConfirmationDialogConfirm} variant="contained" disabled={!!updatingReturnId} sx={{backgroundColor: THEME_PURPLE, '&:hover': {backgroundColor: THEME_PURPLE_HOVER}}}>{updatingReturnId === assetActionInfo.assetId ? <CircularProgress size={24} color="inherit" /> : 'Confirm'}</Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog open={detailsOpen} onClose={handleCloseDetails} fullWidth maxWidth="md">
//         <DialogTitle sx={{ backgroundColor: THEME_PURPLE, color: 'white' }}>
//             Asset Details
//         </DialogTitle>
//         <DialogContent>
//             <Box ref={assetDetailsRef} sx={{ p: 2 }}>
//                 {selectedAsset && (
//                     <Grid container spacing={2}>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Assigned To:</strong> {selectedAsset.employee || 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Asset Name:</strong> {selectedAsset.assetName}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Category:</strong> {selectedAsset.category || 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Brand:</strong> {selectedAsset.brand || 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Quantity:</strong> {selectedAsset.quantity || 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Serial No.:</strong> {selectedAsset.serialNumber || 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Asset Code:</strong> {selectedAsset.assetCode || 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Manufacturer:</strong> {selectedAsset.manufacturer || 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Created Date:</strong> {selectedAsset.createdAt ? dayjs(selectedAsset.createdAt).format('DD/MM/YYYY') : 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Purchase Date:</strong> {selectedAsset.purchaseDate ? dayjs(selectedAsset.purchaseDate).format('DD/MM/YYYY') : 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Warranty End:</strong> {selectedAsset.warrantyEndDate ? dayjs(selectedAsset.warrantyEndDate).format('DD/MM/YYYY') : 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Invoice No.:</strong> {selectedAsset.invoiceNumber || 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}>
//                             <Box display="flex" alignItems="center" gap={1}>
//                                <Typography variant="body1"><strong>Is Working:</strong></Typography>
//                                <Chip label={selectedAsset.isWorking} size="small" sx={{ backgroundColor: selectedAsset.isWorking === 'Yes' ? 'green' : selectedAsset.isWorking === 'No' ? 'red' : 'orange', color: 'white', fontWeight: 'bold' }} />
//                             </Box>
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <Box display="flex" alignItems="center" gap={1}>
//                                 <Typography variant="body1"><strong>Confirmation:</strong></Typography>
//                                 {selectedAsset.employeeId ? getConfirmationChip(selectedAsset.confirmation) : '—'}
//                              </Box>
//                         </Grid>
//                         <Grid item xs={12}>
//                             <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
//                                 <Typography variant="body1"><strong>Return Status:</strong></Typography>
//                                 {renderReturnActionCell(selectedAsset)}
//                             </Box>
//                         </Grid>
//                          {selectedAsset.imageUrl && (
//                             <Grid item xs={12}>
//                                 <Typography variant="body1"><strong>Asset Image:</strong></Typography>
//                                 <Box mt={1}>
//                                     <a href={selectedAsset.imageUrl} target="_blank" rel="noopener noreferrer">
//                                         <img src={selectedAsset.imageUrl} alt={selectedAsset.assetName} style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '4px', border: '1px solid #ddd' }} crossOrigin="anonymous" />
//                                     </a>
//                                  </Box>
//                             </Grid>
//                          )}
//                     </Grid>
//                 )}
//             </Box>
//         </DialogContent>
//         <DialogActions sx={{ p: '16px 24px', justifyContent: 'space-between' }}>
//             <Button onClick={handleDownloadPdf} variant="contained" sx={{ backgroundColor: THEME_ORANGE, '&:hover': { backgroundColor: '#e67e22' } }}>Download PDF</Button>
//             <Button onClick={handleCloseDetails} variant="contained" sx={{ backgroundColor: THEME_PURPLE, '&:hover': { backgroundColor: THEME_PURPLE_HOVER } }}>Close</Button>
//         </DialogActions>
//     </Dialog>
//     </LocalizationProvider>
//   );
// };

// export default Assets;






// import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import {
//   Box,
//   Button,
//   CardContent,
//   Chip,
//   CircularProgress,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   FormControl,
//   Grid,
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
//   Autocomplete,
//   Pagination,
//   Skeleton,
// } from '@mui/material';
// import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import dayjs from 'dayjs';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import vetrinaLogo from '../../Assests/vetrinalogo.jpg';


// const THEME_PURPLE = '#8C257C';
// const THEME_ORANGE = '#F58E35';
// const THEME_PURPLE_HOVER = '#6d1d60';

// const API_BASE_URL = 'https://tdtlworld.com/hrms-backend';
// const ASSETS_API_URL = `${API_BASE_URL}/assets/`;
// const CATEGORIES_API_URL = `${API_BASE_URL}/api/assets-category/`;
// const BRANDS_API_URL = `${API_BASE_URL}/api/assets-brand/`;
// const EMPLOYEES_API_URL = `${API_BASE_URL}/employee-dropdown/`;
// const ASSET_NAMES_API_URL = `${API_BASE_URL}/apis/get_available_qty/`;

// const initialFormState = {
//   productId: '',
//   assetName: '',
//   quantity: 1,
//   categoryId: '',
//   brandId: '',
//   employeeId: '',
//   manufacturer: '',
//   serialNumber: '',
//   assetCode: '',
//   isWorking: 'Yes',
//   invoiceNumber: '',
//   assetNote: '',
//   imageName: '',
// };

// const Assets = () => {
//   const [assets, setAssets] = useState([]);
//   const [loadingAssets, setLoadingAssets] = useState(true);
//   const [assetsError, setAssetsError] = useState(null);

//   const [categories, setCategories] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [loadingDropdowns, setLoadingDropdowns] = useState(true);
//   const [dropdownError, setDropdownError] = useState(null);

//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState(initialFormState);
//   const [purchaseDate, setPurchaseDate] = useState(null);
//   const [warrantyEndDate, setWarrantyEndDate] = useState(null);
//   const [assetImageFile, setAssetImageFile] = useState(null);
//   const [submittingForm, setSubmittingForm] = useState(false);
 
//   const [assetNameOptions, setAssetNameOptions] = useState([]);
//   const [loadingAssetNames, setLoadingAssetNames] = useState(false);

//   const [maxQuantity, setMaxQuantity] = useState(null);
//   const [quantityError, setQuantityError] = useState('');

//   const [searchQuery, setSearchQuery] = useState('');
 
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
//   const [assetActionInfo, setAssetActionInfo] = useState({ assetId: null, action: '', assetName: '' });
//   const [updatingReturnId, setUpdatingReturnId] = useState(null);

//   const [detailsOpen, setDetailsOpen] = useState(false);
//   const [selectedAsset, setSelectedAsset] = useState(null);
//   const assetDetailsRef = useRef(null);

//   const fetchAssets = useCallback(async () => {
//     if (employees.length === 0 && !loadingDropdowns) return;
//     setLoadingAssets(true);
//     setAssetsError(null);
//     try {
//       const employeeMap = new Map(employees.map(e => [e.id, e.name]));
//       const response = await axios.get(ASSETS_API_URL);
//       const transformedData = response.data.map((asset) => ({
//         id: asset.id,
//         assetName: asset.assets_name,
//         quantity: asset.quantity,
//         category: asset.category_name,
//         categoryId: asset.assets_category_id,
//         brand: asset.brand_name,
//         brandId: asset.brand_id,
//         employee: (asset.employee_name || (asset.employee_id ? employeeMap.get(asset.employee_id) : null)) || 'Unassigned',
//         employeeId: asset.employee_id,
//         manufacturer: asset.manufacturer,
//         serialNumber: asset.serial_number,
//         assetCode: asset.company_asset_code,
//         isWorking: asset.is_working,
//         purchaseDate: asset.purchase_date,
//         invoiceNumber: asset.invoice_number,
//         warrantyEndDate: asset.warranty_end_date,
//         assetNote: asset.asset_note,
//         imageUrl: asset.asset_image,
//         confirmation: asset.employee_confirmation || 'pending',
//         returnRequestStatus: asset.return_request_status,
//         isReturned: asset.returned,
//         createdAt: asset.created_at,
//       }));
//       const sortedData = transformedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       setAssets(sortedData);
//     } catch (error) {
//       console.error("Error fetching assets:", error);
//       const errorMessage = error.response?.data?.detail || "Could not fetch assets.";
//       setAssetsError(errorMessage);
//       Swal.fire({ icon: 'error', title: 'Failed to Load Assets', text: errorMessage });
//     } finally {
//       setLoadingAssets(false);
//     }
//   }, [employees, loadingDropdowns]);

//   const fetchDropdownData = useCallback(async () => {
//     setLoadingDropdowns(true);
//     setDropdownError(null);
//     try {
//       const [categoriesRes, brandsRes, employeesRes] = await Promise.all([
//         axios.get(CATEGORIES_API_URL),
//         axios.get(BRANDS_API_URL),
//         axios.get(EMPLOYEES_API_URL),
//       ]);
//       setCategories(categoriesRes.data.map(c => ({ id: c.value, name: c.label })));
//       setBrands(brandsRes.data.map(b => ({ id: b.value, name: b.label })));
//       setEmployees(employeesRes.data.map(e => ({ id: e.emp_id, name: `(${e.emp_id} - ${e.label} - ${e.division_name})` })));
//     } catch (error) {
//       console.error("Error fetching dropdown data:", error);
//       const errorMessage = "Could not load required form data. Please refresh.";
//       setDropdownError(errorMessage);
//       Swal.fire({ icon: 'error', title: 'Configuration Error', text: errorMessage });
//     } finally {
//       setLoadingDropdowns(false);
//     }
//   }, []);

//   useEffect(() => { fetchDropdownData(); }, [fetchDropdownData]);
//   useEffect(() => { if (!loadingDropdowns) fetchAssets(); }, [loadingDropdowns, fetchAssets]);
//   useEffect(() => { setPage(0); }, [searchQuery, rowsPerPage]);
//   useEffect(() => {
//     if (purchaseDate && warrantyEndDate && dayjs(warrantyEndDate).isBefore(dayjs(purchaseDate))) {
//       setWarrantyEndDate(null);
//     }
//   }, [purchaseDate, warrantyEndDate]);
 
//   useEffect(() => {
//     const fetchAssetNames = async () => {
//       if (formData.categoryId && formData.brandId) {
//         setLoadingAssetNames(true);
//         setAssetNameOptions([]);
//         try {
//           const response = await axios.get(`${ASSET_NAMES_API_URL}?category_id=${formData.categoryId}&brand_id=${formData.brandId}`);
//           const formattedOptions = response.data.map(p => ({
//             id: p.product_id,
//             name: p.product_name,
//             label: `${p.product_name} (In Stock: ${Math.floor(p.in_stock)})`,
//             inStock: p.in_stock,
//           }));
//           setAssetNameOptions(formattedOptions);
//         } catch (error) {
//           console.error("Error fetching asset names:", error);
//           Swal.fire({ icon: 'error', title: 'Could not fetch Asset Names', text: 'Please check your category and brand selection or try again later.' });
//         } finally {
//           setLoadingAssetNames(false);
//         }
//       } else {
//         setAssetNameOptions([]);
//       }
//     };
//     fetchAssetNames();
//   }, [formData.categoryId, formData.brandId]);

//   const handleInputChange = (event) => {
//     const { name: inputName, value } = event.target;
 
//     if (inputName === 'manufacturer') {
//       if (/^[a-zA-Z\s]*$/.test(value)) {
//         setFormData((prev) => ({ ...prev, [inputName]: value }));
//       }
//     } else if (inputName === 'assetCode' || inputName === 'serialNumber' || inputName === 'invoiceNumber') {
//       if (/^[0-9]*$/.test(value)) {
//         setFormData((prev) => ({ ...prev, [inputName]: value }));
//       }
//     } else if (inputName === 'quantity') {
//       const numValue = Number(value);
//       if (numValue < 1) {
//         setQuantityError('Quantity must be at least 1.');
//       } else if (maxQuantity !== null && numValue > maxQuantity) {
//         setQuantityError(`Quantity cannot exceed the available stock of ${Math.floor(maxQuantity)}.`);
//       } else {
//         setQuantityError('');
//       }
//       setFormData((prev) => ({ ...prev, [inputName]: value }));
//     } else {
//       setFormData((prev) => ({ ...prev, [inputName]: value }));
//     }
//   };

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setAssetImageFile(file);
//       setFormData((prev) => ({ ...prev, imageName: file.name }));
//     }
//   };

//   const resetForm = useCallback(() => {
//     setFormData(initialFormState);
//     setPurchaseDate(null);
//     setWarrantyEndDate(null);
//     setAssetImageFile(null);
//     setMaxQuantity(null);
//     setQuantityError('');
//   }, []);

//   const handleShowFormToggle = () => {
//     setShowForm(!showForm);
//     if (showForm) resetForm();
//   };
 
//   const handlePaginationChange = (event, newPage) => {
//     setPage(newPage - 1);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleExportReport = () => {
//     const headers = [
//       'SR. NO.', 'ASSET PRODUCT NAME', 'CATEGORY', 'BRAND', 'QUANTITY', 'SERIAL NO.',
//       'ASSIGNED TO', 'ASSET CODE', 'MANUFACTURER', 'PURCHASE DATE',
//       'WARRANTY END DATE', 'INVOICE NO.', 'CREATED DATE', 'IS WORKING?',
//       'CONFIRMATION', 'RETURN ASSET'
//     ];
//     const escapeCSV = (str) => `"${String(str || '').replace(/"/g, '""')}"`;
//     const data = assets.map((asset, index) => {
//       const returnStatus = asset.isReturned === 'Y' ? 'Returned' :
//                           asset.returnRequestStatus === '1' ? 'Request Pending' :
//                           asset.returnRequestStatus === 'denied' ? 'Return Denied' : 'No request';
//       return [
//         index + 1,
//         escapeCSV(asset.assetName),
//         escapeCSV(asset.category),
//         escapeCSV(asset.brand),
//         escapeCSV(asset.quantity),
//         escapeCSV(asset.serialNumber),
//         escapeCSV(asset.employee),
//         escapeCSV(asset.assetCode || 'N/A'),
//         escapeCSV(asset.manufacturer || 'N/A'),
//         escapeCSV(asset.purchaseDate ? dayjs(asset.purchaseDate).format('DD/MM/YYYY') : 'N/A'),
//         escapeCSV(asset.warrantyEndDate ? dayjs(asset.warrantyEndDate).format('DD/MM/YYYY') : 'N/A'),
//         escapeCSV(asset.invoiceNumber || 'N/A'),
//         escapeCSV(asset.createdAt ? dayjs(asset.createdAt).format('DD/MM/YYYY') : 'N/A'),
//         escapeCSV(asset.isWorking),
//         escapeCSV(asset.employeeId ? asset.confirmation : '—'),
//         escapeCSV(returnStatus),
//       ].join(',');
//     });
//     const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...data].join("\n");
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "assets_report.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };
 
//   const handleSave = async () => {
//     if (Number(formData.quantity) < 1) {
//       Swal.fire({ icon: 'error', title: 'Invalid Quantity', text: 'The quantity must be at least 1.', });
//       return;
//     }
//     if (maxQuantity !== null && Number(formData.quantity) > maxQuantity) {
//       Swal.fire({ icon: 'error', title: 'Invalid Quantity', text: `The quantity for "${formData.assetName}" cannot exceed the available stock of ${Math.floor(maxQuantity)}.`, });
//       return;
//     }

//     const requiredFields = {
//         'Category': formData.categoryId, 'Brand': formData.brandId,
//         'Asset Product Name': formData.productId, 'Quantity': formData.quantity && Number(formData.quantity) >= 1,
//         'Employee': formData.employeeId, 'Serial Number': formData.serialNumber,
//         'Manufacturer': formData.manufacturer, 'Asset Code': formData.assetCode,
//         'Invoice Number': formData.invoiceNumber, 'Purchase Date': purchaseDate,
//         'Warranty End Date': warrantyEndDate, 'Asset Image': assetImageFile,
//     };
//     const missingFields = Object.keys(requiredFields).filter(key => !requiredFields[key]);
//     if (missingFields.length > 0) {
//       Swal.fire({ icon: 'warning', title: 'Missing Information', text: `Please fill all the following required fields: ${missingFields.join(', ')}.`, });
//       return;
//     }

//     setSubmittingForm(true);
//     const payload = new FormData();
//     payload.append('assets_name', formData.assetName);
//     payload.append('quantity', formData.quantity);
//     payload.append('assets_category_id', formData.categoryId);
//     payload.append('brand_id', formData.brandId);
//     payload.append('employee_id', formData.employeeId);
//     payload.append('product_id', formData.productId);
//     payload.append('serial_number', formData.serialNumber);
//     payload.append('purchase_date', purchaseDate.format('YYYY-MM-DD'));
//     payload.append('manufacturer', formData.manufacturer);
//     payload.append('is_working', formData.isWorking);
//     payload.append('company_asset_code', formData.assetCode);
//     payload.append('invoice_number', formData.invoiceNumber);
//     payload.append('warranty_end_date', warrantyEndDate.format('YYYY-MM-DD'));
//     if (formData.assetNote) payload.append('asset_note', formData.assetNote);
//     if (assetImageFile) payload.append('asset_image', assetImageFile, assetImageFile.name);

//     try {
//       await axios.post(ASSETS_API_URL, payload);
//       const successTitle = 'Asset Allocated!';
//       const allocatedEmployee = employees.find(e => e.id === formData.employeeId);
//       const successText = `The asset "${formData.assetName}" has been successfully assigned to ${allocatedEmployee.name}.`;
//       Swal.fire({ icon: 'success', title: successTitle, text: successText });
//       setShowForm(false);
//       resetForm();
//       fetchAssets();
//     } catch (error) {
//       console.error(`Error saving asset:`, error);
//       const errorMessage = error.response?.data ? Object.values(error.response.data).flat().join('; ') : "An unexpected server error occurred.";
//       Swal.fire({ icon: 'error', title: 'Submission Failed', text: errorMessage });
//     } finally {
//       setSubmittingForm(false);
//     }
//   };
 
//   const handleReturnActionClick = (assetId, action, assetName) => {
//     setAssetActionInfo({ assetId, action, assetName });
//     setConfirmationDialogOpen(true);
//   };
 
//   const handleConfirmationDialogConfirm = async () => {
//     const { assetId, action } = assetActionInfo;
//     if (!assetId || !action) return;
//     setUpdatingReturnId(assetId);
//     setConfirmationDialogOpen(false);
//     try {
//       const response = await axios.patch(`${ASSETS_API_URL}${assetId}/`, { action });
//       Swal.fire({ icon: 'success', title: 'Action Successful', text: response.data.message });
//       await fetchAssets();
//       if (selectedAsset && selectedAsset.id === assetId) {
//         const freshResponse = await axios.get(`${ASSETS_API_URL}${assetId}/`);
//         const refreshedAsset = { ...selectedAsset, returnRequestStatus: freshResponse.data.return_request_status, isReturned: freshResponse.data.returned };
//         setSelectedAsset(refreshedAsset);
//       }
//     } catch (error) {
//       console.error("Error updating return status:", error);
//       const errorMessage = error.response?.data?.message || "Failed to update status.";
//       Swal.fire({ icon: 'error', title: 'Action Failed', text: errorMessage });
//     } finally {
//       setUpdatingReturnId(null);
//       setAssetActionInfo({ assetId: null, action: '', assetName: '' });
//     }
//   };

//   const handleViewDetails = (asset) => {
//     setSelectedAsset(asset);
//     setDetailsOpen(true);
//   };

//   const handleCloseDetails = () => {
//     setDetailsOpen(false);
//     setSelectedAsset(null);
//   };
 
//   const handleDownloadPdf = () => {
//     const input = assetDetailsRef.current;
//     if (!input) return;
 
//     html2canvas(input, { scale: 2, useCORS: true })
//       .then((canvas) => {
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF('p', 'mm', 'a4');
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = pdf.internal.pageSize.getHeight();
 
//         pdf.setDrawColor(0);
//         pdf.rect(5, 5, pdfWidth - 10, pdfHeight - 10);
 
//         const headerY = 10;
//         pdf.addImage(vetrinaLogo, 'JPEG', 10, headerY, 40, 10);
//         pdf.setFontSize(20);
//         pdf.setTextColor('#8C257C');
//         pdf.text('Asset Details', pdfWidth / 2, headerY + 8, { align: 'center' });
 
//         const headerDividerY = headerY + 15;
//         pdf.setDrawColor(140, 37, 124);
//         pdf.line(10, headerDividerY, pdfWidth - 10, headerDividerY);
 
//         const contentMargin = 10;
//         const contentStartY = headerDividerY + 5;
//         const contentWidth = pdfWidth - (contentMargin * 2);
//         const canvasWidth = canvas.width;
//         const canvasHeight = canvas.height;
//         const contentHeight = (canvasHeight * contentWidth) / canvasWidth;
//         pdf.addImage(imgData, 'PNG', contentMargin, contentStartY, contentWidth, contentHeight);
 
//         const footerDividerY = pdfHeight - 20;
//         pdf.setDrawColor(140, 37, 124);
//         pdf.line(10, footerDividerY, pdfWidth - 10, footerDividerY);
 
//         pdf.setFontSize(10);
//         pdf.setTextColor(0, 0, 0);
//         pdf.setFont('helvetica', 'bold');
//         const footerText = 'Vetrina Healthcare Pvt. Ltd., Corporate Office - Punyai Pride, 1st Floor, Shivshambho Nagar, Lane 3A, Katraj Kondhwa Road, Katraj, Pune - 411046.';
//         const splitFooter = pdf.splitTextToSize(footerText, pdfWidth - 20);
//         pdf.text(splitFooter, pdfWidth / 2, footerDividerY + 5, { align: 'center' });
 
//         pdf.save(`asset-details-${selectedAsset.assetName.replace(/\s/g, '_')}.pdf`);
//       });
//   };

//   const filteredAssets = useMemo(() => {
//     if (!searchQuery) return assets;
//     const lowercasedQuery = searchQuery.toLowerCase();
//     return assets.filter((asset) => Object.values(asset).some((value) => String(value).toLowerCase().includes(lowercasedQuery)));
//   }, [assets, searchQuery]);

//   const paginatedAssets = filteredAssets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//   const startEntry = filteredAssets.length > 0 ? page * rowsPerPage + 1 : 0;
//   const endEntry = Math.min((page + 1) * rowsPerPage, filteredAssets.length);

//   const getConfirmationChip = (status) => {
//     if (status === 'accepted') return <Chip label="Confirmed" size="small" sx={{ backgroundColor: 'green', color: 'white' }} />;
//     if (status === 'rejected') return <Chip label="Rejected" color="error" size="small" />;
//     return <Chip label="Pending" color="warning" size="small" />;
//   };

//   const renderReturnActionCell = (asset) => {
//     if (updatingReturnId === asset.id) return <CircularProgress size={24} />;
//     if (asset.isReturned === 'Y') return <Chip label="Returned" size="small" sx={{ backgroundColor: 'green', color: 'white' }} />;
//     if (!asset.employeeId) return <Typography variant="caption" color="text.secondary">—</Typography>;
//     if (asset.confirmation !== 'accepted') return <Chip label="No request" size="small" color="warning" />;
//     if (asset.returnRequestStatus === '1') {
//       return (
//         <Box display="flex" gap={1} flexWrap="wrap">
//           <Button variant="contained" size="small" sx={{ backgroundColor: THEME_PURPLE, '&:hover': { backgroundColor: THEME_PURPLE_HOVER } }} onClick={() => handleReturnActionClick(asset.id, 'return_yes', asset.assetName)}>Received</Button>
//           <Button variant="contained" color="error" size="small" onClick={() => handleReturnActionClick(asset.id, 'return_no', asset.assetName)}>Not Received</Button>
//         </Box>
//       );
//     }
//     if (asset.returnRequestStatus === 'denied') return <Chip label="Return Denied" color="error" size="small" />;
//     return <Chip label="No request" size="small" color="warning" />;
//   };
 
//   const quantityLabel = maxQuantity !== null ? `Quantity (Max: ${Math.floor(maxQuantity)})` : 'Quantity';

//   if (loadingDropdowns) return <Box display="flex" justifyContent="center" alignItems="center" p={5}><CircularProgress /><Typography ml={2}>Loading configuration...</Typography></Box>;
//   if (dropdownError) return <Box p={3} textAlign="center"><Button variant="contained" onClick={fetchDropdownData} sx={{ backgroundColor: THEME_PURPLE }}>Retry Loading Data</Button></Box>;

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <CardContent sx={{ p: { xs: 1.5, sm: 3 } }}>
//           <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//             <Typography variant="h4" fontWeight="bold" sx={{color:"#8C257C"}}> Assets </Typography>
//           </Box>
//           <br />
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
//               <Button variant="contained" onClick={handleShowFormToggle} disabled={submittingForm} sx={{ backgroundColor: THEME_PURPLE, '&:hover': { backgroundColor: THEME_PURPLE_HOVER } }}>{showForm ? '− Cancel' : '+ Allocate Assets'}</Button>
//               <Button variant="contained" onClick={handleExportReport} sx={{ backgroundColor: THEME_PURPLE, '&:hover': { backgroundColor: THEME_PURPLE_HOVER } }}>Export Report</Button>
//             </Box>
//             <TextField size="small" placeholder="Search assets..." variant="outlined" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} sx={{ width: { xs: '100%', sm: 300 } }} />
//           </Box>

//           {showForm && (
//             <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, mb: 4 }}>
//               <Typography variant="h6" gutterBottom fontWeight="bold" color="#8C257C">Allocate New Asset</Typography>
//               <Grid container spacing={2.5}>
//                 <Grid item xs={12} sm={6} md={4}><Autocomplete options={categories} getOptionLabel={(o) => o.name} value={categories.find(c => c.id === formData.categoryId) || null} onChange={(e, v) => { setFormData(p => ({...p, categoryId: v?.id||'', productId: '', assetName: ''})); setMaxQuantity(null); setQuantityError(''); }} renderInput={(params) => <TextField {...params} label="Category" required size="small" />} /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><Autocomplete options={brands} getOptionLabel={(o) => o.name} value={brands.find(b => b.id === formData.brandId) || null} onChange={(e, v) => { setFormData(p => ({...p, brandId: v?.id||'', productId: '', assetName: ''})); setMaxQuantity(null); setQuantityError(''); }} renderInput={(params) => <TextField {...params} label="Brand" required size="small" />} /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><Autocomplete options={assetNameOptions} getOptionLabel={(o) => o.label || ''} value={assetNameOptions.find(p => p.id === formData.productId) || null} onChange={(e, v) => { setFormData(p => ({ ...p, productId: v?.id || '', assetName: v?.name || '', quantity: v && p.quantity > v.inStock ? Math.floor(v.inStock) : p.quantity, })); setMaxQuantity(v?.inStock || null); setQuantityError(''); }} disabled={!formData.categoryId || !formData.brandId} loading={loadingAssetNames} renderInput={(params) => <TextField {...params} label="Asset Product Name" required size="small" placeholder={!formData.categoryId || !formData.brandId ? 'Select Category & Brand' : ''} InputProps={{ ...params.InputProps, endAdornment: ( <>{loadingAssetNames ? <CircularProgress color="inherit" size={20} /> : null}{params.InputProps.endAdornment}</> ), }} />} /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><TextField name="quantity" label={quantityLabel} type="number" value={formData.quantity} onChange={handleInputChange} required fullWidth size="small" InputProps={{ inputProps: { min: 1, max: maxQuantity !== null ? Math.floor(maxQuantity) : undefined } }} error={!!quantityError} helperText={quantityError} /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><Autocomplete options={employees} getOptionLabel={(o) => o.name} value={employees.find(e => e.id === formData.employeeId) || null} onChange={(e, v) => setFormData(p => ({...p, employeeId: v?.id||''}))} renderInput={(params) => <TextField {...params} label="Employee" required size="small" />} /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><TextField name="serialNumber" label="Serial Number" value={formData.serialNumber} onChange={handleInputChange} required fullWidth size="small" /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><TextField name="manufacturer" label="Manufacturer" value={formData.manufacturer} onChange={handleInputChange} required fullWidth size="small" /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><TextField name="assetCode" label="Asset Code" value={formData.assetCode} onChange={handleInputChange} required fullWidth size="small" /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><FormControl fullWidth size="small" required><InputLabel>Is Working?</InputLabel><Select name="isWorking" value={formData.isWorking} onChange={handleInputChange} label="Is Working?"><MenuItem value="Yes">Yes</MenuItem><MenuItem value="No">No</MenuItem><MenuItem value="Needs Repair">Needs Repair</MenuItem></Select></FormControl></Grid>
//                 <Grid item xs={12} sm={6} md={4}><TextField name="invoiceNumber" label="Invoice Number" value={formData.invoiceNumber} onChange={handleInputChange} required fullWidth size="small" /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><DatePicker label="Purchase Date" value={purchaseDate} onChange={setPurchaseDate} format="DD-MM-YYYY" slotProps={{ textField: { fullWidth: true, size: 'small', required: true } }} maxDate={dayjs()} /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><DatePicker label="Warranty End Date" value={warrantyEndDate} onChange={setWarrantyEndDate} format="DD-MM-YYYY" slotProps={{ textField: { fullWidth: true, size: 'small', required: true } }} minDate={purchaseDate ? dayjs(purchaseDate).add(1, 'day') : null} disabled={!purchaseDate} /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><Button sx={{ borderColor: THEME_PURPLE, color: THEME_PURPLE, height: '100%' }} variant="outlined" component="label" fullWidth disabled={submittingForm}>Upload Image *<input type="file" hidden accept="image/*" onChange={handleImageChange} /></Button><Typography variant="caption" display="block" sx={{ mt: 1, wordBreak: 'break-all', textAlign: 'center' }}>{formData.imageName || "No file chosen"}</Typography></Grid>
//               </Grid>
//               <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
//                 <Button variant="outlined" onClick={resetForm} disabled={submittingForm}>Reset</Button>
//                 <Button variant="contained" onClick={handleSave} disabled={submittingForm} sx={{ backgroundColor: THEME_PURPLE, '&:hover': { backgroundColor: THEME_PURPLE_HOVER } }}>{submittingForm ? <CircularProgress size={24} color="inherit" /> : 'Save Asset'}</Button>
//               </Box>
//             </Paper>
//           )}

//           <Box>
//             {loadingAssets && assets.length === 0 ? <Box display="flex" justifyContent="center" p={5}><CircularProgress /></Box> : assetsError ? <Paper sx={{p:3, textAlign:'center', color:'red'}}>{assetsError}</Paper> : (
//               <Paper variant="outlined">
//                 <TableContainer>
//                   <Table size="small">
//                     <TableHead sx={{ backgroundColor: THEME_PURPLE, '& .MuiTableCell-root': { color: 'white', fontWeight: 'bold' } }}>
//                       <TableRow>
//                           <TableCell>SR. NO.</TableCell>
//                           <TableCell>ASSIGNED TO</TableCell>
//                           <TableCell>CREATED DATE</TableCell>
//                           <TableCell>CONFIRMATION</TableCell>
//                           <TableCell>RETURN</TableCell>
//                           <TableCell>ACTION</TableCell>
//                       </TableRow>
//                     </TableHead>    
//                     <TableBody>
//                       {loadingAssets ? (
//                         Array.from(new Array(rowsPerPage)).map((_, index) => (
//                             <TableRow key={index}>
//                                 {[...Array(6)].map((_, i) => <TableCell key={i}><Skeleton /></TableCell>)}
//                             </TableRow>
//                         ))
//                       ) : paginatedAssets.length > 0 ? paginatedAssets.map((asset, index) => (
//                         <TableRow key={asset.id} hover>
//                           <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                           <TableCell>{asset.employee}</TableCell>
//                           <TableCell>{asset.createdAt ? dayjs(asset.createdAt).format('DD/MM/YYYY') : 'N/A'}</TableCell>
//                           <TableCell>{asset.employeeId ? getConfirmationChip(asset.confirmation) : '—'}</TableCell>
//                           <TableCell>{renderReturnActionCell(asset)}</TableCell>
//                            <TableCell>
//                             <Button variant="contained" size="small" sx={{ backgroundColor: THEME_PURPLE, '&:hover': { backgroundColor: THEME_PURPLE_HOVER } }} onClick={() => handleViewDetails(asset)}>
//                               View Details
//                             </Button>
//                           </TableCell>
//                         </TableRow>
//                       )) : <TableRow><TableCell colSpan={6} align="center" sx={{ py: 5 }}>No records available.</TableCell></TableRow>}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//                 <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
//                   {loadingAssets ? (
//                       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                           <Skeleton variant="text" width={200} />
//                           <Skeleton variant="rectangular" width={300} height={40} />
//                       </Box>
//                   ) : (
//                     filteredAssets.length > 0 && (
//                       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//                           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                               <FormControl variant="outlined" size="small">
//                                   <Select
//                                       value={rowsPerPage}
//                                       onChange={handleChangeRowsPerPage}
//                                       sx={{ backgroundColor: THEME_PURPLE, color: 'white', borderRadius: '4px', '&:hover': { backgroundColor: THEME_PURPLE_HOVER }, '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, '& .MuiSvgIcon-root': { color: 'white' } }}
//                                   >
//                                       {[5, 10, 15, 25].map((value) => ( <MenuItem key={value} value={value}>{value}</MenuItem> ))}
//                                   </Select>
//                               </FormControl>
//                               <Typography variant="body2" color="text.secondary">
//                                 {`Showing ${startEntry} to ${endEntry} of ${filteredAssets.length} results`}
//                               </Typography>
//                           </Box>
//                           <Pagination
//                               count={Math.ceil(filteredAssets.length / rowsPerPage)}
//                               page={page + 1}
//                               onChange={handlePaginationChange}
//                               showFirstButton showLastButton
//                               sx={{
//                                   '& .MuiPaginationItem-root:hover': { backgroundColor: THEME_ORANGE, color: 'white' },
//                                   '& .MuiPaginationItem-page': {
//                                       color: THEME_PURPLE,
//                                       '&.Mui-selected': {
//                                           backgroundColor: THEME_PURPLE,
//                                           color: 'white',
//                                           '&:hover': { backgroundColor: THEME_ORANGE }
//                                       },
//                                   },
//                                   '& .MuiPaginationItem-icon': { color: THEME_PURPLE }
//                               }}
//                           />
//                       </Box>
//                     )
//                   )}
//                 </Box>
//               </Paper>
//             )}
//           </Box>
//         </CardContent>

//       <Dialog open={confirmationDialogOpen} onClose={() => !updatingReturnId && setConfirmationDialogOpen(false)}>
//         <DialogTitle sx={{backgroundColor: THEME_PURPLE, color: 'white'}}>Confirm Return Action</DialogTitle>
//         <DialogContent sx={{pt: '20px !important'}}>
//           <DialogContentText>Asset: <Typography component="span" fontWeight="bold">{`"${assetActionInfo.assetName}"`}</Typography>. Please confirm: <Typography component="span" fontWeight="bold">{assetActionInfo.action === 'return_yes' ? 'Confirm as Received' : 'Confirm as Not Received'}?</Typography></DialogContentText>
//         </DialogContent>
//         <DialogActions sx={{p: '16px 24px'}}>
//           <Button onClick={() => setConfirmationDialogOpen(false)} disabled={!!updatingReturnId} variant="outlined">Cancel</Button>
//           <Button onClick={handleConfirmationDialogConfirm} variant="contained" disabled={!!updatingReturnId} sx={{backgroundColor: THEME_PURPLE, '&:hover': {backgroundColor: THEME_PURPLE_HOVER}}}>{updatingReturnId === assetActionInfo.assetId ? <CircularProgress size={24} color="inherit" /> : 'Confirm'}</Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog open={detailsOpen} onClose={handleCloseDetails} fullWidth maxWidth="md">
//         <DialogTitle sx={{ backgroundColor: THEME_PURPLE, color: 'white' }}>
//             Asset Details
//         </DialogTitle>
//         <DialogContent>
//             <Box ref={assetDetailsRef} sx={{ p: 2 }}>
//                 {selectedAsset && (
//                     <Grid container spacing={2}>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Assigned To:</strong> {selectedAsset.employee || 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Asset Name:</strong> {selectedAsset.assetName}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Category:</strong> {selectedAsset.category || 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Brand:</strong> {selectedAsset.brand || 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Quantity:</strong> {selectedAsset.quantity || 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Serial No.:</strong> {selectedAsset.serialNumber || 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Asset Code:</strong> {selectedAsset.assetCode || 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Manufacturer:</strong> {selectedAsset.manufacturer || 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Created Date:</strong> {selectedAsset.createdAt ? dayjs(selectedAsset.createdAt).format('DD/MM/YYYY') : 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Purchase Date:</strong> {selectedAsset.purchaseDate ? dayjs(selectedAsset.purchaseDate).format('DD/MM/YYYY') : 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Warranty End:</strong> {selectedAsset.warrantyEndDate ? dayjs(selectedAsset.warrantyEndDate).format('DD/MM/YYYY') : 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Invoice No.:</strong> {selectedAsset.invoiceNumber || 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}>
//                             <Box display="flex" alignItems="center" gap={1}>
//                                <Typography variant="body1"><strong>Is Working:</strong></Typography>
//                                <Chip label={selectedAsset.isWorking} size="small" sx={{ backgroundColor: selectedAsset.isWorking === 'Yes' ? 'green' : selectedAsset.isWorking === 'No' ? 'red' : 'orange', color: 'white', fontWeight: 'bold' }} />
//                             </Box>
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <Box display="flex" alignItems="center" gap={1}>
//                                 <Typography variant="body1"><strong>Confirmation:</strong></Typography>
//                                 {selectedAsset.employeeId ? getConfirmationChip(selectedAsset.confirmation) : '—'}
//                              </Box>
//                         </Grid>
//                         <Grid item xs={12}>
//                             <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
//                                 <Typography variant="body1"><strong>Return Status:</strong></Typography>
//                                 {renderReturnActionCell(selectedAsset)}
//                             </Box>
//                         </Grid>
//                          {selectedAsset.imageUrl && (
//                             <Grid item xs={12}>
//                                 <Typography variant="body1"><strong>Asset Image:</strong></Typography>
//                                 <Box mt={1}>
//                                     <a href={selectedAsset.imageUrl} target="_blank" rel="noopener noreferrer">
//                                         <img src={selectedAsset.imageUrl} alt={selectedAsset.assetName} style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '4px', border: '1px solid #ddd' }} crossOrigin="anonymous" />
//                                     </a>
//                                  </Box>
//                             </Grid>
//                          )}
//                     </Grid>
//                 )}
//             </Box>
//         </DialogContent>
//         <DialogActions sx={{ p: '16px 24px', justifyContent: 'space-between' }}>
//             <Button onClick={handleDownloadPdf} variant="contained" sx={{ backgroundColor: THEME_ORANGE, '&:hover': { backgroundColor: '#e67e22' } }}>Download PDF</Button>
//             <Button onClick={handleCloseDetails} variant="contained" sx={{ backgroundColor: THEME_PURPLE, '&:hover': { backgroundColor: THEME_PURPLE_HOVER } }}>Close</Button>
//         </DialogActions>
//     </Dialog>
//     </LocalizationProvider>
//   );
// };

// export default Assets;








// import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import {
//   Box,
//   Button,
//   CardContent,
//   Chip,
//   CircularProgress,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   FormControl,
//   Grid,
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
//   Autocomplete,
//   Pagination,
//   Skeleton,
// } from '@mui/material';
// import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import dayjs from 'dayjs';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import vetrinaLogo from '../../Assests/vetrinalogo.jpg';

// const THEME_PURPLE = '#8C257C';
// const THEME_ORANGE = '#F58E35';
// const THEME_PURPLE_HOVER = '#6d1d60';

// const API_BASE_URL = 'https://tdtlworld.com/hrms-backend';
// const ASSETS_API_URL = `${API_BASE_URL}/assets/`;
// const CATEGORIES_API_URL = `${API_BASE_URL}/api/assets-category/`;
// const BRANDS_API_URL = `${API_BASE_URL}/api/assets-brand/`;
// const EMPLOYEES_API_URL = `${API_BASE_URL}/employee-dropdown/`;
// const ASSET_NAMES_API_URL = `${API_BASE_URL}/apis/get_available_qty/`;

// const initialFormState = {
//   productId: '',
//   assetName: '',
//   quantity: 1,
//   categoryId: '',
//   brandId: '',
//   employeeId: '',
//   manufacturer: '',
//   serialNumber: '',
//   assetCode: '',
//   isWorking: 'Yes',
//   invoiceNumber: '',
//   assetNote: '',
//   imageName: '',
// };

// const Assets = () => {
//   const [assets, setAssets] = useState([]);
//   const [loadingAssets, setLoadingAssets] = useState(true);
//   const [assetsError, setAssetsError] = useState(null);

//   const [categories, setCategories] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [loadingDropdowns, setLoadingDropdowns] = useState(true);
//   const [dropdownError, setDropdownError] = useState(null);

//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState(initialFormState);
//   const [purchaseDate, setPurchaseDate] = useState(null);
//   const [warrantyEndDate, setWarrantyEndDate] = useState(null);
//   const [assetImageFile, setAssetImageFile] = useState(null);
//   const [submittingForm, setSubmittingForm] = useState(false);
 
//   const [assetNameOptions, setAssetNameOptions] = useState([]);
//   const [loadingAssetNames, setLoadingAssetNames] = useState(false);

//   const [maxQuantity, setMaxQuantity] = useState(null);
//   const [quantityError, setQuantityError] = useState('');

//   const [searchQuery, setSearchQuery] = useState('');
 
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
//   const [assetActionInfo, setAssetActionInfo] = useState({ assetId: null, action: '', assetName: '' });
//   const [updatingReturnId, setUpdatingReturnId] = useState(null);

//   const [detailsOpen, setDetailsOpen] = useState(false);
//   const [selectedAsset, setSelectedAsset] = useState(null);
//   const assetDetailsRef = useRef(null);

//   const fetchAssets = useCallback(async () => {
//     if (employees.length === 0 && !loadingDropdowns) return;
//     setLoadingAssets(true);
//     setAssetsError(null);
//     try {
//       const employeeMap = new Map(employees.map(e => [e.id, e.name]));
//       const response = await axios.get(ASSETS_API_URL);
//       const transformedData = response.data.map((asset) => ({
//         id: asset.id,
//         assetName: asset.assets_name,
//         quantity: asset.quantity,
//         category: asset.category_name,
//         categoryId: asset.assets_category_id,
//         brand: asset.brand_name,
//         brandId: asset.brand_id,
//         employee: (asset.employee_name || (asset.employee_id ? employeeMap.get(asset.employee_id) : null)) || 'Unassigned',
//         employeeId: asset.employee_id,
//         manufacturer: asset.manufacturer,
//         serialNumber: asset.serial_number,
//         assetCode: asset.company_asset_code,
//         isWorking: asset.is_working,
//         purchaseDate: asset.purchase_date,
//         invoiceNumber: asset.invoice_number,
//         warrantyEndDate: asset.warranty_end_date,
//         assetNote: asset.asset_note,
//         imageUrl: asset.asset_image,
//         confirmation: asset.employee_confirmation || 'pending',
//         returnRequestStatus: asset.return_request_status,
//         isReturned: asset.returned,
//         createdAt: asset.created_at,
//       }));
//       const sortedData = transformedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       setAssets(sortedData);
//     } catch (error) {
//       console.error("Error fetching assets:", error);
//       const errorMessage = error.response?.data?.detail || "Could not fetch assets.";
//       setAssetsError(errorMessage);
//       Swal.fire({ icon: 'error', title: 'Failed to Load Assets', text: errorMessage });
//     } finally {
//       setLoadingAssets(false);
//     }
//   }, [employees, loadingDropdowns]);

//   const fetchDropdownData = useCallback(async () => {
//     setLoadingDropdowns(true);
//     setDropdownError(null);
//     try {
//       const [categoriesRes, brandsRes, employeesRes] = await Promise.all([
//         axios.get(CATEGORIES_API_URL),
//         axios.get(BRANDS_API_URL),
//         axios.get(EMPLOYEES_API_URL),
//       ]);
//       setCategories(categoriesRes.data.map(c => ({ id: c.value, name: c.label })));
//       setBrands(brandsRes.data.map(b => ({ id: b.value, name: b.label })));
//       setEmployees(employeesRes.data.map(e => ({ id: e.emp_id, name: `(${e.emp_id} - ${e.label} - ${e.division_name})` })));
//     } catch (error) {
//       console.error("Error fetching dropdown data:", error);
//       const errorMessage = "Could not load required form data. Please refresh.";
//       setDropdownError(errorMessage);
//       Swal.fire({ icon: 'error', title: 'Configuration Error', text: errorMessage });
//     } finally {
//       setLoadingDropdowns(false);
//     }
//   }, []);

//   useEffect(() => { fetchDropdownData(); }, [fetchDropdownData]);
//   useEffect(() => { if (!loadingDropdowns) fetchAssets(); }, [loadingDropdowns, fetchAssets]);
//   useEffect(() => { setPage(0); }, [searchQuery, rowsPerPage]);
//   useEffect(() => {
//     if (purchaseDate && warrantyEndDate && dayjs(warrantyEndDate).isBefore(dayjs(purchaseDate))) {
//       setWarrantyEndDate(null);
//     }
//   }, [purchaseDate, warrantyEndDate]);
 
//   useEffect(() => {
//     const fetchAssetNames = async () => {
//       if (formData.categoryId && formData.brandId) {
//         setLoadingAssetNames(true);
//         setAssetNameOptions([]);
//         try {
//           const response = await axios.get(`${ASSET_NAMES_API_URL}?category_id=${formData.categoryId}&brand_id=${formData.brandId}`);
//           const formattedOptions = response.data.map(p => ({
//             id: p.product_id,
//             name: p.product_name,
//             label: `${p.product_name} (In Stock: ${Math.floor(p.in_stock)})`,
//             inStock: p.in_stock,
//           }));
//           setAssetNameOptions(formattedOptions);
//         } catch (error) {
//           console.error("Error fetching asset names:", error);
//           Swal.fire({ icon: 'error', title: 'Could not fetch Asset Names', text: 'Please check your category and brand selection or try again later.' });
//         } finally {
//           setLoadingAssetNames(false);
//         }
//       } else {
//         setAssetNameOptions([]);
//       }
//     };
//     fetchAssetNames();
//   }, [formData.categoryId, formData.brandId]);

//   const handleInputChange = (event) => {
//     const { name: inputName, value } = event.target;
 
//     if (inputName === 'manufacturer') {
//       if (/^[a-zA-Z\s]*$/.test(value)) {
//         setFormData((prev) => ({ ...prev, [inputName]: value }));
//       }
//     } else if (inputName === 'assetCode' || inputName === 'serialNumber' || inputName === 'invoiceNumber') {
//       if (/^[0-9]*$/.test(value)) {
//         setFormData((prev) => ({ ...prev, [inputName]: value }));
//       }
//     } else if (inputName === 'quantity') {
//       const numValue = Number(value);
//       if (numValue < 1) {
//         setQuantityError('Quantity must be at least 1.');
//       } else if (maxQuantity !== null && numValue > maxQuantity) {
//         setQuantityError(`Quantity cannot exceed the available stock of ${Math.floor(maxQuantity)}.`);
//       } else {
//         setQuantityError('');
//       }
//       setFormData((prev) => ({ ...prev, [inputName]: value }));
//     } else {
//       setFormData((prev) => ({ ...prev, [inputName]: value }));
//     }
//   };

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setAssetImageFile(file);
//       setFormData((prev) => ({ ...prev, imageName: file.name }));
//     }
//   };

//   const resetForm = useCallback(() => {
//     setFormData(initialFormState);
//     setPurchaseDate(null);
//     setWarrantyEndDate(null);
//     setAssetImageFile(null);
//     setMaxQuantity(null);
//     setQuantityError('');
//   }, []);

//   const handleShowFormToggle = () => {
//     setShowForm(!showForm);
//     if (showForm) resetForm();
//   };
 
//   const handlePaginationChange = (event, newPage) => {
//     setPage(newPage - 1);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleExportReport = () => {
//     const headers = [
//       'SR. NO.', 'ASSET PRODUCT NAME', 'CATEGORY', 'BRAND', 'QUANTITY', 'SERIAL NO.',
//       'ASSIGNED TO', 'ASSET CODE', 'MANUFACTURER', 'PURCHASE DATE',
//       'WARRANTY END DATE', 'INVOICE NO.', 'CREATED DATE', 'IS WORKING?',
//       'CONFIRMATION', 'RETURN ASSET'
//     ];
//     const escapeCSV = (str) => `"${String(str || '').replace(/"/g, '""')}"`;
//     const data = assets.map((asset, index) => {
//       const returnStatus = asset.isReturned === 'Y' ? 'Returned' :
//                           asset.returnRequestStatus === '1' ? 'Request Pending' :
//                           asset.returnRequestStatus === 'denied' ? 'Return Denied' : 'No request';
//       return [
//         index + 1,
//         escapeCSV(asset.assetName),
//         escapeCSV(asset.category),
//         escapeCSV(asset.brand),
//         escapeCSV(asset.quantity),
//         escapeCSV(asset.serialNumber),
//         escapeCSV(asset.employee),
//         escapeCSV(asset.assetCode || 'N/A'),
//         escapeCSV(asset.manufacturer || 'N/A'),
//         escapeCSV(asset.purchaseDate ? dayjs(asset.purchaseDate).format('DD/MM/YYYY') : 'N/A'),
//         escapeCSV(asset.warrantyEndDate ? dayjs(asset.warrantyEndDate).format('DD/MM/YYYY') : 'N/A'),
//         escapeCSV(asset.invoiceNumber || 'N/A'),
//         escapeCSV(asset.createdAt ? dayjs(asset.createdAt).format('DD/MM/YYYY') : 'N/A'),
//         escapeCSV(asset.isWorking),
//         escapeCSV(asset.employeeId ? asset.confirmation : '—'),
//         escapeCSV(returnStatus),
//       ].join(',');
//     });
//     const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...data].join("\n");
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "assets_report.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };
 
//   const handleSave = async () => {
//     if (Number(formData.quantity) < 1) {
//       Swal.fire({ icon: 'error', title: 'Invalid Quantity', text: 'The quantity must be at least 1.', });
//       return;
//     }
//     if (maxQuantity !== null && Number(formData.quantity) > maxQuantity) {
//       Swal.fire({ icon: 'error', title: 'Invalid Quantity', text: `The quantity for "${formData.assetName}" cannot exceed the available stock of ${Math.floor(maxQuantity)}.`, });
//       return;
//     }

//     const requiredFields = {
//         'Category': formData.categoryId, 'Brand': formData.brandId,
//         'Asset Product Name': formData.productId, 'Quantity': formData.quantity && Number(formData.quantity) >= 1,
//         'Employee': formData.employeeId, 'Serial Number': formData.serialNumber,
//         'Manufacturer': formData.manufacturer, 'Asset Code': formData.assetCode,
//         'Invoice Number': formData.invoiceNumber, 'Purchase Date': purchaseDate,
//         'Warranty End Date': warrantyEndDate, 'Asset Image': assetImageFile,
//     };
//     const missingFields = Object.keys(requiredFields).filter(key => !requiredFields[key]);
//     if (missingFields.length > 0) {
//       Swal.fire({ icon: 'warning', title: 'Missing Information', text: `Please fill all the following required fields: ${missingFields.join(', ')}.`, });
//       return;
//     }

//     const adminId = localStorage.getItem('loggedInEmpId');
//     if (!adminId) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Authentication Error',
//         text: 'Could not find admin user ID in session. Please log in again.',
//       });
//       return;
//     }

//     setSubmittingForm(true);
//     const payload = new FormData();
//     payload.append('assets_name', formData.assetName);
//     payload.append('quantity', formData.quantity);
//     payload.append('assets_category_id', formData.categoryId);
//     payload.append('brand_id', formData.brandId);
//     payload.append('employee_id', formData.employeeId);
//     payload.append('admin_id', adminId);
//     payload.append('product_id', formData.productId);
//     payload.append('serial_number', formData.serialNumber);
//     payload.append('purchase_date', purchaseDate.format('YYYY-MM-DD'));
//     payload.append('manufacturer', formData.manufacturer);
//     payload.append('is_working', formData.isWorking);
//     payload.append('company_asset_code', formData.assetCode);
//     payload.append('invoice_number', formData.invoiceNumber);
//     payload.append('warranty_end_date', warrantyEndDate.format('YYYY-MM-DD'));
//     if (formData.assetNote) payload.append('asset_note', formData.assetNote);
//     if (assetImageFile) payload.append('asset_image', assetImageFile, assetImageFile.name);

//     try {
//       await axios.post(ASSETS_API_URL, payload);
//       const successTitle = 'Asset Allocated!';
//       const allocatedEmployee = employees.find(e => e.id === formData.employeeId);
//       const successText = `The asset "${formData.assetName}" has been successfully assigned to ${allocatedEmployee.name}.`;
//       Swal.fire({ icon: 'success', title: successTitle, text: successText });
//       setShowForm(false);
//       resetForm();
//       fetchAssets();
//     } catch (error) {
//       console.error(`Error saving asset:`, error);
//       const errorMessage = error.response?.data ? Object.values(error.response.data).flat().join('; ') : "An unexpected server error occurred.";
//       Swal.fire({ icon: 'error', title: 'Submission Failed', text: errorMessage });
//     } finally {
//       setSubmittingForm(false);
//     }
//   };
 
//   const handleReturnActionClick = (assetId, action, assetName) => {
//     setAssetActionInfo({ assetId, action, assetName });
//     setConfirmationDialogOpen(true);
//   };
 
//   const handleConfirmationDialogConfirm = async () => {
//     const { assetId, action } = assetActionInfo;
//     if (!assetId || !action) return;
//     setUpdatingReturnId(assetId);
//     setConfirmationDialogOpen(false);
//     try {
//       const response = await axios.patch(`${ASSETS_API_URL}${assetId}/`, { action });
//       Swal.fire({ icon: 'success', title: 'Action Successful', text: response.data.message });
//       await fetchAssets();
//       if (selectedAsset && selectedAsset.id === assetId) {
//         const freshResponse = await axios.get(`${ASSETS_API_URL}${assetId}/`);
//         const refreshedAsset = { ...selectedAsset, returnRequestStatus: freshResponse.data.return_request_status, isReturned: freshResponse.data.returned };
//         setSelectedAsset(refreshedAsset);
//       }
//     } catch (error) {
//       console.error("Error updating return status:", error);
//       const errorMessage = error.response?.data?.message || "Failed to update status.";
//       Swal.fire({ icon: 'error', title: 'Action Failed', text: errorMessage });
//     } finally {
//       setUpdatingReturnId(null);
//       setAssetActionInfo({ assetId: null, action: '', assetName: '' });
//     }
//   };

//   const handleViewDetails = (asset) => {
//     setSelectedAsset(asset);
//     setDetailsOpen(true);
//   };

//   const handleCloseDetails = () => {
//     setDetailsOpen(false);
//     setSelectedAsset(null);
//   };
 
//   const handleDownloadPdf = () => {
//     const input = assetDetailsRef.current;
//     if (!input) return;
 
//     html2canvas(input, { scale: 2, useCORS: true })
//       .then((canvas) => {
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF('p', 'mm', 'a4');
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = pdf.internal.pageSize.getHeight();
 
//         pdf.setDrawColor(0);
//         pdf.rect(5, 5, pdfWidth - 10, pdfHeight - 10);
 
//         const headerY = 10;
//         pdf.addImage(vetrinaLogo, 'JPEG', 10, headerY, 40, 10);
//         pdf.setFontSize(20);
//         pdf.setTextColor('#8C257C');
//         pdf.text('Asset Details', pdfWidth / 2, headerY + 8, { align: 'center' });
 
//         const headerDividerY = headerY + 15;
//         pdf.setDrawColor(140, 37, 124);
//         pdf.line(10, headerDividerY, pdfWidth - 10, headerDividerY);
 
//         const contentMargin = 10;
//         const contentStartY = headerDividerY + 5;
//         const contentWidth = pdfWidth - (contentMargin * 2);
//         const canvasWidth = canvas.width;
//         const canvasHeight = canvas.height;
//         const contentHeight = (canvasHeight * contentWidth) / canvasWidth;
//         pdf.addImage(imgData, 'PNG', contentMargin, contentStartY, contentWidth, contentHeight);
 
//         const footerDividerY = pdfHeight - 20;
//         pdf.setDrawColor(140, 37, 124);
//         pdf.line(10, footerDividerY, pdfWidth - 10, footerDividerY);
 
//         pdf.setFontSize(10);
//         pdf.setTextColor(0, 0, 0);
//         pdf.setFont('helvetica', 'bold');
//         const footerText = 'Vetrina Healthcare Pvt. Ltd., Corporate Office - Punyai Pride, 1st Floor, Shivshambho Nagar, Lane 3A, Katraj Kondhwa Road, Katraj, Pune - 411046.';
//         const splitFooter = pdf.splitTextToSize(footerText, pdfWidth - 20);
//         pdf.text(splitFooter, pdfWidth / 2, footerDividerY + 5, { align: 'center' });
 
//         pdf.save(`asset-details-${selectedAsset.assetName.replace(/\s/g, '_')}.pdf`);
//       });
//   };

//   const filteredAssets = useMemo(() => {
//     if (!searchQuery) return assets;
//     const lowercasedQuery = searchQuery.toLowerCase();
//     return assets.filter((asset) => Object.values(asset).some((value) => String(value).toLowerCase().includes(lowercasedQuery)));
//   }, [assets, searchQuery]);

//   const paginatedAssets = filteredAssets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//   const startEntry = filteredAssets.length > 0 ? page * rowsPerPage + 1 : 0;
//   const endEntry = Math.min((page + 1) * rowsPerPage, filteredAssets.length);

//   const getConfirmationChip = (status) => {
//     if (status === 'accepted') return <Chip label="Confirmed" size="small" sx={{ backgroundColor: 'green', color: 'white' }} />;
//     if (status === 'rejected') return <Chip label="Rejected" color="error" size="small" />;
//     return <Chip label="Pending" color="warning" size="small" />;
//   };

//   const renderReturnActionCell = (asset) => {
//     if (updatingReturnId === asset.id) return <CircularProgress size={24} />;
//     if (asset.isReturned === 'Y') return <Chip label="Returned" size="small" sx={{ backgroundColor: 'green', color: 'white' }} />;
//     if (!asset.employeeId) return <Typography variant="caption" color="text.secondary">—</Typography>;
//     if (asset.confirmation !== 'accepted') return <Chip label="No request" size="small" color="warning" />;
//     if (asset.returnRequestStatus === '1') {
//       return (
//         <Box display="flex" gap={1} flexWrap="wrap">
//           <Button variant="contained" size="small" sx={{ backgroundColor: THEME_PURPLE, '&:hover': { backgroundColor: THEME_PURPLE_HOVER } }} onClick={() => handleReturnActionClick(asset.id, 'return_yes', asset.assetName)}>Received</Button>
//           <Button variant="contained" color="error" size="small" onClick={() => handleReturnActionClick(asset.id, 'return_no', asset.assetName)}>Not Received</Button>
//         </Box>
//       );
//     }
//     if (asset.returnRequestStatus === 'denied') return <Chip label="Return Denied" color="error" size="small" />;
//     return <Chip label="No request" size="small" color="warning" />;
//   };
 
//   const quantityLabel = maxQuantity !== null ? `Quantity (Max: ${Math.floor(maxQuantity)})` : 'Quantity';

//   if (loadingDropdowns) return <Box display="flex" justifyContent="center" alignItems="center" p={5}><CircularProgress /><Typography ml={2}>Loading configuration...</Typography></Box>;
//   if (dropdownError) return <Box p={3} textAlign="center"><Button variant="contained" onClick={fetchDropdownData} sx={{ backgroundColor: THEME_PURPLE }}>Retry Loading Data</Button></Box>;

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <CardContent sx={{ p: { xs: 1.5, sm: 3 } }}>
//           <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//             <Typography variant="h4" fontWeight="bold" sx={{color:"#8C257C"}}> Assets </Typography>
//           </Box>
//           <br />
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
//               <Button variant="contained" onClick={handleShowFormToggle} disabled={submittingForm} sx={{ backgroundColor: THEME_PURPLE, '&:hover': { backgroundColor: THEME_PURPLE_HOVER } }}>{showForm ? '− Cancel' : '+ Allocate Assets'}</Button>
//               <Button variant="contained" onClick={handleExportReport} sx={{ backgroundColor: THEME_PURPLE, '&:hover': { backgroundColor: THEME_PURPLE_HOVER } }}>Export Report</Button>
//             </Box>
//             <TextField size="small" placeholder="Search assets..." variant="outlined" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} sx={{ width: { xs: '100%', sm: 300 } }} />
//           </Box>

//           {showForm && (
//             <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, mb: 4 }}>
//               <Typography variant="h6" gutterBottom fontWeight="bold" color="#8C257C">Allocate New Asset</Typography>
//               <Grid container spacing={2.5}>
//                 <Grid item xs={12} sm={6} md={4}><Autocomplete options={categories} getOptionLabel={(o) => o.name} value={categories.find(c => c.id === formData.categoryId) || null} onChange={(e, v) => { setFormData(p => ({...p, categoryId: v?.id||'', productId: '', assetName: ''})); setMaxQuantity(null); setQuantityError(''); }} renderInput={(params) => <TextField {...params} label="Category" required size="small" />} /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><Autocomplete options={brands} getOptionLabel={(o) => o.name} value={brands.find(b => b.id === formData.brandId) || null} onChange={(e, v) => { setFormData(p => ({...p, brandId: v?.id||'', productId: '', assetName: ''})); setMaxQuantity(null); setQuantityError(''); }} renderInput={(params) => <TextField {...params} label="Brand" required size="small" />} /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><Autocomplete options={assetNameOptions} getOptionLabel={(o) => o.label || ''} value={assetNameOptions.find(p => p.id === formData.productId) || null} onChange={(e, v) => { setFormData(p => ({ ...p, productId: v?.id || '', assetName: v?.name || '', quantity: v && p.quantity > v.inStock ? Math.floor(v.inStock) : p.quantity, })); setMaxQuantity(v?.inStock || null); setQuantityError(''); }} disabled={!formData.categoryId || !formData.brandId} loading={loadingAssetNames} renderInput={(params) => <TextField {...params} label="Asset Product Name" required size="small" placeholder={!formData.categoryId || !formData.brandId ? 'Select Category & Brand' : ''} InputProps={{ ...params.InputProps, endAdornment: ( <>{loadingAssetNames ? <CircularProgress color="inherit" size={20} /> : null}{params.InputProps.endAdornment}</> ), }} />} /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><TextField name="quantity" label={quantityLabel} type="number" value={formData.quantity} onChange={handleInputChange} required fullWidth size="small" InputProps={{ inputProps: { min: 1, max: maxQuantity !== null ? Math.floor(maxQuantity) : undefined } }} error={!!quantityError} helperText={quantityError} /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><Autocomplete options={employees} getOptionLabel={(o) => o.name} value={employees.find(e => e.id === formData.employeeId) || null} onChange={(e, v) => setFormData(p => ({...p, employeeId: v?.id||''}))} renderInput={(params) => <TextField {...params} label="Employee" required size="small" />} /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><TextField name="serialNumber" label="Serial Number" value={formData.serialNumber} onChange={handleInputChange} required fullWidth size="small" /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><TextField name="manufacturer" label="Manufacturer" value={formData.manufacturer} onChange={handleInputChange} required fullWidth size="small" /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><TextField name="assetCode" label="Asset Code" value={formData.assetCode} onChange={handleInputChange} required fullWidth size="small" /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><FormControl fullWidth size="small" required><InputLabel>Is Working?</InputLabel><Select name="isWorking" value={formData.isWorking} onChange={handleInputChange} label="Is Working?"><MenuItem value="Yes">Yes</MenuItem><MenuItem value="No">No</MenuItem><MenuItem value="Needs Repair">Needs Repair</MenuItem></Select></FormControl></Grid>
//                 <Grid item xs={12} sm={6} md={4}><TextField name="invoiceNumber" label="Invoice Number" value={formData.invoiceNumber} onChange={handleInputChange} required fullWidth size="small" /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><DatePicker label="Purchase Date" value={purchaseDate} onChange={setPurchaseDate} format="DD-MM-YYYY" slotProps={{ textField: { fullWidth: true, size: 'small', required: true } }} maxDate={dayjs()} /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><DatePicker label="Warranty End Date" value={warrantyEndDate} onChange={setWarrantyEndDate} format="DD-MM-YYYY" slotProps={{ textField: { fullWidth: true, size: 'small', required: true } }} minDate={purchaseDate ? dayjs(purchaseDate).add(1, 'day') : null} disabled={!purchaseDate} /></Grid>
//                 <Grid item xs={12} sm={6} md={4}><Button sx={{ borderColor: THEME_PURPLE, color: THEME_PURPLE, height: '100%' }} variant="outlined" component="label" fullWidth disabled={submittingForm}>Upload Image *<input type="file" hidden accept="image/*" onChange={handleImageChange} /></Button><Typography variant="caption" display="block" sx={{ mt: 1, wordBreak: 'break-all', textAlign: 'center' }}>{formData.imageName || "No file chosen"}</Typography></Grid>
//               </Grid>
//               <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
//                 <Button variant="outlined" onClick={resetForm} disabled={submittingForm}>Reset</Button>
//                 <Button variant="contained" onClick={handleSave} disabled={submittingForm} sx={{ backgroundColor: THEME_PURPLE, '&:hover': { backgroundColor: THEME_PURPLE_HOVER } }}>{submittingForm ? <CircularProgress size={24} color="inherit" /> : 'Save Asset'}</Button>
//               </Box>
//             </Paper>
//           )}

//           <Box>
//             {loadingAssets && assets.length === 0 ? <Box display="flex" justifyContent="center" p={5}><CircularProgress /></Box> : assetsError ? <Paper sx={{p:3, textAlign:'center', color:'red'}}>{assetsError}</Paper> : (
//               <Paper variant="outlined">
//                 <TableContainer>
//                   <Table size="small">
//                     <TableHead sx={{ backgroundColor: THEME_PURPLE, '& .MuiTableCell-root': { color: 'white', fontWeight: 'bold' } }}>
//                       <TableRow>
//                           <TableCell>SR. NO.</TableCell>
//                           <TableCell>ASSIGNED TO</TableCell>
//                           <TableCell>CREATED DATE</TableCell>
//                           <TableCell>CONFIRMATION</TableCell>
//                           <TableCell>RETURN</TableCell>
//                           <TableCell>ACTION</TableCell>
//                       </TableRow>
//                     </TableHead>    
//                     <TableBody>
//                       {loadingAssets ? (
//                         Array.from(new Array(rowsPerPage)).map((_, index) => (
//                             <TableRow key={index}>
//                                 {[...Array(6)].map((_, i) => <TableCell key={i}><Skeleton /></TableCell>)}
//                             </TableRow>
//                         ))
//                       ) : paginatedAssets.length > 0 ? paginatedAssets.map((asset, index) => (
//                         <TableRow key={asset.id} hover>
//                           <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                           <TableCell>{asset.employee}</TableCell>
//                           <TableCell>{asset.createdAt ? dayjs(asset.createdAt).format('DD/MM/YYYY') : 'N/A'}</TableCell>
//                           <TableCell>{asset.employeeId ? getConfirmationChip(asset.confirmation) : '—'}</TableCell>
//                           <TableCell>{renderReturnActionCell(asset)}</TableCell>
//                            <TableCell>
//                             <Button variant="contained" size="small" sx={{ backgroundColor: THEME_PURPLE, '&:hover': { backgroundColor: THEME_PURPLE_HOVER } }} onClick={() => handleViewDetails(asset)}>
//                               View Details
//                             </Button>
//                           </TableCell>
//                         </TableRow>
//                       )) : <TableRow><TableCell colSpan={6} align="center" sx={{ py: 5 }}>No records available.</TableCell></TableRow>}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//                 <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
//                   {loadingAssets ? (
//                       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                           <Skeleton variant="text" width={200} />
//                           <Skeleton variant="rectangular" width={300} height={40} />
//                       </Box>
//                   ) : (
//                     filteredAssets.length > 0 && (
//                       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//                           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                               <FormControl variant="outlined" size="small">
//                                   <Select
//                                       value={rowsPerPage}
//                                       onChange={handleChangeRowsPerPage}
//                                       sx={{ backgroundColor: THEME_PURPLE, color: 'white', borderRadius: '4px', '&:hover': { backgroundColor: THEME_PURPLE_HOVER }, '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, '& .MuiSvgIcon-root': { color: 'white' } }}
//                                   >
//                                       {[5, 10, 15, 25].map((value) => ( <MenuItem key={value} value={value}>{value}</MenuItem> ))}
//                                   </Select>
//                               </FormControl>
//                               <Typography variant="body2" color="text.secondary">
//                                 {`Showing ${startEntry} to ${endEntry} of ${filteredAssets.length} results`}
//                               </Typography>
//                           </Box>
//                           <Pagination
//                               count={Math.ceil(filteredAssets.length / rowsPerPage)}
//                               page={page + 1}
//                               onChange={handlePaginationChange}
//                               showFirstButton showLastButton
//                               sx={{
//                                   '& .MuiPaginationItem-root:hover': { backgroundColor: THEME_ORANGE, color: 'white' },
//                                   '& .MuiPaginationItem-page': {
//                                       color: THEME_PURPLE,
//                                       '&.Mui-selected': {
//                                           backgroundColor: THEME_PURPLE,
//                                           color: 'white',
//                                           '&:hover': { backgroundColor: THEME_ORANGE }
//                                       },
//                                   },
//                                   '& .MuiPaginationItem-icon': { color: THEME_PURPLE }
//                               }}
//                           />
//                       </Box>
//                     )
//                   )}
//                 </Box>
//               </Paper>
//             )}
//           </Box>
//         </CardContent>

//       <Dialog open={confirmationDialogOpen} onClose={() => !updatingReturnId && setConfirmationDialogOpen(false)}>
//         <DialogTitle sx={{backgroundColor: THEME_PURPLE, color: 'white'}}>Confirm Return Action</DialogTitle>
//         <DialogContent sx={{pt: '20px !important'}}>
//           <DialogContentText>Asset: <Typography component="span" fontWeight="bold">{`"${assetActionInfo.assetName}"`}</Typography>. Please confirm: <Typography component="span" fontWeight="bold">{assetActionInfo.action === 'return_yes' ? 'Confirm as Received' : 'Confirm as Not Received'}?</Typography></DialogContentText>
//         </DialogContent>
//         <DialogActions sx={{p: '16px 24px'}}>
//           <Button onClick={() => setConfirmationDialogOpen(false)} disabled={!!updatingReturnId} variant="outlined">Cancel</Button>
//           <Button onClick={handleConfirmationDialogConfirm} variant="contained" disabled={!!updatingReturnId} sx={{backgroundColor: THEME_PURPLE, '&:hover': {backgroundColor: THEME_PURPLE_HOVER}}}>{updatingReturnId === assetActionInfo.assetId ? <CircularProgress size={24} color="inherit" /> : 'Confirm'}</Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog open={detailsOpen} onClose={handleCloseDetails} fullWidth maxWidth="md">
//         <DialogTitle sx={{ backgroundColor: THEME_PURPLE, color: 'white' }}>
//             Asset Details
//         </DialogTitle>
//         <DialogContent>
//             <Box ref={assetDetailsRef} sx={{ p: 2 }}>
//                 {selectedAsset && (
//                     <Grid container spacing={2}>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Assigned To:</strong> {selectedAsset.employee || 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Asset Name:</strong> {selectedAsset.assetName}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Category:</strong> {selectedAsset.category || 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Brand:</strong> {selectedAsset.brand || 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Quantity:</strong> {selectedAsset.quantity || 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Serial No.:</strong> {selectedAsset.serialNumber || 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Asset Code:</strong> {selectedAsset.assetCode || 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Manufacturer:</strong> {selectedAsset.manufacturer || 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Created Date:</strong> {selectedAsset.createdAt ? dayjs(selectedAsset.createdAt).format('DD/MM/YYYY') : 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Purchase Date:</strong> {selectedAsset.purchaseDate ? dayjs(selectedAsset.purchaseDate).format('DD/MM/YYYY') : 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Warranty End:</strong> {selectedAsset.warrantyEndDate ? dayjs(selectedAsset.warrantyEndDate).format('DD/MM/YYYY') : 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}><Typography variant="body1"><strong>Invoice No.:</strong> {selectedAsset.invoiceNumber || 'N/A'}</Typography></Grid>
//                         <Grid item xs={12} sm={6}>
//                             <Box display="flex" alignItems="center" gap={1}>
//                                <Typography variant="body1"><strong>Is Working:</strong></Typography>
//                                <Chip label={selectedAsset.isWorking} size="small" sx={{ backgroundColor: selectedAsset.isWorking === 'Yes' ? 'green' : selectedAsset.isWorking === 'No' ? 'red' : 'orange', color: 'white', fontWeight: 'bold' }} />
//                             </Box>
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <Box display="flex" alignItems="center" gap={1}>
//                                 <Typography variant="body1"><strong>Confirmation:</strong></Typography>
//                                 {selectedAsset.employeeId ? getConfirmationChip(selectedAsset.confirmation) : '—'}
//                              </Box>
//                         </Grid>
//                         <Grid item xs={12}>
//                             <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
//                                 <Typography variant="body1"><strong>Return Status:</strong></Typography>
//                                 {renderReturnActionCell(selectedAsset)}
//                             </Box>
//                         </Grid>
//                          {selectedAsset.imageUrl && (
//                             <Grid item xs={12}>
//                                 <Typography variant="body1"><strong>Asset Image:</strong></Typography>
//                                 <Box mt={1}>
//                                     <a href={selectedAsset.imageUrl} target="_blank" rel="noopener noreferrer">
//                                         <img src={selectedAsset.imageUrl} alt={selectedAsset.assetName} style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '4px', border: '1px solid #ddd' }} crossOrigin="anonymous" />
//                                     </a>
//                                  </Box>
//                             </Grid>
//                          )}
//                     </Grid>
//                 )}
//             </Box>
//         </DialogContent>
//         <DialogActions sx={{ p: '16px 24px', justifyContent: 'space-between' }}>
//             <Button onClick={handleDownloadPdf} variant="contained" sx={{ backgroundColor: THEME_ORANGE, '&:hover': { backgroundColor: '#e67e22' } }}>Download PDF</Button>
//             <Button onClick={handleCloseDetails} variant="contained" sx={{ backgroundColor: THEME_PURPLE, '&:hover': { backgroundColor: THEME_PURPLE_HOVER } }}>Close</Button>
//         </DialogActions>
//     </Dialog>
//     </LocalizationProvider>
//   );
// };



// export default Assets;



import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  Box,
  Button,
  CardContent,
  Chip,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Autocomplete,
  Pagination,
  Skeleton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import vetrinaLogo from '../../Assests/vetrinalogo.jpg'; // Ensure this path is correct

const THEME_PURPLE = '#8C257C';
const THEME_PURPLE_HOVER = '#6d1d60';

// API Endpoints
const API_BASE_URL = 'https://tdtlworld.com/hrms-backend';
const ASSETS_API_URL = `${API_BASE_URL}/assets/`;
const CATEGORIES_API_URL = `${API_BASE_URL}/api/assets-category/`;
const BRANDS_API_URL = `${API_BASE_URL}/api/assets-brand/`;
const EMPLOYEES_API_URL = `${API_BASE_URL}/employee-dropdown/`;
const ASSET_NAMES_API_URL = `${API_BASE_URL}/apis/get_available_qty/`;

const initialFormState = {
  productId: '',
  assetName: '',
  quantity: 1,
  categoryId: '',
  brandId: '',
  employeeId: '',
  manufacturer: '',
  serialNumber: '',
  assetCode: '',
  isWorking: 'Yes',
  invoiceNumber: '',
  assetNote: '',
  imageName: '',
  // UI Helpers
  designation: '',
  division: '',
  subDivision: '',
  headquarter: ''
};

const Assets = ({ mode = 'master' }) => {
  // --- States ---
  const [assets, setAssets] = useState([]);
  const [loadingAssets, setLoadingAssets] = useState(true);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [assetNameOptions, setAssetNameOptions] = useState([]); // Available assets (Stock)
  const [loadingDropdowns, setLoadingDropdowns] = useState(true);

  // Form States
  const [formData, setFormData] = useState(initialFormState);
  const [purchaseDate, setPurchaseDate] = useState(dayjs());
  const [warrantyEndDate, setWarrantyEndDate] = useState(null);
  const [assetImageFile, setAssetImageFile] = useState(null);
  const [submittingForm, setSubmittingForm] = useState(false);
  const [loadingAssetNames, setLoadingAssetNames] = useState(false);

  // Pagination & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Details Modal
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const assetDetailsRef = useRef(null);

  // --- Data Fetching ---
  const fetchDropdownData = useCallback(async () => {
    setLoadingDropdowns(true);
    try {
      const [categoriesRes, brandsRes, employeesRes] = await Promise.all([
        axios.get(CATEGORIES_API_URL),
        axios.get(BRANDS_API_URL),
        axios.get(EMPLOYEES_API_URL),
      ]);
      setCategories(categoriesRes.data.map(c => ({ id: c.value, name: c.label })));
      setBrands(brandsRes.data.map(b => ({ id: b.value, name: b.label })));
      
      // Enhance employee data for the filters in Allocation tab
      const emps = employeesRes.data.map(e => ({ 
        id: e.emp_id, 
        name: `${e.label} (${e.emp_id})`,
        // Assuming API might return these, otherwise placeholders
        division: e.division_name || 'N/A',
        designation: e.designation || 'N/A', 
        subDivision: e.sub_division || 'N/A',
        headquarter: e.headquarter || 'N/A'
      }));
      setEmployees(emps);
    } catch (error) {
      console.error("Error fetching dropdowns:", error);
    } finally {
      setLoadingDropdowns(false);
    }
  }, []);

  const fetchAssets = useCallback(async () => {
    setLoadingAssets(true);
    try {
      const response = await axios.get(ASSETS_API_URL);
      
      // Transform data based on mode
      const transformedData = response.data.map((asset) => ({
        id: asset.id,
        // Common Fields
        assetName: asset.assets_name,
        category: asset.category_name,
        brand: asset.brand_name,
        type: asset.product_name || asset.assets_name, // Mapping type
        // Master Specific
        caNo: asset.company_asset_code || 'N/A',
        modelNo: asset.serial_number || asset.manufacturer || '-',
        invoiceNo: asset.invoice_number || '-',
        price: asset.price || '0',
        status: asset.employee_id ? 'Allocated' : 'In stock',
        // Allocation Specific
        employee: asset.employee_name || 'Unassigned',
        employeeId: asset.employee_id,
        dept: 'N/A', // Placeholder
        desig: 'N/A', // Placeholder
        division: asset.division_name || 'N/A',
        hq: 'N/A', // Placeholder
        assignmentDate: asset.created_at,
        // Details
        manufacturer: asset.manufacturer,
        isWorking: asset.is_working,
        purchaseDate: asset.purchase_date,
        warrantyEndDate: asset.warranty_end_date,
        imageUrl: asset.asset_image,
        createdAt: asset.created_at,
      }));

      // Filter based on mode
      let finalData = transformedData;
      if (mode === 'allocation') {
        // Only show assets that are assigned to someone
        finalData = transformedData.filter(a => a.employeeId);
      }
      
      setAssets(finalData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (error) {
      console.error("Error fetching assets:", error);
    } finally {
      setLoadingAssets(false);
    }
  }, [mode]);

  useEffect(() => { fetchDropdownData(); }, [fetchDropdownData]);
  useEffect(() => { if (!loadingDropdowns) fetchAssets(); }, [loadingDropdowns, fetchAssets, mode]);
  
  // Fetch available assets (stock) when Category/Brand changes in Allocation Form
  useEffect(() => {
    const fetchAssetNames = async () => {
      if (formData.categoryId && formData.brandId) {
        setLoadingAssetNames(true);
        setAssetNameOptions([]);
        try {
          const response = await axios.get(`${ASSET_NAMES_API_URL}?category_id=${formData.categoryId}&brand_id=${formData.brandId}`);
          setAssetNameOptions(response.data.map(p => ({
            id: p.product_id,
            name: p.product_name,
            label: `${p.product_name} (In Stock: ${Math.floor(p.in_stock)})`,
            inStock: p.in_stock,
            // Mocking details for "Auto Display" feature since this API only gives names
            model: 'Check Specs',
            caNo: 'Auto-Gen',
            invoice: 'N/A',
            pDate: new Date(),
            wDate: new Date()
          })));
        } catch (error) { console.error(error); } 
        finally { setLoadingAssetNames(false); }
      }
    };
    if(mode === 'allocation') fetchAssetNames();
  }, [formData.categoryId, formData.brandId, mode]);


  // --- Event Handlers ---

  const handleEmployeeChange = (event, value) => {
    if (value) {
      setFormData(prev => ({
        ...prev,
        employeeId: value.id,
        division: value.division,
        designation: value.designation,
        subDivision: value.subDivision,
        headquarter: value.headquarter
      }));
    } else {
        setFormData(prev => ({ ...prev, employeeId: '', division: '', designation: '', subDivision: '', headquarter: '' }));
    }
  };

  const handleAssetSelect = (event, value) => {
    if (value) {
      setFormData(prev => ({
        ...prev,
        productId: value.id,
        assetName: value.name,
        // Auto fill details
        modelNo: value.model,
        caNo: value.caNo,
        invoiceNumber: value.invoice,
        serialNumber: 'N/A', // Assuming user enters specific serial later or auto-gen
      }));
      // Set dates if available
      setPurchaseDate(dayjs(value.pDate));
      setWarrantyEndDate(dayjs(value.wDate));
    }
  };

  const handleSave = async () => {
    if (!formData.employeeId || !formData.productId) {
      Swal.fire({ icon: 'warning', title: 'Missing Fields', text: 'Please select Employee and Asset.' });
      return;
    }

    setSubmittingForm(true);
    const adminId = localStorage.getItem('loggedInEmpId') || '1';
    const payload = new FormData();
    // Map fields
    payload.append('assets_name', formData.assetName);
    payload.append('quantity', 1);
    payload.append('assets_category_id', formData.categoryId);
    payload.append('brand_id', formData.brandId);
    payload.append('employee_id', formData.employeeId);
    payload.append('admin_id', adminId);
    payload.append('product_id', formData.productId);
    payload.append('serial_number', formData.serialNumber || 'N/A');
    payload.append('purchase_date', purchaseDate ? purchaseDate.format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'));
    payload.append('is_working', 'Yes');
    payload.append('company_asset_code', formData.caNo || 'N/A');
    payload.append('invoice_number', formData.invoiceNumber || 'N/A');
    if (warrantyEndDate) payload.append('warranty_end_date', warrantyEndDate.format('YYYY-MM-DD'));
    if (assetImageFile) payload.append('asset_image', assetImageFile);

    try {
      await axios.post(ASSETS_API_URL, payload);
      Swal.fire({ icon: 'success', title: 'Asset Allocated!', text: 'Asset successfully assigned.' });
      setFormData(initialFormState); // Reset form
      fetchAssets(); // Refresh table
    } catch (error) {
      console.error(error);
      Swal.fire({ icon: 'error', title: 'Failed', text: 'Allocation failed.' });
    } finally {
      setSubmittingForm(false);
    }
  };

  // --- Filtering & Pagination ---
  const filteredAssets = useMemo(() => {
    if (!searchQuery) return assets;
    return assets.filter((asset) => Object.values(asset).some((val) => String(val).toLowerCase().includes(searchQuery.toLowerCase())));
  }, [assets, searchQuery]);

  const paginatedAssets = filteredAssets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleViewDetails = (asset) => {
    setSelectedAsset(asset);
    setDetailsOpen(true);
  };

  const handleDownloadPdf = () => {
    // PDF Logic (Keep existing)
    const input = assetDetailsRef.current;
    if (!input) return;
    html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const contentHeight = (canvas.height * (pdfWidth - 20)) / canvas.width;
        pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth - 20, contentHeight);
        pdf.save(`Asset_${selectedAsset.assetName}.pdf`);
    });
  };

  // --- RENDER METHODS ---

  // 1. Render Master List Table (Tab 1: Asset)
  const renderMasterTable = () => (
    <>
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead sx={{ backgroundColor: THEME_PURPLE }}>
            <TableRow>
              {['Sr No', 'CA No.', 'Name of Asset', 'Category', 'Type', 'Model No', 'Invoice No.', 'Purchase Date', 'Warranty Date', 'Price', 'Status'].map(h => (
                <TableCell key={h} sx={{ color: 'white', fontWeight: 'bold', whiteSpace:'nowrap' }}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loadingAssets ? (
               Array.from(new Array(5)).map((_, i) => <TableRow key={i}><TableCell colSpan={11}><Skeleton /></TableCell></TableRow>)
            ) : paginatedAssets.length > 0 ? (
              paginatedAssets.map((row, index) => (
                <TableRow key={row.id} hover>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{row.caNo}</TableCell>
                  <TableCell>{row.assetName}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.modelNo}</TableCell>
                  <TableCell>{row.invoiceNo}</TableCell>
                  <TableCell>{row.purchaseDate ? dayjs(row.purchaseDate).format('DD-MM-YYYY') : '-'}</TableCell>
                  <TableCell>{row.warrantyEndDate ? dayjs(row.warrantyEndDate).format('DD-MM-YYYY') : '-'}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>
                    <Chip label={row.status} size="small" color={row.status === 'Allocated' ? 'primary' : 'success'} variant="outlined" />
                  </TableCell>
                </TableRow>
              ))
            ) : <TableRow><TableCell colSpan={11} align="center">No records found</TableCell></TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

  // 2. Render Allocation View (Tab 2: Asset Allocation - Form + Table)
  const renderAllocationView = () => (
    <Box>
      {/* Allocation Form - Matches image layout */}
      <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle2" fontWeight="bold" color={THEME_PURPLE} gutterBottom>+ Allocate</Typography>
        
        {/* Row 1: Employee Filters */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6} md={3}>
                <TextField fullWidth size="small" label="Designation" value={formData.designation} disabled placeholder="Auto-fill" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <TextField fullWidth size="small" label="Division" value={formData.division} disabled placeholder="Auto-fill" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <TextField fullWidth size="small" label="Sub-division" value={formData.subDivision} disabled placeholder="Auto-fill" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <TextField fullWidth size="small" label="Headquarter" value={formData.headquarter} disabled placeholder="Auto-fill" />
            </Grid>
        </Grid>

        {/* Row 2: Employee Select & Category */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
             <Grid item xs={12} md={6}>
                 <Autocomplete 
                    options={employees} 
                    getOptionLabel={(o) => o.name}
                    onChange={handleEmployeeChange}
                    renderInput={(params) => <TextField {...params} label="Name of Employee" size="small" required />} 
                 />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormControl fullWidth size="small">
                    <InputLabel>Select Category</InputLabel>
                    <Select label="Select Category" value={formData.categoryId} onChange={(e) => setFormData({...formData, categoryId: e.target.value, brandId: '', productId: '', assetName: ''})}>
                        {categories.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>

         {/* Row 3: Type, Brand, Asset */}
         <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} md={4}>
                 <TextField label="Select Type (Product)" size="small" fullWidth disabled value="Product Type" /> {/* Placeholder or dynamic if needed */}
            </Grid>
            <Grid item xs={12} md={4}>
                <FormControl fullWidth size="small">
                    <InputLabel>Select Brand</InputLabel>
                    <Select label="Select Brand" value={formData.brandId} onChange={(e) => setFormData({...formData, brandId: e.target.value, productId: '', assetName: ''})}>
                        {brands.map(b => <MenuItem key={b.id} value={b.id}>{b.name}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
                 <Autocomplete 
                    options={assetNameOptions} 
                    getOptionLabel={(o) => o.label}
                    onChange={handleAssetSelect}
                    loading={loadingAssetNames}
                    disabled={!formData.categoryId || !formData.brandId}
                    renderInput={(params) => <TextField {...params} label="Select Asset" size="small" required />} 
                 />
            </Grid>
         </Grid>

         {/* Auto Display Details */}
         {formData.assetName && (
             <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1, border: '1px dashed grey' }}>
                <Typography variant="caption" color="text.secondary">Asset Details (Auto Display):</Typography>
                <Grid container spacing={2} mt={0.5}>
                    <Grid item xs={6} sm={2}><Typography variant="body2"><b>Model:</b> {formData.modelNo}</Typography></Grid>
                    <Grid item xs={6} sm={2}><Typography variant="body2"><b>CA No:</b> {formData.caNo}</Typography></Grid>
                    <Grid item xs={6} sm={2}><Typography variant="body2"><b>Invoice:</b> {formData.invoiceNumber}</Typography></Grid>
                    <Grid item xs={6} sm={3}><Typography variant="body2"><b>Purchase:</b> {purchaseDate?.format('DD-MM-YYYY')}</Typography></Grid>
                    <Grid item xs={6} sm={3}><Typography variant="body2"><b>Warranty:</b> {warrantyEndDate?.format('DD-MM-YYYY')}</Typography></Grid>
                    {/* Add Image preview here if API provides it in dropdown details */}
                </Grid>
             </Box>
         )}

         <Box display="flex" justifyContent="flex-end" mt={2}>
             <Button variant="contained" onClick={handleSave} disabled={submittingForm} sx={{ bgcolor: THEME_PURPLE, '&:hover': { bgcolor: THEME_PURPLE_HOVER } }}>
                {submittingForm ? <CircularProgress size={24} color="inherit" /> : 'Allocate Asset'}
             </Button>
         </Box>
      </Paper>

      {/* Allocation List Table */}
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead sx={{ backgroundColor: THEME_PURPLE }}>
            <TableRow>
              {['Sr No', 'Name of employee', 'Department', 'Designation', 'Division', 'Sub-division', 'Headquarter', 'Name of Asset', 'Date of assignment', 'View Details'].map(h => (
                <TableCell key={h} sx={{ color: 'white', fontWeight: 'bold' }}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loadingAssets ? (
               Array.from(new Array(5)).map((_, i) => <TableRow key={i}><TableCell colSpan={10}><Skeleton /></TableCell></TableRow>)
            ) : paginatedAssets.length > 0 ? (
              paginatedAssets.map((row, index) => (
                <TableRow key={row.id} hover>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{row.employee}</TableCell>
                  <TableCell>{row.dept}</TableCell>
                  <TableCell>{row.desig}</TableCell>
                  <TableCell>{row.division}</TableCell>
                  <TableCell>{row.subDivision || '-'}</TableCell>
                  <TableCell>{row.hq}</TableCell>
                  <TableCell>{row.assetName}</TableCell>
                  <TableCell>{row.assignmentDate ? dayjs(row.assignmentDate).format('DD-MM-YYYY') : '-'}</TableCell>
                  <TableCell>
                    <Button size="small" sx={{color: THEME_PURPLE}} onClick={() => handleViewDetails(row)}>View</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : <TableRow><TableCell colSpan={10} align="center">No allocations found</TableCell></TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CardContent sx={{ p: { xs: 1.5, sm: 3 } }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4" fontWeight="bold" sx={{ color: THEME_PURPLE }}>
            {mode === 'master' ? 'Asset Management' : 'Asset Allocation'}
          </Typography>
          <TextField 
            size="small" 
            placeholder="Search..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            sx={{ width: 250 }}
          />
        </Box>

        {/* Render content based on mode */}
        {mode === 'master' ? renderMasterTable() : renderAllocationView()}

        {/* Common Pagination */}
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
             <Pagination count={Math.ceil(filteredAssets.length / rowsPerPage)} page={page + 1} onChange={(e, p) => setPage(p - 1)} />
        </Box>

        {/* View Details Dialog */}
        <Dialog open={detailsOpen} onClose={() => setDetailsOpen(false)} fullWidth maxWidth="md">
            <DialogTitle sx={{ bgcolor: THEME_PURPLE, color: 'white' }}>Asset Details</DialogTitle>
            <DialogContent ref={assetDetailsRef} sx={{ mt: 2 }}>
                {selectedAsset && (
                    <Grid container spacing={2}>
                        <Grid item xs={6}><Typography><b>Asset:</b> {selectedAsset.assetName}</Typography></Grid>
                        <Grid item xs={6}><Typography><b>Employee:</b> {selectedAsset.employee}</Typography></Grid>
                        <Grid item xs={6}><Typography><b>Serial No:</b> {selectedAsset.modelNo}</Typography></Grid>
                        <Grid item xs={6}><Typography><b>Status:</b> {selectedAsset.status}</Typography></Grid>
                        {selectedAsset.imageUrl && <Grid item xs={12}><img src={selectedAsset.imageUrl} alt="Asset" style={{maxWidth: '100%', maxHeight: 300}} /></Grid>}
                    </Grid>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDownloadPdf}>Download PDF</Button>
                <Button onClick={() => setDetailsOpen(false)}>Close</Button>
            </DialogActions>
        </Dialog>
      </CardContent>
    </LocalizationProvider>
  );
};

export default Assets;