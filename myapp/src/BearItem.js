import React from "react";

export const BearItem = function ({ bear, handleDeleteClicked }) {
  return (
    <li>
      {`Name: ${bear.name}, Type: ${bear.type}`}{" "}
      <button onClick={() => handleDeleteClicked(bear.id)}>Delete</button>
    </li>
  );
};
