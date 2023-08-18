import React, { useState } from "react";

const AddPersonDetails = ({ addPerson }) => {
  const [name, setName] = useState("");
  const [sectors, setSectors] = useState([]);
  const [terms, setTerms] = useState(false);

  const handleSubmit = (e) => {
    // e.prventDefault();
    addPerson({ name, sectors, terms });
    setName("");
    setSectors([]);
    setTerms("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="sectors"
          value={sectors.join(", ")}
          onChange={(e) => setSectors(e.target.value.split(", "))}
        />
        <input
          type="text"
          placeholder="terms"
          value={terms}
          onChange={(e) => setTerms(e.target.value)}
        />
        <button type="submit">add person</button>
      </form>
    </>
  );
};

export default AddPersonDetails;
