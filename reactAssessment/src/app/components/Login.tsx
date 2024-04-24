import React from "react";
import SigninButton from "./SigninButton";
import { Box, Typography } from "@mui/material";

const Login = () => {
  return (
    <Box display="flex" minHeight="100vh" px={2} py={2} flex={1} alignItems="center" justifyContent="center" flexDirection="column">
      <img src="/Logo/Zurich_Insurance_Group_Logo_Horizontal.svg" 
        alt="Logo" 
        style={{width:'30%'}}
        />

      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to My App
      </Typography>

      <SigninButton />
    </Box>
      
  );
};

export default Login;
