import React, { useRef, useState } from "react";
import Appbar from "../components/appbar/Appbar";
// import Appbar from "../components/Appbar";

import { useLocation } from "react-router-dom";
import axios from "axios";
import MainNavbar from "../components/MainNavbar";
import MainFooter from "../components/MainFooter";
import UpdatePersonForm from "../components/UpdatePersonForm";

const UpdatePerson = () => {
  const location = useLocation();

  const personData = location.state.person;

  const [updatePerFrom, setUpdatePerForm] = useState({
    id: location.state.person._id,
    name: location.state.person.name,
    sectors: location.state.person.sectors,
    terms: location.state.person.terms,
  });

  const handleUpdateFormFields = (e) => {
    const { name, value, type, checked } = e.target;

    // If the input is a checkbox, update the 'terms' field with the checked status
    const newValue = type === "checkbox" ? checked : value;

    setUpdatePerForm({ ...updatePerFrom, [name]: newValue });
  };

  const updatePersonRequest = async (e) => {
    e.preventDefault();
    const { name, sectors, terms } = updatePerFrom;

    //  sending update request
    const res = await axios.put(
      `http://localhost:8080/persons/${updatePerFrom._id}`,
      { name, sectors, terms }
    );

    //  update state
    // const newPersons = [...persons];
    // const personIndex = persons.findIndex(
    //   (person) => person._id === updatePersonForm._id
    // );

    // newPersons[personIndex] = res.data.person;
    // setPersons(newPersons);

    // clear update from state
    setUpdatePerForm({ _id: null, name: "", sectors: [], terms: false });
  };
  useRef(() => {
    console.log("update per form hase: ", updatePerFrom);
  }, [updatePerFrom]);
  return (
    <div>
      <MainNavbar />
      <UpdatePersonForm data={personData} />
      <h2>update {location.state.person.name}'s profile</h2>
      <form onSubmit={updatePersonRequest}>
        <input
          type="text"
          name="name"
          placeholder="enter name"
          value={updatePerFrom.name}
          onChange={handleUpdateFormFields}
        />
        <br />
        <input
          type="text"
          name="sectors"
          placeholder="enter sectors"
          value={updatePerFrom.sectors}
          onChange={handleUpdateFormFields}
        />
        <br />
        <input
          type="checkbox"
          checked={location.state.person.terms}
          name="terms"
          value={updatePerFrom.terms}
          onChange={handleUpdateFormFields}
        />
        <label>Terms</label>
        <br />
        <button type="submit">update person</button>
      </form>
      <h4>id: {location.state.person._id}</h4>
      <h4>name: {location.state.person.name}</h4>
      <h4>sectors: {location.state.person.sectors}</h4>
      <h4>terms: {location.state.person.terms ? <>Agree</> : <>Disagree</>}</h4>
      <MainFooter />
    </div>
  );
};

export default UpdatePerson;
