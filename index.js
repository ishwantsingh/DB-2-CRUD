const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const server = express();

const db = knex({
  client: "sqlite",
  useNullAsDefault: true,
  connection: {
    filename: "./data/lambda.sqlite3"
  }
});

server.use(express.json());
server.use(helmet());

// endpoints here

server.get("/api/zoos", async (req, res) => {
  try {
    const allZoos = await db("zoos");
    res.json(allZoos);
  } catch (error) {
    res.status(500).json({ error });
  }
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
