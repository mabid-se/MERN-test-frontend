import React from "react";
import { Container } from "@mui/material";
import AddPersonForm from "../components/AddPersonForm";
import MainNavbar from "../components/MainNavbar";
import MainFooter from "../components/MainFooter";

const AddPerson = () => {
  return (
    <div>
      <MainNavbar />
      <Container>
        <AddPersonForm />
      </Container>
      <MainFooter />
    </div>
  );
};

export default AddPerson;
