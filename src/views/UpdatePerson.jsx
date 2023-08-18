import React from "react";
import { useLocation } from "react-router-dom";
import MainNavbar from "../components/MainNavbar";
import MainFooter from "../components/MainFooter";
import UpdatePersonForm from "../components/UpdatePersonForm";

const UpdatePerson = () => {
  const location = useLocation();

  const personData = location.state.person;

  return (
    <div>
      <MainNavbar />
      <UpdatePersonForm data={personData} />
      <MainFooter />
    </div>
  );
};

export default UpdatePerson;
