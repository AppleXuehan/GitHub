"use client";
import { SessionProvider} from "next-auth/react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AppProviders = (props: Props) => {
  return (
    <SessionProvider>
      {props.children}
    </SessionProvider>
  );
};

export default AppProviders;
