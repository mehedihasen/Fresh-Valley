const express = require('express')
const cors =require('cors')
const ObjectId =require('mongodb').ObjectID
const MongoClient = require('mongodb').MongoClient;

const port = 5000
const pass = "gpPHCdE1BLinfKHS"
const uri = "mongodb+srv://electrical:gpPHCdE1BLinfKHS@cluster0.h8zf7.mongodb.net/electrical?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express()
app.use(express.json());
app.use(cors());




client.connect(err => {
  const collection = client.db("electrical").collection("service");
  const orderCollection = client.db("electrical").collection("order");
  const ReviewCollection = client.db("electrical").collection("Review");
  const adminCollection = client.db("electrical").collection("admin");
  console.log(err);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/product", (req, res)=>{
  collection.find()
  .toArray((err, item)=>{
    res.send(item)
  })
})

app.get("/admin", (req, res)=>{
  adminCollection.find()
  .toArray((err, item)=>{
    res.send(item)
  })
})

app.get("/oder", (req, res)=>{
  orderCollection.find()
  .toArray((err, item)=>{
    res.send(item)
  })
})

app.get("/review", (req, res)=>{
  ReviewCollection.find()
  .toArray((err, item)=>{
    res.send(item)
  })
})


app.post("/admin",(req, res)=>{
  const product = req.body;
collection.insertOne(product)
  .then((result, err)=>{
    res.send(result.insertedCount > 0)
    console.log(result);
    
  })
})
app.post("/oder",(req, res)=>{
  const product = req.body;
orderCollection.insertOne(product)
  .then((result, err)=>{
    res.send(result.insertedCount > 0)
    console.log(result);
    
  })
})

app.post("/review",(req, res)=>{
  const product = req.body;
ReviewCollection.insertOne(product)
  .then((result, err)=>{
    res.send(result.insertedCount > 0)
    console.log(result);
    
  })
})
app.post("/addmin",(req, res)=>{
  const product = req.body;
adminCollection.insertOne(product)
  .then((result, err)=>{
    res.send(result.insertedCount > 0)
    console.log(result);
    
  })
})





app.delete('/delete/:id', (req, res) => {
  console.log(req.params.id);
  collection.deleteOne({_id: ObjectId(req.params.id)})
  .then((result)=>{
    res.send(result.deletedCount > 0)
  //  console.log(result);

  })

})

  // client.close();
});



app.listen(process.env.PORT|| port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})          