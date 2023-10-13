const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;
const fs = require('fs');
const uri = "mongodb://localhost:27017";
const { ObjectId } = require('mongodb');
let db;

app.use('/', express.static('public'));

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.get('/budget', async (req, res) => {
  try {
    console.log('Inside /budget route');
    const budgetCollection = db.collection('Assignment_8');
    const budget = await budgetCollection.findOne({_id: new ObjectId('65217823e021f237a7ad052d')});
    console.log('Budget fetched:', budget);
    
    if (!budget) {
      console.error('No budget data found');
      return res.status(404).send('No budget data found');
    }

    res.status(200).send(JSON.stringify(budget));
  } catch (err) {
    console.error('Error fetching data from MongoDB', err);
    res.status(500).send('Error fetching data from MongoDB');
  }
});

// Defining POST route
app.post('/add-document', async (req, res) => {
  try {
    const document = req.body;
    const result = await db.collection('Assignment_8').insertOne(document);
    res.status(201).send({ _id: result.insertedId });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Start server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

MongoClient.connect('mongodb://localhost:27017')
  .then(client => {
    db = client.db('ITCS_5166_NBAD');
  })
  .catch(err => console.error("Failed to connect to the database", err.stack));