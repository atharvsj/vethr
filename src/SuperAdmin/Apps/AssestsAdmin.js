// import React, { useState } from 'react';
// import Assets from './Assets';
// import Category from './Category';  
// import Brands from './Brands'; 
// import { Box, Card, CardActionArea, CardContent, Grid, Typography, Container } from '@mui/material';



// const AssetsAdmin = () => {
//   const [selectedOption, setSelectedOption] = useState('Assets');

//   const renderComponent = () => {
//     switch (selectedOption) {
//       case 'Assets':
//         return <Assets />;
//       case 'Category':
//         return <Category />;
//       case 'Brands':
//         return <Brands />;
//       default:
//         return null;
//     }
//   };

//   const options = [
//     { label: 'Assets', sublabel: 'Manage fixed assets' },
//     { label: 'Category', sublabel: 'View current assets' },
//     { label: 'Brands', sublabel: 'Track investments' },
//   ];

//   return (
//     <Box p={0}>
//       {/* Top Section: Card Options */}
//       <Grid container spacing={3} justifyContent="center">
//         {options.map((option) => (
//           <Grid item xs={12} sm={4} md={3} key={option.label}>
//             <Card
//               variant="outlined"
//               sx={{
//                 textAlign: 'center',
//                 backgroundColor: selectedOption === option.label ? '#ede9fe' : '#f9fafb',
//                 borderColor: selectedOption === option.label ? '#7c3aed' : '#e0e0e0',
//                 cursor: 'pointer',
//                 '&:hover': {
//                   backgroundColor: '#ede9fe',
//                   borderColor: '#7c3aed',
//                   transform: 'scale(1.05)',
//                   transition: '0.2s ease-in-out',
//                 },
//                 borderRadius: 2,
//                 minHeight: 50,
//                 width: '100%',
//                 maxWidth: 180,
//                 mx: 'auto',
//               }}
//             >
//               <CardActionArea onClick={() => setSelectedOption(option.label)}>
//                 <CardContent sx={{ p: 1 }}>
//                   <Typography 
//                     variant="subtitle2" 
//                     fontWeight="bold" 
//                     color={selectedOption === option.label ? '#7c3aed' : 'inherit'}
//                   >
//                     {option.label}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary" noWrap>
//                     {option.sublabel}
//                   </Typography>
//                 </CardContent>
//               </CardActionArea>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Bottom Section: Render Selected Component */}
//       <Container sx={{ mt: 4, p: 3, backgroundColor: '#f5f5f5', borderRadius: 3 }}>
//         {renderComponent()}
//       </Container>
//     </Box>
//   );
// };

// export default AssetsAdmin;





// import React, { useState } from 'react';
// import Assets from './Assets';
// import Category from './Category';
// import Brands from './Brands';
// import { Box, Card, CardActionArea, CardContent, Grid, Typography, Container } from '@mui/material';

// const AssetsAdmin = () => {
//   const [selectedOption, setSelectedOption] = useState('Assets');

//   const renderComponent = () => {
//     switch (selectedOption) {
//       case 'Assets':
//         return <Assets />;
//       case 'Category':
//         return <Category />;
//       case 'Brands':
//         return <Brands />;
//       default:
//         return null;
//     }
//   };

//   const options = [
//     { label: 'Assets', sublabel: 'Manage fixed assets' },
//     { label: 'Category', sublabel: 'View current assets' },
//     { label: 'Brands', sublabel: 'Track investments' },
//   ];

//   return (
//     <Box p={0}>
//       {/* Top Section: Card Options */}
//       <Grid container spacing={1} justifyContent="center"> {/* Reduced spacing for mobile */}
//         {options.map((option) => (
//           <Grid item xs={12} sm={4} md={3} key={option.label}> {/* xs={12} ensures full width on mobile */}
//             <Card
//               variant="outlined"
//               sx={{
//                 textAlign: 'center',
//                 backgroundColor: selectedOption === option.label ? '#ede9fe' : '#f9fafb',
//                 borderColor: selectedOption === option.label ? '#7c3aed' : '#e0e0e0',
//                 cursor: 'pointer',
//                 '&:hover': {
//                   backgroundColor: '#ede9fe',
//                   borderColor: '#7c3aed',
//                   transform: 'scale(1.02)', // Slightly reduced scale for mobile cards
//                   transition: '0.2s ease-in-out',
//                 },
//                 borderRadius: 2,
//                 minHeight: 50,
//                 width: '100%', // Card now takes 100% of its Grid item
//                 // maxWidth: 180, // REMOVED: Let Grid control width on mobile
//                 mx: 'auto', // Still centers the card within its grid item if it's smaller
//                 // Added responsive styling for card width if you still want a max width on larger screens
//                 // but not on xs
//                 '@media (min-width:600px)': { // For screens larger than 'xs' breakpoint
//                   maxWidth: 180,
//                 },
//               }}
//             >
//               <CardActionArea onClick={() => setSelectedOption(option.label)} sx={{ height: '100%' }}> {/* Ensure ActionArea fills card */}
//                 <CardContent sx={{ p: 1 }}>
//                   <Typography
//                     variant="subtitle2"
//                     fontWeight="bold"
//                     color={selectedOption === option.label ? '#7c3aed' : 'inherit'}
//                   >
//                     {option.label}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary" noWrap>
//                     {option.sublabel}
//                   </Typography>
//                 </CardContent>
//               </CardActionArea>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Bottom Section: Render Selected Component */}
//       <Container
//         maxWidth={false} // This is key: removes the default max-width for the container
//         disableGutters // Optional: removes the default left/right padding of the container
//         sx={{
//           mt: 4,
//           p: { xs: 1, sm: 3 }, // Adjust padding for mobile (xs) vs larger screens (sm)
//           backgroundColor: '#f5f5f5',
//           borderRadius: 3,
//         }}
//       >
//         {renderComponent()}
//       </Container>
//     </Box>
//   );
// };

