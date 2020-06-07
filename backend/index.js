const express = require("express");
const app = express();

const fakeBearsDatabase = [
  { id: 1, name: "Cyrill", type: "Smoking" },
  { id: 2, name: "Tad", type: "Doodle" },
  { id: 3, name: "Jude", type: "SuperCodingBear" },
  { id: 4, name: "Tim", type: "Abusive" },
];

//localhost:3000/api/bears
app.get("/api/bears", function (req, res) {
  res.json(fakeBearsDatabase);
});

//localhost:3000/api/bears/4
app.get("/api/bears/:id", function (req, res) {
  const bearId = parseInt(req.params.id);
  const bear = fakeBearsDatabase.filter((bear) => bear.id === bearId)[0];
  res.json(bear);
});

app.listen(3000);
