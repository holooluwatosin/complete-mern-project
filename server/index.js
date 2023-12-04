const express = require('express')
const app = express()
const cors = require("cors")
const port = process.env.PORT || 6001
require('dotenv').config()
// console.log(process.env)

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@complete-mern-project-c.zvaowri.mongodb.net/?retryWrites=true&w=majority`;

// middleware
app.use(cors());
app.use(express.json());

//mongod; complete-mern-project-db config

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // database & collections
    const menuCollections = client.db("complete-mern-project-db").collection("menus");
    const cartCollections = client.db("complete-mern-project-db").collection("cartItems");

    // all menu items operations
    app.get('/menu', async (req, res) => {
      const result = await menuCollections.find().toArray();
      res.send(result)
    });

    // all carts operations

    // posting carts to db
    app.post('/cart', async (req, res) => {
      const cartItem = req.body;
      const result = await cartCollections.insertOne(cartItem);
      res.send(result)
    })

    // get carts using email
    app.get('/cart', async (req, res) => {
      const emailAddress = req.query.email
      const cartItemList = { email: emailAddress }
      const result = await cartCollections.find(cartItemList).toArray()
      res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})