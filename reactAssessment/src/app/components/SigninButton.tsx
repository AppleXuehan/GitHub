"use client";
import React from "react";
import {signIn} from "next-auth/react";
import {Button}from "@mui/material";
const SigninButton = () => {

  const proceedSigin = () => {
    signIn();
  }

  return (
    <Button variant="contained" onClick={proceedSigin}>
      Sign In
    </Button>
  );
};

export default SigninButton;
