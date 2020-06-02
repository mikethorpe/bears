import React from "react";
import { BearItem } from "./BearItem";

function App() {
  const bears = [
    {
      id: 1,
      name: "Paddington",
      type: "Deadbeat",
    },
    {
      id: 2,
      name: "Pooh",
      type: "Honey",
    },
    {
      id: 3,
      name: "James",
      type: "Polar",
    },
    {
      id: 4,
      name: "Jimbob",
      type: "Dirty",
    },
  ];

  const createBearItems = function () {
    return bears.map((bear) => <BearItem name={bear.name} type={bear.type} />);
  };

  return (
    <div className="App">
      <ul>{createBearItems()}</ul>
    </div>
  );
}

export default App;