// export default AssetsAdmin;














// import React, { useState } from 'react';
// import Assets from './Assets';
// import Category from './Category';
// import Brands from './Brands';

// import NewPurchaseAssets from './NewPurchaseAssets';
// import { Box, Card, CardActionArea, CardContent, Grid, Typography, Container } from '@mui/material';
// import AssestsInventory from './AssestsInventory';

// const AssetsAdmin = () => {
//   const [selectedOption, setSelectedOption] = useState('Assets');

//   const renderComponent = () => {
//     switch (selectedOption) {
//       case 'Assets':
//         return <Assets />;
//       case 'Category':
//         return <Category />;
//       case 'Brands':
//         return <Brands />;
//       case 'Assets Inventory':
//         return <AssestsInventory />;
//       case 'New Purchase Assets':
//         return <NewPurchaseAssets />;
//       default:
//         return null;
//     }
//   };

//   const options = [
//     { label: 'Assets', sublabel: 'Manage fixed assets' },
//     { label: 'Category', sublabel: 'View current assets' },
//     { label: 'Brands', sublabel: 'Track investments' },
//     { label: 'Assets Inventory', sublabel: 'Check inventory details' },
//     { label: 'New Purchase Assets', sublabel: 'Add new purchases' },
//   ];

//   return (
//     <Box p={0}>
//       {/* Top Section: Card Options */}
//       <Grid container spacing={0.5} justifyContent="center">
//         {options.map((option) => (
//           <Grid item xs={12} sm={3} md={1.8} key={option.label}>
//             <Card
//               variant="outlined"
//               sx={{
//                 textAlign: 'center',
//                 backgroundColor: selectedOption === option.label ? '#ede9fe' : '#f9fafb',
//                 borderColor: selectedOption === option.label ? '#7c3aed' : '#e0e0e0',
//                 cursor: 'pointer',
//                 '&:hover': {
//                   backgroundColor: '#ede9fe',
//                   borderColor: '#7c3aed',
//                   transform: 'scale(1.02)',
//                   transition: '0.2s ease-in-out',
//                 },
//                 borderRadius: 2,
//                 minHeight: 50,
//                 width: '100%',
//                 mx: 'auto',
//                 '@media (min-width:600px)': {
//                   maxWidth: 150,
//                 },
//               }}
//             >
//               <CardActionArea onClick={() => setSelectedOption(option.label)} sx={{ height: '100%' }}>
//                 <CardContent sx={{ p: 1 }}>
//                   <Typography
//                     variant="subtitle2"
//                     fontWeight="bold"
//                     color={selectedOption === option.label ? '#7c3aed' : 'inherit'}
//                   >
//                     {option.label}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary" noWrap>
//                     {option.sublabel}
//                   </Typography>
//                 </CardContent>
//               </CardActionArea>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Bottom Section: Render Selected Component */}
//       <Container
//         maxWidth={false}
//         disableGutters
//         sx={{
//           mt: 4,
//           p: { xs: 1, sm: 3 },
//           backgroundColor: '#f5f5f5',
//           borderRadius: 3,
//         }}
//       >
//         {renderComponent()}
//       </Container>
//     </Box>
//   );
// };

// export default AssetsAdmin;


















// import React, { useState } from "react";
// import Assets from "./Assets";
// import Category from "./Category";
// import Brands from "./Brands";
// import NewPurchaseAssets from "./NewPurchaseAssets";
// import AssestsInventory from "./AssestsInventory";
// import {
//   Box,
//   Card,
//   CardActionArea,
//   CardContent,
//   Grid,
//   Typography,
//   Container,
// } from "@mui/material";

// const AssetsAdmin = () => {
//   const [selectedOption, setSelectedOption] = useState("Assets");

