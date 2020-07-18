import React, { useState, useEffect } from "react";
import { BearItem } from "./BearItem";
import { EditBearPanel } from "./EditBearPanel";
import axios from "axios";

export const BearItemsWidget = function () {
  const [bears, setBears] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [bearToEdit, setBearToEdit] = useState(null);

  useEffect(() => {
    console.log(bearToEdit);
  }, [bearToEdit]);

  const bearsEndpoint = "http://localhost:3001/api/bears";

  async function fetchData() {
    const response = await axios.get(bearsEndpoint);
    setBears(response.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const deleteBear = async function (id) {
    await axios.delete(`${bearsEndpoint}/${id}`);
    await fetchData();
  };

  const updateBear = async function (bearToUpdate) {
    await axios.put(`${bearsEndpoint}/${bearToUpdate.id}`, bearToUpdate);
    await fetchData();
    clearBearToEdit();
  };

  const updateName = function (event) {
    setName(event.target.value);
  };

  const updateType = function (event) {
    setType(event.target.value);
  };

  const createBearItems = function () {
    return bears.map((bear) => (
      <BearItem
        key={bear.id}
        bear={bear}
        handleDeleteClicked={deleteBear}
        handleEditClicked={setBearToEdit}
      />
    ));
  };

  const handleAddBearClicked = async function () {
    const newBear = {
      name: name,
      type: type,
    };
    await axios.post(bearsEndpoint, newBear);
    await fetchData();
    setName("");
    setType("");
  };

  const clearBearToEdit = function () {
    setBearToEdit(null);
  };

  return (
    <div>
      <input
        id="name-input"
        type="text"
        placeholder="Name"
        value={name}
        onChange={updateName}
      ></input>
      <input
        type="text"
        placeholder="Type"
        value={type}
        onChange={updateType}
      ></input>
      <button onClick={handleAddBearClicked}>Add bear</button>
      <ul>{createBearItems()}</ul>
      {bearToEdit && (
        <EditBearPanel
          bear={bearToEdit}
          handleCloseClick={clearBearToEdit}
          handleUpdateClick={updateBear}
        />
      )}
    </div>
  );
};
