"use client";
import React from "react";
import {signOut, useSession} from "next-auth/react";
import {Box, Button, Typography}from "@mui/material";

const Header = () => {

  const { data: session } = useSession();
  return  (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center" // Align items to center vertically
      bgcolor="#e3f2fd"
      p={1} // Add padding
      boxShadow={1} // Add a slight shadow
      position="fixed" // Fix the position to the top
      top={0} // Align to the top
      left={0} // Align to the left
      right={0} // Align to the right
      zIndex={1000} // Set a higher z-index to ensure it's on top of other elements
    >
      <Box display="flex" alignItems="center"><Typography gutterBottom>Hello, {session?.user?.name}</Typography></Box>
      <Box>
        <Button onClick={() => signOut()}>
            Sign Out
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
