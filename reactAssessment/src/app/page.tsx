"use client"
import { StrictMode } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import UserList from "./components/UserList";
import { useSession } from "next-auth/react";
import Login from "./components/Login";

export default function Home() {
  const { data: session} = useSession();
  
  return (
    <StrictMode>
      {
        (!session) ? (<Login />):
        (
          <>
            <Header />
            <UserList />
            <Footer />
          </>
        )
      }
    </StrictMode>
  );
}
