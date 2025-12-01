

import React, { useState } from 'react';
import AssetsHead from './AssetsHead';
import CategoryHead from './CategoryHead';
import BrandHead from './BrandHead';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  Container,
} from '@mui/material';

const AssestHead = () => {
  const [selectedOption, setSelectedOption] = useState('Assets');

  const renderComponent = () => {
    switch (selectedOption) {
      case 'Assets':
        return <AssetsHead />;
      case 'Category':
        return <CategoryHead />;
      case 'Brands':
        return <BrandHead />;
      default:
        return null;
    }
  };

  const options = [
    { label: 'Assets', sublabel: 'Manage fixed assets' },
    { label: 'Category', sublabel: 'View current assets' },
    { label: 'Brands', sublabel: 'Track investments' },
  ];

  return (
    <Box p={0}>
      {/* Top Section: Card Options */}
      <Grid container spacing={3} justifyContent="center">
        {options.map((option) => {
          const isSelected = selectedOption === option.label;
          return (
            <Grid item xs={12} sm={4} md={3} key={option.label}>
              <Card
                variant="outlined"
                sx={{
                  textAlign: 'center',
                  backgroundColor: isSelected ? '#8C257C' : '#f9fafb',
                  borderColor: isSelected ? '#F58E35' : '#e0e0e0',
                  cursor: 'pointer',
                  color: isSelected ? 'white' : 'inherit',
                  boxShadow: isSelected
                    ? '0 4px 12px rgba(140, 37, 124, 0.3)'
                    : '0 2px 6px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    backgroundColor: isSelected ? '#8C257C' : '#F58E35',
                    borderColor: '#8C257C',
                    color: 'white',
                    transform: 'scale(1.05)',
                    transition: '0.25s ease-in-out',
                    boxShadow: '0 4px 14px rgba(245, 142, 53, 0.4)',
                  },
                  borderRadius: 3,
                  minHeight: 80,
                  width: '100%',
                  maxWidth: 200,
                  mx: 'auto',
                }}
              >
                <CardActionArea onClick={() => setSelectedOption(option.label)}>
                  <CardContent sx={{ p: 1.5 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      sx={{
                        color: isSelected ? '#fff' : '#8C257C',
                        textTransform: 'uppercase',
                      }}
                    >
                      {option.label}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: isSelected ? '#fff' : '#555',
                        fontStyle: 'italic',
                      }}
                      noWrap
                    >
                      {option.sublabel}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Bottom Section: Render Selected Component */}
      <Container
        sx={{
          mt: 4,
          p: 3,
          backgroundColor: '#f5f5f5',
          borderRadius: 3,
          border: '2px solid #F58E35',
          boxShadow: '0 4px 10px rgba(140, 37, 124, 0.15)',
        }}
      >
        {renderComponent()}
      </Container>
    </Box>
  );
};

export default AssestHead;
