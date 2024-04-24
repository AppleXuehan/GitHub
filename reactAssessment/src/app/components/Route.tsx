import { Grid } from "@mui/material";
import { useSession } from "next-auth/react";
import Login from "./Login";
import UserList from "./UserList";
import Header from "./Header";
import Footer from "./Footer";
import ProtectedScreen from "./ProtectedScreen";
import { useAppDispatch, useAppSelector } from "../api/store/store";
import { useEffect } from "react";
import { addSession } from "../api/store/features/sessionSlice";

// Custom hook to manage session data
const useSessionManagement = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  useEffect(() => {
    if (session && session !== undefined) {
      dispatch(addSession(session));
    }
  }, [dispatch, session]);

  return session;
};

const Route = () => {
  const session = useSessionManagement();
  const stateSession = useAppSelector((state) => state.session);

  // Function to render content based on session authorization
  const renderContent = () => {
    if (!stateSession.items?.loginUser?.user) {
      return <Login />;
    } else {
      return (
        <>
          <Header />
          {stateSession.items.isAuthorized ? <UserList /> : <ProtectedScreen />}
          <Footer />
        </>
      );
    }
  };

  return (
    <>
      <Grid item md={12} pt={7} px={2}>
        {renderContent()}
      </Grid>
    </>
  );
};

export default Route;
