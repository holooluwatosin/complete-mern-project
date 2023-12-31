const express = require('express')
const app = express()
const cors = require("cors")
const port = process.env.PORT || 6001
require('dotenv').config()
// console.log(process.env)

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

    // get a specific cart item
    app.get('/cart/:id', async (req, res) => {
      const id = req.params.id;
      const specificCartItem = { _id: new ObjectId(id)}
      const result = await cartCollections.findOne(specificCartItem);
      res.send(result);
    })

    // delete item from cart
    app.delete('/cart/:id', async (req, res) => {
      const id = req.params.id;
      // const deleteCartItem = { _id: id}
      const deleteCartItem = { _id: new ObjectId(id)}
      console.log("deleteCartItem", deleteCartItem);
      const result = await cartCollections.deleteOne(deleteCartItem);
      res.send(result);
    })

    // update cart quantity
    app.put('/cart/:id', async (req, res) => {
      const itemId = new ObjectId(req.params.id);
      const { quantity } = req.body;
  
      try {
        const result = await cartCollections.updateOne(
          { _id: itemId },
          { $set: { quantity: parseInt(quantity, 10) } }
        );
  
        if (result.modifiedCount === 1) {
          res.status(200).json({ message: 'Quantity updated successfully' });
        } else {
          res.status(404).json({ message: 'Item not found' });
        }
      } catch (error) {
        console.error('Error updating quantity:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });
    

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