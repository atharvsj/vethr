// import React, { useState } from "react";
// import {
//   Box,
//   Card,
//   CardActionArea,
//   CardContent,
//   Typography,
//   Grid,
// } from "@mui/material";
// import ExitDashboardHr from "./ExitDashboardHr";
// import TerminationDashboardHr from "./TerminationDashboardHr";
// import AssetDashboardHr from "./AssetDashboardHr";
// import NewExit from "./NewExit";

// export default function CardSwitcher() {
//   const [selected, setSelected] = useState(0);

//   const cards = [
//     { id: 0, label: "Add Employee Exit", component: <NewExit />, color: "#49e41aff" },
//     { id: 1, label: "Exit Dashboard", component: <ExitDashboardHr />, color: "#8A4FFF" },
//     { id: 2, label: "Asset Dashboard", component: <AssetDashboardHr />, color: "#8A4FFF" },
//     { id: 3, label: "Termination", component: <TerminationDashboardHr />, color: "#f13f3c" },
//   ];

//   // find the selected card
//   const selectedCard = cards.find((c) => c.id === selected);

//   // helper to make faint color with alpha
//   const getFaintColor = (hex, alpha = "22") => `${hex}${alpha}`; // 22 = ~13% opacity

//   return (
//     <Box sx={{ p: 2, borderRadius: 2 }}>
//       {/* Horizontal Cards */}
//       <Grid container spacing={6} justifyContent="space-evenly" alignItems="stretch">
//         {cards.map((card) => {
//           const isSelected = selected === card.id;
//           return (
//             <Grid item key={card.id} xs={12} sm={6} md={3}>
//               <Card
//                 sx={{
//                   border: `2px solid ${card.color}`,
//                   borderRadius: 3,
//                   minWidth: 220,
//                   backgroundColor: isSelected ? card.color : "transparent",
//                   transition: "all 0.3s ease",
//                   "&:hover": {
//                     backgroundColor: isSelected
//                       ? card.color
//                       : getFaintColor(card.color, "33"), // faint on hover
//                     transform: "translateY(-5px)",
//                     boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
//                   },
//                 }}
//               >
//                 <CardActionArea onClick={() => setSelected(card.id)}>
//                   <CardContent sx={{ textAlign: "center" }}>
//                     <Typography
//                       variant="h6"
//                       noWrap
//                       sx={{
//                         fontWeight: "bold",
//                         color: isSelected ? "white" : "black",
//                       }}
//                     >
//                       {card.label}
//                     </Typography>
//                   </CardContent>
//                 </CardActionArea>
//               </Card>
//             </Grid>
//           );
//         })}
//       </Grid>

//       {/* Panel for displaying selected component */}
//       <Box
//         sx={{
//           mt: 4,
//           p: 2,
//           border: "1px solid #ddd",
//           borderRadius: 2,
//           minHeight: "200px",
//           backgroundColor: selectedCard ? getFaintColor(selectedCard.color, "22") : "white", // ✅ faint transparent background
//           color: "black", // text stays readable on faint background
//           transition: "background-color 0.3s ease",
//         }}
//       >
//         {selectedCard?.component}
//       </Box>
//     </Box>
//   );
// }









import React, { useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import ExitDashboardHr from "./ExitDashboardHr";
import TerminationDashboardHr from "./TerminationDashboardHr";
import AssetDashboardHr from "./AssetDashboardHr";
import NewExit from "./NewExit";

export default function CardSwitcher() {
  const [selected, setSelected] = useState(0);

  // --- THEME & STYLING ---
  const themePurple = '#8C257C';
  const themeOrange = '#F58E35';

  const cards = [
    { id: 0, label: " Employee Exit", component: <NewExit />, color: themePurple },
    { id: 1, label: "Exit Dashboard", component: <ExitDashboardHr />, color: themePurple },
    { id: 2, label: "Asset Return", component: <AssetDashboardHr />, color: themePurple },
    { id: 3, label: "Termination", component: <TerminationDashboardHr />, color: themeOrange }, // Orange for a distinct action
  ];

  // find the selected card
  const selectedCard = cards.find((c) => c.id === selected);

  // helper to make faint color with alpha
  const getFaintColor = (hex, alpha = "22") => `${hex}${alpha}`; // 22 = ~13% opacity

  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      {/* Horizontal Cards */}
      <Grid container spacing={2} justifyContent="center" alignItems="stretch">
        {cards.map((card) => {
          const isSelected = selected === card.id;
          return (
            <Grid item key={card.id} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  border: `2px solid ${card.color}`,
                  borderRadius: 3,
                  height: '100%', // Ensure cards are the same height
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: isSelected ? card.color : "transparent",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: isSelected
                      ? card.color
                      : getFaintColor(card.color, "33"), // faint on hover
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <CardActionArea 
                  onClick={() => setSelected(card.id)} 
                  sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h6"
                      noWrap
                      sx={{
                        fontWeight: "bold",
                        color: isSelected ? "white" : card.color, // Text color matches border color when not selected
                      }}
                    >
                      {card.label}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Panel for displaying selected component */}
      <Box
        sx={{
          mt: 4,
          minHeight: "200px",
          color: "black",
          transition: "background-color 0.3s ease",
          // The selected component itself is wrapped in a Paper with its own padding
        }}
      >
        {selectedCard?.component}
      </Box>
    </Box>
  );
}