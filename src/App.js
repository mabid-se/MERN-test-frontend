import React, { useEffect, useState } from "react";
// import AddPersonDetails from "./components/AddPersonDetails";
// import PersonsList from "./components/PersonsList";
import axios from "axios";
import RoutesProvider from "./routes/RoutesProvider";

const App = () => {
  // const BASE_URL = "http://localhost:8080";

  const [persons, setPersons] = useState([]);

  const [createPerson, setCreatePerson] = useState({
    name: "",
    sectors: "",
    terms: false,
  });

  const [updatePersonForm, setUpdatePersonForm] = useState({
    id: null,
    name: "",
    sectors: "",
    terms: false,
  });

  const updateCreatePersonField = (e) => {
    const { name, value, type, checked } = e.target;

    // If the input is a checkbox, update the 'terms' field with the checked status
    const newValue = type === "checkbox" ? checked : value;

    setCreatePerson({ ...createPerson, [name]: newValue });
  };

  // const fetchPersons = async () => {
  //   try {
  //     // fetch the notes
  //     const res = await axios.get(`${BASE_URL}/persons`);
  //     //  set the state
  //     setPersons(res.data.persons);
  //   } catch (error) {
  //     console.error("Error fetching persons:", error);
  //   }
  // };

  // const addPerson = async (e) => {
  //   e.preventDefault();

  //   // Check if all required fields are filled
  //   if (!createPerson.name || !createPerson.sectors || !createPerson.terms) {
  //     console.log("Please fill in all required fields.");
  //     return;
  //   }

  //   try {
  //     const res = await axios.post(
  //       "http://localhost:8080/persons",
  //       createPerson
  //     );
  //     console.log("Person added:", res.data);
  //     // Clear the form after successful submission
  //     setPersons([...persons, res.data.person]);
  //     setCreatePerson({ name: "", sectors: "", terms: false });
  //   } catch (error) {
  //     console.error("Error adding person:", error);
  //   }
  // };

  const deletePerson = async (_id) => {
    // delete the person
    const res = await axios.delete(`http://localhost:8080/persons/${_id}`);

    //  update the state
    const newPersons = [...persons].filter((person) => {
      return person._id !== _id;
    });
    setPersons(newPersons);
    // setPersons(persons.filter((person) => person._id !== _id));
  };

  const handleUpdateFields = (e) => {
    const { name, value, type, checked } = e.target;

    // If the input is a checkbox, update the 'terms' field with the checked status
    const newValue = type === "checkbox" ? checked : value;

    setUpdatePersonForm({ ...updatePersonForm, [name]: newValue });
  };

  const toggleUpdate = (person) => {
    setUpdatePersonForm({
      name: person.name,
      sectors: person.sectors,
      terms: person.terms,
      _id: person._id,
    });
  };

  const updatePerson = async (e) => {
    e.preventDefault();
    const { name, sectors, terms } = updatePersonForm;

    // sending update request
    const res = await axios.put(
      `http://localhost:8080/persons/${updatePersonForm._id}`,
      { name, sectors, terms }
    );

    // update state
    const newPersons = [...persons];
    const personIndex = persons.findIndex(
      (person) => person._id === updatePersonForm._id
    );

    newPersons[personIndex] = res.data.person;
    setPersons(newPersons);

    // clear update form state
    setUpdatePersonForm({ _id: null, name: "", sectors: [], terms: false });
  };

  // useEffect(() => {
  //   fetchPersons();
  // }, []);

  return (
    <>
      <RoutesProvider />
      <div>
        {/* <div>
          <h2>create person</h2>
          <form onSubmit={addPerson}>
            <input
              type="text"
              name="name"
              placeholder="enter name"
              value={createPerson.name}
              onChange={updateCreatePersonField}
            />
            <br />
            <input
              type="text"
              name="sectors"
              placeholder="enter sectors"
              value={createPerson.sectors}
              onChange={updateCreatePersonField}
            />
            <br />
            <input
              type="checkbox"
              name="terms"
              value={createPerson.terms}
              onChange={updateCreatePersonField}
            />
            <label>Terms</label>
            <br />
            <button type="submit">add person</button>
          </form>
        </div> */}

        {/* {persons && (
          <ol>
            {persons.map((person) => (
              <li key={persons._id} style={{ padding: "6px" }}>
                <span>Id: {person._id}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>Name: {person.name}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>Sectors: {person.sectors.join(", ")}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span>Terms: {person.terms}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={() => deletePerson(person._id)}>
                  delete entry
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button onClick={() => toggleUpdate(person)}>
                  update entry
                </button>
              </li>
            ))}
          </ol>
        )} */}

        {updatePersonForm._id && (
          <div>
            <h2>update person</h2>

            <form onSubmit={updatePerson}>
              <input
                type="text"
                name="name"
                placeholder="enter name"
                value={updatePersonForm.name}
                onChange={handleUpdateFields}
              />
              <br />
              <input
                type="text"
                name="sectors"
                placeholder="enter sectors"
                value={updatePersonForm.sectors}
                onChange={handleUpdateFields}
              />
              <br />
              <input
                type="checkbox"
                name="terms"
                value={updatePersonForm.terms}
                onChange={handleUpdateFields}
              />
              <label>Terms</label>
              <br />
              <button type="submit">add person</button>
            </form>
          </div>
        )}

        {/* <AddPersonDetails addPerson={addPerson} /> */}
        {/* <PersonsList persons={persons} deletePerson={deletePerson} /> */}
      </div>
    </>
  );
};

export default App;
