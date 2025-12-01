// import React, { useState } from 'react';
// import AssetsEmp from './AssetsEmp';
// // import CategoryEmp from './CategoryEmp';  
// // import BrandEmp from './BrandEmp'; 
// import { Box, Card, CardActionArea, CardContent, Grid, Typography, Container } from '@mui/material';

// const AssestEmp = () => {
//   const [selectedOption, setSelectedOption] = useState('Assets');

//   const renderComponent = () => {
//     switch (selectedOption) {
//       case 'Assets':
//         return <AssetsEmp />;
//       // case 'Category':
//       //   return <CategoryEmp />;
//       // case 'Brands':
//       //   return <BrandEmp />;
//       default:
//         return null;
//     }
//   };

//   const options = [
//     { label: 'Assets', sublabel: 'Manage fixed assets' },
//     // { label: 'Category', sublabel: 'View current assets' },
//     // { label: 'Brands', sublabel: 'Track investments' },
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
//                 // backgroundColor: selectedOption === option.label ? '#ede9fe' : '#f9fafb',
//                 borderColor: selectedOption === option.label ? 'primary' : '#e0e0e0',
//                 cursor: 'pointer',
//                 '&:hover': {
                 
//                   borderColor: 'primary',
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
//                     color={selectedOption === option.label ? 'primary' : 'inherit'}
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

// export default AssestEmp;









import React, { useState } from 'react';
import AssetsEmp from './AssetsEmp';
// import CategoryEmp from './CategoryEmp';  
// import BrandEmp from './BrandEmp'; 
import { Box, Card, CardActionArea, CardContent, Grid, Typography, Container } from '@mui/material';

const AssestEmp = () => {
  const [selectedOption, setSelectedOption] = useState('Assets');

  const renderComponent = () => {
    switch (selectedOption) {
      case 'Assets':
        return <AssetsEmp />;
      // case 'Category':
      //   return <CategoryEmp />;
      // case 'Brands':
      //   return <BrandEmp />;
      default:
        return null;
    }
  };

  const options = [
    { label: 'Assets', sublabel: 'Manage fixed assets' },
    // { label: 'Category', sublabel: 'View current assets' },
    // { label: 'Brands', sublabel: 'Track investments' },
  ];

  return (
    <Box p={0}>
      {/* Top Section: Card Options */}
      <Grid container spacing={3} justifyContent="center">
        {options.map((option) => (
          <Grid item xs={12} sm={4} md={3} key={option.label}>
            {/* <Card
              variant="outlined"
              sx={{
                textAlign: 'center',
                // backgroundColor: selectedOption === option.label ? '#ede9fe' : '#f9fafb',
                borderColor: selectedOption === option.label ? 'primary' : '#e0e0e0',
                cursor: 'pointer',
                '&:hover': {
                 
                  borderColor: 'primary',
                  transform: 'scale(1.05)',
                  transition: '0.2s ease-in-out',
                },
                borderRadius: 2,
                minHeight: 50,
                width: '100%',
                maxWidth: 180,
                mx: 'auto',
              }}
            >
              <CardActionArea onClick={() => setSelectedOption(option.label)}>
                <CardContent sx={{ p: 1 }}>
                  <Typography 
                    variant="h5" 
                    fontWeight="bold" 
                    color= "#8C257C"
                  >
                    {option.label}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" noWrap>
                    {option.sublabel}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card> */}
          </Grid>
        ))}
      </Grid>

      {/* Bottom Section: Render Selected Component */}
        {renderComponent()}
    </Box>
  );
};


export default AssestEmp;
