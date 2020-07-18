import React from "react";

export const BearItem = function ({
  bear,
  handleDeleteClicked,
  handleEditClicked,
}) {
  return (
    <li className="bear-item">
      {`Name: ${bear.name}, Type: ${bear.type}`}{" "}
      <button onClick={() => handleDeleteClicked(bear.id)}>Delete</button>
      <button onClick={() => handleEditClicked(bear)}>Edit</button>
    </li>
  );
};