//   const renderComponent = () => {
//     switch (selectedOption) {
//       case "Assets":
//         return <Assets />;
//       case "Category":
//         return <Category />;
//       case "Brands":
//         return <Brands />;
//       case "Assets Inventory":
//         return <AssestsInventory />;
//       case "New Purchase Assets":
//         return <NewPurchaseAssets />;
//       default:
//         return null;
//     }
//   };

//   const options = [
//     { label: "Assets", sublabel: "Manage fixed assets" },
//     { label: "Category", sublabel: "View current assets" },
//     { label: "Brands", sublabel: "Track investments" },
//     { label: "Assets Inventory", sublabel: "Check inventory details" },
//     { label: "New Purchase Assets", sublabel: "Add new purchases" },
//   ];

//   return (
//     <Box p={2}>
//       {/* Top Section: Card Options */}
//       <Grid
//         container
//         spacing={2}
//         justifyContent="center"
//         alignItems="stretch"
//         sx={{ mb: 3 }}
//       >
//         {options.map((option) => (
//           <Grid
//             item
//             xs={6}
//             sm={4}
//             md={2.4}
//             key={option.label}
//             sx={{ display: "flex" }}
//           >
//             <Card
//               variant="outlined"
//               sx={{
//                 flex: 1,
//                 display: "flex",
//                 alignItems: "stretch",
//                 textAlign: "center",
//                 backgroundColor:
//                   selectedOption === option.label ? "#ede9fe" : "#ffffff",
//                 borderColor:
//                   selectedOption === option.label ? "#7c3aed" : "#e0e0e0",
//                 cursor: "pointer",
//                 transition: "all 0.3s ease",
//                 "&:hover": {
//                   backgroundColor: "#f3e8ff",
//                   borderColor: "#7c3aed",
//                   transform: "translateY(-3px)",
//                   boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
//                 },
//                 borderRadius: 2,
//                 minHeight: 100, // 👈 same height for all cards
//               }}
//             >
//               <CardActionArea
//                 onClick={() => setSelectedOption(option.label)}
//                 sx={{ height: "100%" }}
//               >
//                 <CardContent
//                   sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "center",
//                     height: "100%",
//                     p: 2,
//                   }}
//                 >
//                   <Typography
//                     variant="subtitle1"
//                     fontWeight="bold"
//                     color={
//                       selectedOption === option.label ? "#7c3aed" : "text.primary"
//                     }
//                     gutterBottom
//                   >
//                     {option.label}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     color="text.secondary"
//                     sx={{ fontSize: "0.8rem" }}
//                   >
//                     {option.sublabel}
//                   </Typography>
//                 </CardContent>
//               </CardActionArea>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Bottom Section: Render Selected Component */}
//       <Container
//         maxWidth={false}
//         disableGutters
//         sx={{
//           mt: 2,
//           p: { xs: 2, sm: 3 },
//           backgroundColor: "#fafafa",
//           borderRadius: 3,
//           boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
//         }}
//       >
//         {renderComponent()}
//       </Container>
//     </Box>
//   );
// };

// export default AssetsAdmin;







// import React, { useState } from "react";
// import Assets from "./Assets";
// import Category from "./Category";
// import Brands from "./Brands";
// import NewPurchaseAssets from "./NewPurchaseAssets";
// import AssestsInventory from "./AssestsInventory";
// import AssetsProductAdmin from "./AssetsProductAdmin"; // 👈 Import new component
// import {
//   Box,
//   Card,
//   CardActionArea,
//   CardContent,
//   Typography,
//   Container,
// } from "@mui/material";

// const AssetsAdmin = () => {
//   const [selectedOption, setSelectedOption] = useState("Assets");

//   const renderComponent = () => {
//     switch (selectedOption) {
//       case "Assets":
//         return <Assets />;
//       case "Category":
//         return <Category />;
//       case "Brands":
//         return <Brands />;
//       case "Assets Inventory":
//         return <AssestsInventory />;
//       case "New Purchase Assets":
//         return <NewPurchaseAssets />;
//       case "Assets Products":
//         return <AssetsProductAdmin />;
//       default:
//         return null;
//     }
//   };

//   const options = [
//     { label: "Assets", sublabel: "Manage fixed assets" },
//     { label: "Category", sublabel: "View current assets" },
//     { label: "Brands", sublabel: "Track investments" },
//     { label: "Assets Inventory", sublabel: "Check inventory details" },
//     { label: "New Purchase Assets", sublabel: "Add new purchases" },
//     { label: "Assets Products", sublabel: "Manage asset products" },
//   ];

