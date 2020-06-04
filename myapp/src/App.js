import React from "react";
import { BearItemsWidget } from "./BearItemsWidget";

function App() {
  const bearsDb = [];

  return (
    <div className="App">
      <BearItemsWidget data={bearsDb} />
    </div>
  );
}

export default App;
