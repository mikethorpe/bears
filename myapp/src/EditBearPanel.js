import React, { useState, useEffect } from "react";

export const EditBearPanel = function ({
  bear,
  handleCloseClick,
  handleUpdateClick,
}) {
  const [editedName, setEditedName] = useState(bear.name);
  const [editedType, setEditedType] = useState(bear.type);

  useEffect(() => {
    setEditedName(bear.name);
    setEditedType(bear.type);
  }, [bear]);

  const updateName = function (event) {
    setEditedName(event.target.value);
  };

  const updateType = function (event) {
    setEditedType(event.target.value);
  };

  return (
    <div>
      <p>Edit bear Panel</p>
      <input
        placeholder="Name"
        value={editedName}
        onChange={updateName}
      ></input>
      <input
        placeholder="Type"
        value={editedType}
        onChange={updateType}
      ></input>
      <button
        onClick={() =>
          handleUpdateClick({ id: bear.id, name: editedName, type: editedType })
        }
      >
        Update
      </button>
      <button onClick={handleCloseClick}>Cancel</button>
    </div>
  );
};
