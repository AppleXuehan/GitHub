import { RootState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { LoginUserData } from "../../interface/Interface";
import { authEmails } from "../../db/authEmail";

export interface Session {
  loginUser?: LoginUserData;
  isAuthorized: boolean;
}

interface SessionState {
  items?: Session;
}
const initialState: SessionState = {};

export const SessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    addSession: (state, action: PayloadAction<Session["loginUser"]>) => {
      let tmpSession: Session = {loginUser: action.payload, isAuthorized: false};

      if (
        tmpSession?.loginUser?.user?.email && 
        typeof tmpSession.loginUser.user.email === 'string' && 
        authEmails.includes(tmpSession.loginUser.user.email)
      ) 
      {
        tmpSession.isAuthorized = true;
      }
      state.items = tmpSession;
    },
    removeSession: (state) => {
      state.items = undefined;
    },
  },
});

export default SessionSlice.reducer;
export const { addSession, removeSession } = SessionSlice.actions;
