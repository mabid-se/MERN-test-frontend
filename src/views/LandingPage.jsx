import React, { useEffect, useState } from "react";
import Appbar from "../components/appbar/Appbar";
// import Appbar from "../components/Appbar";
import axios from "axios";
import PersonsList from "../components/PersonsList";
import MainNavbar from "../components/MainNavbar";
import MainFooter from "../components/MainFooter";

const LandingPage = () => {
  const [persons, setPersons] = useState([]);

  const getPersons = async () => {
    try {
      //fetch the errors
      const res = await axios.get(`http://localhost:8080/persons`);
      //set the state
      setPersons(res.data.persons);
    } catch (error) {
      console.error("Error fetching persons: ", error);
    }
  };
  useEffect(() => {
    getPersons();
  }, []);

  return (
    <div>
      <MainNavbar />
      <PersonsList />
      <MainFooter />
    </div>
  );
};

export default LandingPage;
