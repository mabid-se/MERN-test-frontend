import axios from "axios";
import React, { useState } from "react";

const PersonsList = ({ persons, deletePerson }) => {
  const [updatePersonForm, setUpdatePersonForm] = useState({
    id: null,
    name: "",
    sectors: "",
    terms: false,
  });

  const handleUpdatePersonFeilds = (e) => {
    const { name, value, type, checked } = e.target;

    // If the input is a checkbox, update the 'terms' field with the checked status
    const newValue = type === "chec kbox" ? checked : value;

    setUpdatePersonForm({ ...updatePersonForm, [name]: newValue });
  };

  const toggleUpdate = (person) => {
    // get the current note values
    // set state on update form
    setUpdatePersonForm({
      name: person.name,
      sectors: person.sectors,
      terms: person.terms,
    });
  };

  const updatePerson = async (e) => {
    e.prventDefault();

    const { name, sectors, terms } = updatePerson;

    // send the update request
    const res = await axios.put(
      `http://localhost:8080/persons/${updatePerson._id}`,
      { name, sectors, terms }
    );
    console.log(res);

    // update the state
  };

  return (
    <>
      <ul>
        {persons.map((person) => (
          <li key={persons._id} style={{ padding: "6px" }}>
            <span>Name: {person.name}</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>Sectors: {person.sectors.join(", ")}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span>Terms: {person.terms}</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={() => deletePerson(person._id)}>
              delete entry
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={() => toggleUpdate(person._id)}>
              update entry
            </button>
          </li>
        ))}
      </ul>

      <div>
        <h2>update person</h2>
        <form onSubmit={updatePerson}>
          <input
            type="text"
            name="name"
            placeholder="enter name"
            value={updatePerson.name}
            onChange={handleUpdatePersonFeilds}
          />
          <br />
          <input
            type="text"
            name="sectors"
            placeholder="enter sectors"
            value={updatePerson.sectors}
            onChange={handleUpdatePersonFeilds}
          />
          <br />
          <input
            type="checkbox"
            name="terms"
            value={updatePerson.terms}
            onChange={handleUpdatePersonFeilds}
          />
          <label>Terms</label>
          <br />
          <button type="submit">update person</button>
        </form>
      </div>
    </>
  );
};

export default PersonsList;