//   return (
//     <Box p={2}>
//       {/* Top Section: Card Options in One Row */}
//       <Box
//         sx={{
//           display: "flex",
//           gap: 2,
//           justifyContent: "center",
//           flexWrap: "nowrap", // 👈 keeps them in one row
//           overflowX: "auto", // 👈 allows scroll on small screens
//           mb: 3,
//         }}
//       >
//         {options.map((option) => (
//          <Card
//   key={option.label}
//   variant="outlined"
//   sx={{
//     width: 180,
//     textAlign: "center",
//     backgroundColor:
//       selectedOption === option.label ? "#ede9fe" : "#ffffff",
//     borderColor:
//       selectedOption === option.label ? "#7c3aed" : "#e0e0e0",
//     cursor: "pointer",
//     transition: "all 0.3s ease",
//      boxShadow: "0 4px 12px rgba(124,58,237,0.25), 0 6px 20px rgba(255,102,0,0.25)",
//     "&:hover": {
//       backgroundColor: "#f3e8ff",
//       borderColor: "#7c3aed",
//       transform: "translateY(-3px)",
//       boxShadow: "0 6px 16px rgba(124,58,237,0.35), 0 8px 24px rgba(255,102,0,0.35)",
//     },
//     borderRadius: 2,
//     minHeight: 100,
//     flexShrink: 0,
//   }}
// >

//             <CardActionArea
//               onClick={() => setSelectedOption(option.label)}
//               sx={{ height: "100%" }}
//             >
//               <CardContent
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "center",
//                   height: "100%",
//                   p: 2,
//                 }}
//               >
//                 <Typography
//                   variant="subtitle1"
//                   fontWeight="bold"
//                   color={
//                     selectedOption === option.label ? "#7c3aed" : "text.primary"
//                   }
//                   gutterBottom
//                 >
//                   {option.label}
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   color="text.secondary"
//                   sx={{ fontSize: "0.8rem" }}
//                 >
//                   {option.sublabel}
//                 </Typography>
//               </CardContent>
//             </CardActionArea>
//           </Card>
//         ))}
//       </Box>

//       {/* Bottom Section: Render Selected Component */}
//       <Container
//         maxWidth={false}
//         disableGutters
//         sx={{
//           mt: 2,
//           p: { xs: 2, sm: 3 },
//           backgroundColor: "#fafafa",
//           borderRadius: 3,
//           boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
//         }}
//       >
//         {renderComponent()}
//       </Container>
//     </Box>
//   );
// };

// export default AssetsAdmin;   //////// 






// import React, { useState } from "react";
// import {
//   Box,
//   Card,
//   CardActionArea,
//   CardContent,
//   Typography,
//   Grid,
//   Fade,
//   useTheme,
//   alpha,
// } from "@mui/material";

// // Import Child Components
// import Assets from "./Assets";
// import Category from "./Category";
// import Brands from "./Brands";
// import NewPurchaseAssets from "./NewPurchaseAssets";
// import AssestsInventory from "./AssestsInventory";
// import AssetsProductAdmin from "./AssetsProductAdmin";

// // Import Icons for a more professional look
// import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
// import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
// import StarsOutlinedIcon from '@mui/icons-material/StarsOutlined';
// import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
// import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
// import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';

// // Define options outside the component to prevent re-creation on every render
// const options = [
//   {
//     label: "Assets",
//     sublabel: "Manage fixed assets",
//     icon: <BusinessCenterOutlinedIcon fontSize="large" />,
//   },
//   {
//     label: "Category",
//     sublabel: "View current assets",
//     icon: <CategoryOutlinedIcon fontSize="large" />,
//   },
//   {
//     label: "Brands",
//     sublabel: "Track asset brands",
//     icon: <StarsOutlinedIcon fontSize="large" />,
//   },
//   {
//     label: "Assets Inventory",
//     sublabel: "Check inventory details",
//     icon: <Inventory2OutlinedIcon fontSize="large" />,
//   },
//   {
//     label: "New Purchase Assets",
//     sublabel: "Add new purchases",
//     icon: <AddShoppingCartOutlinedIcon fontSize="large" />,
//   },
//   {
//     label: "Assets Products",
//     sublabel: "Manage asset products",
//     icon: <WidgetsOutlinedIcon fontSize="large" />,
//   },
// ];

// const AssetsAdmin = () => {
//   const [selectedOption, setSelectedOption] = useState("Assets");
//   const theme = useTheme(); // Access the MUI theme for consistent colors

//   // Define your custom primary color here
//   const customPrimaryColor = "#8b5cf6";

//   const renderComponent = () => {
//     switch (selectedOption) {
//       case "Assets":
//         return <Assets />;
//       case "Category":
//         return <Category />;
//       case "Brands":
//         return <Brands />;
//       case "Assets Inventory":
//         return <AssestsInventory />;
//       case "New Purchase Assets":
//         return <NewPurchaseAssets />;
//       case "Assets Products":
//         return <AssetsProductAdmin />;
//       default:
//         return <Typography>Please select an option.</Typography>;
//     }
//   };

