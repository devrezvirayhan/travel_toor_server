const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const { MongoClient } = require('mongodb');
const ObjectId = require("mongodb").ObjectId

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USERR}:${process.env.DB_PASSS}@cluster0.0x2gm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
  try {
    await client.connect();
    // console.log('Database Connected SucessFully')

    const database = client.db('Travelling');

    // const ourcarCollection = database.collection('collection');

    const OurTravelingVacation = database.collection('HomePageVacation')
    const OurAllTraveling = database.collection('AllServices')
    const BookingHome = database.collection('bookingHome')

      // HOME PAGE VACATION POST API
    app.post('/teavelSportHome', async(req, res)=>{
      const vacation = req.body;
      const result = await OurTravelingVacation.insertOne(vacation)
      console.log(result)
      res.json(result)
    })

      // HOME PAGE VACATION GET API
      app.get('/teavelSportHome', async(req, res)=>{
        const cursor = OurTravelingVacation.find({})
        const vacation = await cursor.toArray();
        res.send(vacation)
      })
      

      
    app.post('/allLocation', async(req, res)=>{
      const alllocation = req.body;
      const result = await OurAllTraveling.insertOne(alllocation)
      console.log(result)
      res.json(result)
    })

      // HOME PAGE VACATION GET API
      app.get('/allLocation', async(req, res)=>{
        const cursor = OurAllTraveling.find({})
        const alllocation = await cursor.toArray();
        res.send(alllocation)
      })



        // GET SINGLE PRODUCT IN BOOKING 
        app.get("/singlProduct/:id", async (req, res) => {
          const result = await OurTravelingVacation
            .find({ _id: ObjectId(req.params.id) })
            .toArray();
          res.send(result[0]);
        });


        // CONFRON ORDER 
      app.post('/coformOrder', async(req,res)=>{
        const result = await BookingHome.insertOne(req.body);
        res.send(result)
      })
      

      app.get("/myOrders/:email", async (req, res) => {
        console.log(req.params.email)
        const result = await BookingHome.find({ email: req.params.email }).toArray();
        console.log(result)
        res.send(result);
      });


      app.delete("/delteOrder/:id", async (req, res) => {
        const result = await BookingHome.deleteOne({_id: ObjectId(req.params.id),});
        res.send(result);
      });

 // GET SINGLE PRODUCT IN BOOKING 
 app.get("/singlLocationProduct/:id", async (req, res) => {
  const result = await OurAllTraveling.find({ _id: ObjectId(req.params.id) }).toArray();
  res.send(result[0]);
});


// CONFRON ORDER 
app.post('/coformLocationOrder', async(req,res)=>{
const result = await BookingHome.insertOne(req.body);
res.send(result)
})













  }
  finally {
    // await client.close();
  }
}

run().catch(console.dir)


app.get('/', (req, res) => {
  res.send('Traveling Tour Project. Creacte By Rezvi Rayhan')
})

app.listen(port, () => {
  console.log(`listening at ${port}`)
})