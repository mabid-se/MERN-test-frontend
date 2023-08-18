import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import LandingPage from "../views/LandingPage";
import AddPerson from "../views/AddPerson";
import UpdatePerson from "../views/UpdatePerson";

const RoutesProvider = () => {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            <Route path="/" exact element={<LandingPage />} />
            <Route path="/home" exact element={<Navigate to="/" replace />} />
            <Route path="/add" exact element={<AddPerson />} />
            <Route path="/update" exact element={<UpdatePerson />} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </>
  );
};

export default RoutesProvider;
