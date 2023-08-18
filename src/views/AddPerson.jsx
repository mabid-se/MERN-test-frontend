import React, { useState } from "react";
import Appbar from "../components/appbar/Appbar";
// import Appbar from "../components/Appbar";
// import Appbar from "../components/Appbar";

import { Container, Typography } from "@mui/material";
// import axios from "axios";
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
