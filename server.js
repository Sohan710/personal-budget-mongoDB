const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(express.json()); // Parsing JSON bodies
app.use('/', express.static('public')); // Serving static files

// MongoDB connection using Mongoose
mongoose.connect('mongodb://localhost:27017/ITCS_5166_NBAD', { useNewUrlParser: true, useUnifiedTopology: true });

// Defining Mongoose schema for budget data
const budgetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  budget: { type: Number, required: true },
  color: { type: String, required: true, minlength: 7, maxlength: 7 } // Ensuring hexadecimal format for color
});

// Mongoose model
const Budget = mongoose.model('Budget', budgetSchema, 'NBAD_08'); // Adjust the collection name as per your DB

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

// Fetching budget data using Mongoose
app.get('/budget', async (req, res) => {
  try {
    console.log('Inside /budget route');
    const budget = await Budget.findOne(); // Adjust querying as per your need
    
    if (!budget) {
      console.error('No budget data found');
      return res.status(404).send('No budget data found');
    }
    
    res.status(200).send(budget);
  } catch (err) {
    console.error('Error fetching data from MongoDB', err);
    res.status(500).send('Error fetching data from MongoDB');
  }
});

// Adding a new document using Mongoose
app.post('/add-document', async (req, res) => {
  try {
    const newBudget = new Budget(req.body);
    const result = await newBudget.save();
    res.status(201).send({ _id: result._id });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Starting the server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
