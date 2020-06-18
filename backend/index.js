const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser());

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

app.post("/api/bears", function (req, res) {
  const newBear = req.body;
  fakeBearsDatabase.push(newBear);
  res.send(newBear.id.toString());
});

app.listen(3001);
