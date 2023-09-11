const express = require('express');
const app = express();
const port = 3000;

app.use('/', express.static('public'));

const budget = {
    myBudget: [
    {
        title: 'Eat Out',
        budget: 30
    },
    {
        title: 'Rent',
        budget: 350
    },
    {
        title: 'Groceries',
        budget: 90
    },
    {
        title: 'Shopping',
        budget: 120
    },
    {
        title: 'Home Essentials',
        budget: 20
    },
    {
        title: 'Gas',
        budget: 30
    },
    {
        title: 'Entertainment',
        budget: 80
    },
    {
        title: 'Savings',
        budget: 200
    },
]};

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.get('/budget', (req, res) => {
    res.send(budget);
});

app.listen(port, () => {
  console.log('Example app listening at http://localhost:3000');
});