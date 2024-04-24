import React from "react";
import { Box, Typography } from "@mui/material";

const ProtectedScreen = () => {
  return (
    <Box display="flex" minHeight="100vh" px={2} py={2} flex={1} alignItems="center" justifyContent="center" flexDirection="column">
      
      <Typography variant="h4" component="h1" gutterBottom>
        Sorry, you are unauthorized. 
      </Typography>
      
    </Box>
      
  );
};

export default ProtectedScreen;
