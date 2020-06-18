import React, { useState, useEffect } from "react";
import { BearItem } from "./BearItem";
import axios from "axios";

let lastId = 0;

const getId = function () {
  lastId--;
  return lastId;
};

export const BearItemsWidget = function () {
  const [bears, setBears] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  async function fetchData() {
    const response = await axios.get("http://localhost:3001/api/bears");
    setBears(response.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const deleteBear = function (id) {
    const remainingBears = bears.filter((bear) => bear.id !== id);
    setBears(remainingBears);
  };

  const updateName = function (event) {
    setName(event.target.value);
  };

  const updateType = function (event) {
    setType(event.target.value);
  };

  const createBearItems = function () {
    return bears.map((bear) => (
      <BearItem key={bear.id} bear={bear} handleDeleteClicked={deleteBear} />
    ));
  };

  const handleAddBearClicked = async function () {
    const newBear = {
      id: getId(),
      name: name,
      type: type,
    };
    await axios.post("http://localhost:3001/api/bears", newBear);
    await fetchData();
    setName("");
    setType("");
  };

  return (
    <div>
      <input
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
    </div>
  );
};
