"use client";
import React from "react";
import {signIn} from "next-auth/react";
import {Button}from "@mui/material";
const SigninButton = () => {
  return (
    <Button variant="contained" onClick={() => signIn()}>
      Sign In
    </Button>
  );
};

export default SigninButton;
