"use client";
import React from "react";
import {Box,Typography}from "@mui/material";

const Footer = () => {

  return  (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#e3f2fd"
      p={1}
      boxShadow={1}
      width="100%"
      ml={-1}
    >
      <Box display="flex" alignItems="center">
        <Typography gutterBottom>
            Footer
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
