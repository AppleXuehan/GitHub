"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";

interface Props {
  children: ReactNode;
}

const SessionProviders = (props: Props) => {
  return (
  <SessionProvider>
    <Provider store={store}>
      {props.children}
      </Provider>
    </SessionProvider>
  )
};

export default SessionProviders;
