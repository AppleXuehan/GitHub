"use client";
import { Provider } from "react-redux";
import Route from "./components/Route";
import { store } from "./api/store/store";

export default function Home() {
  return (
    <Provider store={store}>
      <Route /> 
    </Provider>   
  );
}
