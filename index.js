const express = require("express");
const cors = require("cors");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;
const { MongoClient } = require("mongodb");
//
const app = express();
const port = process.env.PORT || 5000;
//

// middleware use
app.use(cors());
app.use(express.json());

//connect
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.o4xkh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();

    const database = await client.db("volunteer-network");
    const eventsCollection = database.collection("events");

    // get api
    app.get("/events", async (req, res) => {
      const query = eventsCollection.find({});
      const result = await query.toArray();
      res.json(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

//
app.get("/", (req, res) => {
  res.send("Welcome to volunteer network server");
});
app.listen(port, () => {
  console.log("Listening on port", port);
});
