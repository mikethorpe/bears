import React, { useState } from "react";
import { BearItem } from "./BearItem";

let lastId = 0;

const getId = function () {
  lastId--;
  return lastId;
};

export const BearItemsWidget = function ({ data }) {
  const [bears, setBears] = useState(data);
  const [name, setName] = useState("");
  const [type, setType] = useState("");

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

  const handleAddBearClicked = function () {
    const newBear = {
      id: getId(),
      name: name,
      type: type,
    };
    setBears([...bears, newBear]);
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
