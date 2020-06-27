const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { Client } = require("pg");

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

const dbConnectionProperties = {
  user: "postgres",
  host: "localhost",
  database: "bearsdb",
  password: "m3g@l3gs",
  port: 5432,
};

// CRUD - Create, Read, Update and Delete

//http://localhost:3001/api/bears - POST (CREATE)
app.post("/api/bears", async function (req, res) {
  const newBear = req.body;
  const client = new Client(dbConnectionProperties);
  await client.connect();
  const queryString =
    "INSERT INTO bears (name, type) VALUES ($1, $2) RETURNING id";
  const values = [newBear.name, newBear.type];
  const response = await client.query(queryString, values);
  await client.end();
  res.send(response.rows[0].id.toString());
});

//http://localhost:3001/api/bears - GET (READ)
app.get("/api/bears", async function (req, res) {
  const client = new Client(dbConnectionProperties);
  await client.connect();
  const queryString = "SELECT * FROM bears";
  const { rows: bears } = await client.query(queryString);
  await client.end();
  res.json(bears);
});

//http://localhost:3001/api/bears/1 - PUT (UPDATE)
app.put("/api/bears/:id", async function (req, res) {
  const id = req.params.id;
  const updatedBear = req.body;
  const client = new Client(dbConnectionProperties);
  await client.connect();
  const queryString = "UPDATE bears SET name = $1, type = $2 WHERE id = $3";
  const values = [updatedBear.name, updatedBear.type, id];
  await client.query(queryString, values);
  await client.end();
  res.send();
});

//http://localhost:3001/api/bears/1 - DELETE (DELETE)
app.delete("/api/bears/:id", async function (req, res) {
  const id = req.params.id;
  const client = new Client(dbConnectionProperties);
  await client.connect();
  const queryString = "DELETE FROM bears WHERE id = $1";
  const values = [id];
  await client.query(queryString, values);
  res.send();
});

// TODO: Jude's challenge to fetch a single bear from the db
//localhost:3000/api/bears/4
// app.get("/api/bears/:id", function (req, res) {
//   const bearId = parseInt(req.params.id);
//   const bear = fakeBearsDatabase.filter((bear) => bear.id === bearId)[0];
//   res.json(bear);
// });

app.listen(3001);