//   return (
//     <Box p={{ xs: 2, sm: 3 }}>
//       {/* Top Section: Responsive Card Options using Grid */}
//       <Grid
//         container
//         spacing={2}
//         sx={{
//           mb: 4,
//           // --- CHANGE #1 START ---
//           // On mobile screens (xs breakpoint), prevent wrapping and enable horizontal scrolling.
//           // On larger screens (sm and up), revert to the default wrapping behavior.
//           flexWrap: { xs: "nowrap", sm: "wrap" },
//           overflowX: { xs: "auto", sm: "hidden" },
//           // Add some padding at the bottom on mobile to make space for the scrollbar
//           pb: { xs: 2, sm: 0 },
//           // For a cleaner look, you can uncomment the lines below to hide the scrollbar
//           // while keeping the scroll functionality.
//           // '&::-webkit-scrollbar': {
//           //   display: 'none',
//           // },
//           // msOverflowStyle: 'none',  /* IE and Edge */
//           // scrollbarWidth: 'none',  /* Firefox */
//           // --- CHANGE #1 END ---
//         }}
//       >
//         {options.map((option) => {
//           const isSelected = selectedOption === option.label;
//           return (
//             // --- CHANGE #2 START ---
//             // Adjusted the `xs` prop.
//             // Instead of `xs={12}` (full width), we use `xs={8}`. This makes each card
//             // take up 8/12 (~66%) of the screen width on mobile, which forces the
//             // container to overflow and activates the horizontal scrollbar.
//             <Grid item xs={8} sm={6} md={4} lg={2} key={option.label}>
//             {/* --- CHANGE #2 END --- */}
//               <Card
//                 variant="outlined"
//                 sx={{
//                   height: '100%',
//                   textAlign: "center",
//                   transition: "all 0.3s ease-in-out",
//                   backgroundColor: isSelected ? alpha(customPrimaryColor, 0.08) : 'background.paper',
//                   borderColor: isSelected ? customPrimaryColor : theme.palette.divider,
//                   boxShadow: isSelected
//                     ? `0 4px 12px ${alpha(customPrimaryColor, 0.2)}`
//                     : "0 1px 3px rgba(0,0,0,0.05)",
//                   "&:hover": {
//                     transform: "translateY(-4px)",
//                     boxShadow: `0 6px 16px ${alpha(customPrimaryColor, 0.25)}`,
//                     borderColor: customPrimaryColor,
//                   },
//                 }}
//               >
//                 <CardActionArea
//                   onClick={() => setSelectedOption(option.label)}
//                   sx={{
//                     height: "100%",
//                     p: 2,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'center',
//                   }}
//                 >
//                   <Box color={isSelected ? customPrimaryColor : 'text.secondary'} mb={1.5}>
//                     {option.icon}
//                   </Box>
//                   <Typography
//                     variant="subtitle1"
//                     fontWeight="600"
//                     color={isSelected ? customPrimaryColor : 'text.primary'}
//                   >
//                     {option.label}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     {option.sublabel}
//                   </Typography>
//                 </CardActionArea>
//               </Card>
//             </Grid>
//           );
//         })}
//       </Grid>

//       {/* Bottom Section: Render Selected Component with Fade Transition */}
//       <Box
//         sx={{
//           p: { xs: 2, sm: 3 },
//           backgroundColor: "background.paper",
//           borderRadius: 3,
//           boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
//         }}
//       >
//         <Fade in timeout={400} key={selectedOption}>
//           <div>{renderComponent()}</div>
//         </Fade>
//       </Box>
//     </Box>
//   );
// };

// export default AssetsAdmin;







// import React, { useState } from "react";
// import {
//   Box,
//   Card,
//   CardActionArea,
//   CardContent,
//   Typography,
//   Grid,
//   Fade,
//   useTheme,
//   alpha,
// } from "@mui/material";

// // Import Child Components
// import Assets from "./Assets";
// import Category from "./Category";
// import Brands from "./Brands";
// import NewPurchaseAssets from "./NewPurchaseAssets";
// import AssestsInventory from "./AssestsInventory";
// import AssetsProductAdmin from "./AssetsProductAdmin";

// // Import Icons for a more professional look
// import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
// import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
// import StarsOutlinedIcon from '@mui/icons-material/StarsOutlined';
// import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
// import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
// import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';

// // Define options outside the component to prevent re-creation on every render
// const options = [
//   {
//     label: "Assets",
//     sublabel: "Manage fixed assets",
//     icon: <BusinessCenterOutlinedIcon fontSize="large" />,
//   },
//   {
//     label: "Category",
//     sublabel: "View current assets",
//     icon: <CategoryOutlinedIcon fontSize="large" />,
//   },
//   {
//     label: "Brands",
//     sublabel: "Track asset brands",
//     icon: <StarsOutlinedIcon fontSize="large" />,
//   },
//   {
//     label: "Assets Products",
//     sublabel: "Manage asset products",
//     icon: <WidgetsOutlinedIcon fontSize="large" />,
//   },
//   {
//     label: "New  Asset Purchase",
//     sublabel: "Add new purchases",
//     icon: <AddShoppingCartOutlinedIcon fontSize="large" />,
//   },
  
