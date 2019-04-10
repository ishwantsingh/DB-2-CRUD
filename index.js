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

// server.get("/api/zoos", async (req, res) => {
//   try {
//     const result = await db.raw("select * from zoos");
//     console.log(result);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// });

server.get("./api/zoos", (req, res) => {
  db.select()
    .from("zoos")
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});
server.get("/api/zoos/:id", async (req, res) => {
  try {
    const zooById = await db("zoos").where({ id: req.params.id });
    if (zooById.length) {
      res.json(zooById);
    } else {
      res.status(404).json({ error });
    }
  } catch (error) {
    res.status(500).json({ error: `this is error` });
  }
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
