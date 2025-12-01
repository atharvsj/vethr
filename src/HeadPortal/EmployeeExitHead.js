

import React, { useState } from 'react'; // Corrected React import
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Card,
  CardActionArea,
} from '@mui/material';

// --- ICONS ---
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import DescriptionIcon from '@mui/icons-material/Description';

// --- YOUR COMPONENTS ---
// Make sure these paths are correct in your project structure
import ExitQuestionHead from './ExitQuestionHead';
import ReturnAssetHead from './ReturnAssetHead';
import ClearenceFormHead from './ClearenceFormHead';


// --- Theme Colors ---
const primaryPurple = '#8e24aa'; // A strong purple for primary actions/borders
const lightPurple = '#f3e5f5';   // A light background for active/hover states
const subtleGray = '#e0e0e0';    // A subtle gray for inactive borders

// ===================================================================
//                PANEL COMPONENTS (RIGHT-SIDE CONTENT)
// ===================================================================

// Left menu card data with added descriptions
const cardPanels = [
  { title: 'Exit Interview', description: 'Provide feedback on your experience', icon: <QuestionAnswerIcon fontSize="large" sx={{ color: primaryPurple }} />, component: <ExitQuestionHead /> },
  { title: 'Return Asset', description: 'Confirm your returned assets', icon: <AssignmentReturnIcon fontSize="large" sx={{ color: primaryPurple }} />, component: <ReturnAssetHead /> },
  { title: 'Clearance Form', description: 'Download your clearance document', icon: <DescriptionIcon fontSize="large" sx={{ color: primaryPurple }} />, component: <ClearenceFormHead /> },
];

// ===================================================================
//                        MAIN COMPONENT
// ===================================================================

const EmployeeExitHead = () => {
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);

  // HANDLER TO CHANGE CARD AND SCROLL TO TOP
  const handleCardSelect = (index) => {
    if (selectedCardIndex !== index) {
      setSelectedCardIndex(index);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Box sx={{ width: '100%', p: 2, backgroundColor: '#fafafa', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        {/* ✅ RESPONSIVE SPACING: Less space on mobile, more on desktop */}
        <Grid container spacing={{ xs: 3, md: 6 }}>
          {/* Left Side: Title and Vertical Navigation Cards */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              // ✅ RESPONSIVE POSITIONING: Only sticky on medium screens and up
              position: { md: 'sticky' },
              top: '16px',
              alignSelf: 'flex-start',
            }}
          >
            <Typography variant="h4" component="h1" color= "#8C257C" sx={{ fontWeight: 'bold', mb: 8 }}>
                Employee Exit Process
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {cardPanels.map((card, index) => (
                <Card
                  key={index}
                  elevation={0}
                  sx={{
                    border: '1px solid',
                    borderColor: selectedCardIndex === index ? primaryPurple : subtleGray,
                    borderRadius: 3,
                    backgroundColor: selectedCardIndex === index ? lightPurple : 'transparent',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    },
                  }}
                >
                  <CardActionArea
                    onClick={() => handleCardSelect(index)}
                    // ✅ RESPONSIVE PADDING: Less padding on mobile for a more compact card
                    sx={{ p: { xs: 2, md: 2.5 } }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ mr: 2 }}>{card.icon}</Box>
                      <Box>
                        <Typography variant="h6" component="div">{card.title}</Typography>
                        <Typography variant="body2" color="text.secondary">{card.description}</Typography>
                      </Box>
                    </Box>
                  </CardActionArea>
                </Card>
              ))}
            </Box>
          </Grid>

          {/* Right Side: Selected Card's Content */}
          <Grid item xs={12} md={8}>
            <Paper
              variant="outlined"
              sx={{
                p: 3,
                borderRadius: 3,
                height: '100%',
                borderColor: subtleGray,
              }}
            >
              {cardPanels[selectedCardIndex].component}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default EmployeeExitHead;