//   {
//     label: "Assets Inventory",
//     sublabel: "Check inventory details",
//     icon: <Inventory2OutlinedIcon fontSize="large" />,
//   },
// ];

// const AssetsAdmin = () => {
//   const [selectedOption, setSelectedOption] = useState("Assets");
//   const theme = useTheme(); // Access the MUI theme for consistent colors

//   // Define your custom primary color here
//   const customPrimaryColor = "#F58E35";

//   const renderComponent = () => {
//     switch (selectedOption) {
//       case "Assets":
//         return <Assets />;
//       case "Category":
//         return <Category />;
//       case "Brands":
//         return <Brands />;
//       case "Assets Inventory":
//         return <AssestsInventory />;
//       case "New  Asset Purchase":
//         return <NewPurchaseAssets />;
//       case "Assets Products":
//         return <AssetsProductAdmin />;
//       default:
//         return <Typography>Please select an option.</Typography>;
//     }
//   };

//   return (
//     <Box p={{ xs: 2, sm: 3 }}>
//       {/* Top Section: Responsive Card Options using Grid */}
//       <Grid
//         container
//         spacing={2}
//         sx={{
//           mb: 4,
//           // --- CHANGE #1 START ---
//           // On mobile screens (xs breakpoint), prevent wrapping and enable horizontal scrolling.
//           // On larger screens (sm and up), revert to the default wrapping behavior.
//           flexWrap: { xs: "nowrap", sm: "wrap" },
//           overflowX: { xs: "auto", sm: "hidden" },
//           // Add some padding at the bottom on mobile to make space for the scrollbar
//           pb: { xs: 2, sm: 0 },
//           // For a cleaner look, you can uncomment the lines below to hide the scrollbar
//           // while keeping the scroll functionality.
//           // '&::-webkit-scrollbar': {
//           //   display: 'none',
//           // },
//           // msOverflowStyle: 'none',  /* IE and Edge */
//           // scrollbarWidth: 'none',  /* Firefox */
//           // --- CHANGE #1 END ---
//         }}
//       >
//         {options.map((option) => {
//           const isSelected = selectedOption === option.label;
//           return (
//             // --- CHANGE #2 START ---
//             // Adjusted the `xs` prop.
//             // Instead of `xs={12}` (full width), we use `xs={8}`. This makes each card
//             // take up 8/12 (~66%) of the screen width on mobile, which forces the
//             // container to overflow and activates the horizontal scrollbar.
//             <Grid item xs={8} sm={6} md={4} lg={2} key={option.label}>
//             {/* --- CHANGE #2 END --- */}
//               <Card
//                 variant="outlined"
//                 sx={{
//                   height: '100%',
//                   textAlign: "center",
//                   transition: "all 0.3s ease-in-out",
//                   backgroundColor: isSelected ? alpha(customPrimaryColor, 0.08) : 'background.paper',
//                   borderColor: isSelected ? customPrimaryColor : theme.palette.divider,
//                   boxShadow: isSelected
//                     ? `0 4px 12px ${alpha(customPrimaryColor, 0.2)}`
//                     : "0 1px 3px rgba(0,0,0,0.05)",
//                   "&:hover": {
//                     transform: "translateY(-4px)",
//                     boxShadow: `0 6px 16px ${alpha(customPrimaryColor, 0.25)}`,
//                     borderColor: customPrimaryColor,
//                   },
//                 }}
//               >
//                 <CardActionArea
//                   onClick={() => setSelectedOption(option.label)}
//                   sx={{
//                     height: "100%",
//                     p: 2,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'center',
//                   }}
//                 >
//                   <Box color={isSelected ? customPrimaryColor : 'text.secondary'} mb={1.5}>
//                     {option.icon}
//                   </Box>
//                   <Typography
//                     variant="subtitle1"
//                     fontWeight="600"
//                     color={isSelected ? customPrimaryColor : 'text.primary'}
//                   >
//                     {option.label}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     {option.sublabel}
//                   </Typography>
//                 </CardActionArea>
//               </Card>
//             </Grid>
//           );
//         })}
//       </Grid>

//       {/* Bottom Section: Render Selected Component with Fade Transition */}
//       <Box
//         sx={{
//           p: { xs: 2, sm: 3 },
//           backgroundColor: "background.paper",
//           borderRadius: 3,
//           boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
//         }}
//       >
//         <Fade in timeout={400} key={selectedOption}>
//           <div>{renderComponent()}</div>
//         </Fade>
//       </Box>
//     </Box>
//   );
// };

