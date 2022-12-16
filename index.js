const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { application, query } = require("express");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_password}@cluster0.bf6hucd.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});



async function run() {
  try {
 

    const usersCollectionDB = client
      .db("tecotask")
      .collection("userdb");


    app.post("/users", async (req, res) => {
      const addUser = req.body;
      const result = await usersCollectionDB.insertOne(addUser);
      res.send(result);
    });

    app.get("/users", async (req, res) => {
      const query = {};
      const cursor = usersCollectionDB.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });

  
  } finally {
  }
}
run().catch((err) => {
  console.log(err);
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`Listenting to port, ${port}`);
});
