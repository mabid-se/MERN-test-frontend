import React from "react";
import PersonsList from "../components/PersonsList";
import MainNavbar from "../components/MainNavbar";
import MainFooter from "../components/MainFooter";

const LandingPage = () => {
  return (
    <div>
      <MainNavbar />
      <PersonsList />
      <MainFooter />
    </div>
  );
};

export default LandingPage;