// export default AssetsAdmin;








 
// import React, { useState } from "react";
// import {
//   Box,
//   Card,
//   CardActionArea,
//   CardContent,
//   Typography,
//   Grid,
//   Fade,
//   useTheme,
//   alpha,
// } from "@mui/material";
 
// // Import Child Components
// import Assets from "./Assets";
// import Category from "./Category";
// import Brands from "./Brands";
// import NewPurchaseAssets from "./NewPurchaseAssets";
// import AssestsInventory from "./AssestsInventory";
// import AssetsProductAdmin from "./AssetsProductAdmin";
 
// // Import Icons for a more professional look
// import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
// import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
// import StarsOutlinedIcon from '@mui/icons-material/StarsOutlined';
// import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
// import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
// import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
 
// // Define options outside the component to prevent re-creation on every render
// const options = [
//   {
//     label: "Assets",
//     sublabel: "Manage fixed assets",
//     icon: <BusinessCenterOutlinedIcon fontSize="large" />,
//   },
//   {
//     label: "Category",
//     sublabel: "View current assets",
//     icon: <CategoryOutlinedIcon fontSize="large" />,
//   },
//   {
//     label: "Brands",
//     sublabel: "Track asset brands",
//     icon: <StarsOutlinedIcon fontSize="large" />,
//   },
//   {
//     label: "Assets Products",
//     sublabel: "Manage asset products",
//     icon: <WidgetsOutlinedIcon fontSize="large" />,
//   },
//   {
//     label: "New  Asset Purchase",
//     sublabel: "Add new purchases",
//     icon: <AddShoppingCartOutlinedIcon fontSize="large" />,
//   },
 
//   {
//     label: "Assets Inventory",
//     sublabel: "Check inventory details",
//     icon: <Inventory2OutlinedIcon fontSize="large" />,
//   },
// ];
 
// const AssetsAdmin = () => {
//   const [selectedOption, setSelectedOption] = useState("Assets");
//   const theme = useTheme(); // Access the MUI theme for consistent colors
 
//   // Define your custom primary color here
//   const customPrimaryColor = "#F58E35";
 
//   const renderComponent = () => {
//     switch (selectedOption) {
//       case "Assets":
//         return <Assets />;
//       case "Category":
//         return <Category />;
//       case "Brands":
//         return <Brands />;
//       case "Assets Inventory":
//         return <AssestsInventory />;
//       case "New  Asset Purchase":
//         return <NewPurchaseAssets />;
//       case "Assets Products":
//         return <AssetsProductAdmin />;
//       default:
//         return <Typography>Please select an option.</Typography>;
//     }
//   };
 
//   return (
//     <Box p={{ xs: 2, sm: 3 }}>
//       {/* Top Section: Responsive Card Options using Grid */}
//       <Grid
//         container
//         spacing={2}
//         sx={{
//           mb: 4,
//           // --- CHANGE #1 START ---
//           // On mobile screens (xs breakpoint), prevent wrapping and enable horizontal scrolling.
//           // On larger screens (sm and up), revert to the default wrapping behavior.
//           flexWrap: { xs: "nowrap", sm: "wrap" },
//           overflowX: { xs: "auto", sm: "hidden" },
//           // Add some padding at the bottom on mobile to make space for the scrollbar
//           pb: { xs: 2, sm: 0 },
//           // For a cleaner look, you can uncomment the lines below to hide the scrollbar
//           // while keeping the scroll functionality.
//           // '&::-webkit-scrollbar': {
//           //   display: 'none',
//           // },
//           // msOverflowStyle: 'none',  /* IE and Edge */
//           // scrollbarWidth: 'none',  /* Firefox */
//           // --- CHANGE #1 END ---
//         }}
//       >
//         {options.map((option) => {
//           const isSelected = selectedOption === option.label;
//           return (
//             // --- CHANGE #2 START ---
//             // Adjusted the `xs` prop.
//             // Instead of `xs={12}` (full width), we use `xs={8}`. This makes each card
//             // take up 8/12 (~66%) of the screen width on mobile, which forces the
//             // container to overflow and activates the horizontal scrollbar.
//             <Grid item xs={8} sm={6} md={4} lg={2} key={option.label}>
//             {/* --- CHANGE #2 END --- */}
//               <Card
//                 variant="outlined"
//                 sx={{
//                   height: '100%',
//                   textAlign: "center",
//                   transition: "all 0.3s ease-in-out",
//                   backgroundColor: isSelected ? alpha(customPrimaryColor, 0.08) : 'background.paper',
//                   borderColor: isSelected ? customPrimaryColor : theme.palette.divider,
//                   boxShadow: isSelected
//                     ? `0 4px 12px ${alpha(customPrimaryColor, 0.2)}`
//                     : "0 1px 3px rgba(0,0,0,0.05)",
//                   "&:hover": {
//                     transform: "translateY(-4px)",
//                     boxShadow: `0 6px 16px ${alpha(customPrimaryColor, 0.25)}`,
//                     borderColor: customPrimaryColor,
//                   },
//                 }}
//               >
//                 <CardActionArea
//                   onClick={() => setSelectedOption(option.label)}
//                   sx={{
//                     height: "100%",
//                     p: 2,
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'center',
//                   }}
//                 >
//                   <Box color={isSelected ? customPrimaryColor : 'text.secondary'} mb={1.5}>
//                     {option.icon}
//                   </Box>
//                   <Typography
//                     variant="subtitle1"
//                     fontWeight="600"
//                     color={isSelected ? customPrimaryColor : 'text.primary'}
//                   >
//                     {option.label}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     {option.sublabel}
//                   </Typography>
//                 </CardActionArea>
//               </Card>
//             </Grid>
//           );
//         })}
//       </Grid>
 
