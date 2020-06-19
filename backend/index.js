const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { Client } = require('pg')

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

const dbConnectionProperties = {
  user: 'postgres',
  host: 'localhost',
  database: 'bearsdb',
  password: 'm3g@l3gs',
  port: 5432,
}

//localhost:3000/api/bears
app.get("/api/bears", async function (req, res) {
  const client = new Client(dbConnectionProperties);
  await client.connect();
  const { rows: bears } = await client.query("SELECT * FROM bears");
  await client.end();
  res.json(bears);
});

//localhost:3000/api/bears/4
// app.get("/api/bears/:id", function (req, res) {
//   const bearId = parseInt(req.params.id);
//   const bear = fakeBearsDatabase.filter((bear) => bear.id === bearId)[0];
//   res.json(bear);
// });

app.post("/api/bears", async function (req, res) {
  const newBear = req.body;
  const client = new Client(dbConnectionProperties);
  await client.connect();
  const queryString = "INSERT INTO bears (name, type) VALUES ($1, $2) RETURNING id";
  const values = [newBear.name, newBear.type];
  const response = await client.query(queryString, values);
  await client.end();
  res.send(response.rows[0].id.toString());
});

app.delete("/api/bears/:id", async function (req, res) {
  const id = req.params.id;
  const client = new Client(dbConnectionProperties);
  await client.connect();
  const queryString = "DELETE FROM bears WHERE id = $1";
  const values = [id];
  await client.query(queryString, values);
  res.send();
});

app.listen(3001);