//       {/* Bottom Section: Render Selected Component with Fade Transition */}
//       <Box
//         sx={{
//           p: { xs: 2, sm: 3 },
//           backgroundColor: "background.paper",
//           borderRadius: 3,
//           boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
//         }}
//       >
//         <Fade in timeout={400} key={selectedOption}>
//           <div>{renderComponent()}</div>
//         </Fade>
//       </Box>
//     </Box>
//   );
// };
 
// export default AssetsAdmin;
 


import React, { useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  Typography,
  Grid,
  Fade,
  useTheme,
  alpha,
} from "@mui/material";

// Import Components
import Assets from "./Assets"; 
import NewPurchaseAssets from "./NewPurchaseAssets"; 
import AssestsInventory from "./AssestsInventory"; 

// Icons matching your screenshot
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined'; // Asset
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined'; // Allocation
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined'; // New Asset
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'; // Inventory

const THEME_PURPLE = "#8C257C";

// EXACTLY 4 OPTIONS AS PER SCREENSHOT
const options = [
  {
    label: "Asset",
    icon: <BusinessCenterOutlinedIcon sx={{ fontSize: 30 }} />,
  },
  {
    label: "Asset allocation",
    icon: <AssignmentIndOutlinedIcon sx={{ fontSize: 30 }} />,
  },
  {
    label: "New Asset",
    icon: <AddShoppingCartOutlinedIcon sx={{ fontSize: 30 }} />,
  },
  {
    label: "Asset Inventory",
    icon: <Inventory2OutlinedIcon sx={{ fontSize: 30 }} />,
  },
];

const AssetsAdmin = () => {
  const [selectedOption, setSelectedOption] = useState("Asset");
  const theme = useTheme();

  const renderComponent = () => {
    switch (selectedOption) {
      case "Asset":
        // View 1: Master List
        return <Assets mode="master" />;
      case "Asset allocation":
        // View 2: Allocation Form & List
        return <Assets mode="allocation" />;
      case "New Asset":
        // View 3: Add Asset / Requisition
        return <NewPurchaseAssets />;
      case "Asset Inventory":
        // View 4: Inventory Table
        return <AssestsInventory />;
      default:
        return <Assets mode="master" />;
    }
  };

  return (
    <Box p={{ xs: 2, sm: 3 }}>
      {/* 
        Grid Container: 
        Matches the screenshot layout.
        On Desktop (md): 4 cards in one row (3 columns each = 12).
        On Mobile (xs): 2 cards per row (6 columns each).
      */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {options.map((option) => {
          const isSelected = selectedOption === option.label;
          return (
            <Grid item xs={6} sm={6} md={3} key={option.label}>
              <Card
                variant="outlined"
                sx={{
                  height: "100%", // Uniform height
                  transition: "all 0.2s ease-in-out",
                  backgroundColor: isSelected ? alpha(THEME_PURPLE, 0.04) : "#fff",
                  borderColor: isSelected ? THEME_PURPLE : theme.palette.divider,
                  borderWidth: "1px",
                  "&:hover": {
                    borderColor: THEME_PURPLE,
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                  },
                }}
              >
                <CardActionArea
                  onClick={() => setSelectedOption(option.label)}
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      color: isSelected ? THEME_PURPLE : theme.palette.text.secondary,
                      mb: 1.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {option.icon}
                  </Box>
                  <Typography
                    variant="subtitle1"
                    fontWeight={isSelected ? "bold" : "500"}
                    color={isSelected ? THEME_PURPLE : "text.primary"}
                    align="center"
                    sx={{ lineHeight: 1.2 }}
                  >
                    {option.label}
                  </Typography>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Render the selected component below the cards */}
      <Box 
        sx={{
          backgroundColor: "#fff",
          borderRadius: 2,
          // Optional: Add a subtle shadow to the content area
          // boxShadow: "0 2px 10px rgba(0,0,0,0.03)" 
        }}
      >
        <Fade in timeout={300} key={selectedOption}>
          <div>{renderComponent()}</div>
        </Fade>
      </Box>
    </Box>
  );
};

export default AssetsAdmin;