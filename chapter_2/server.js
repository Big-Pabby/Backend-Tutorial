const express = require('express');
const app = express();
const PORT = 3000;

//Middleware to parse JSON bodies
app.use(express.json());

let users = []

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.post('/api/data', (req, res) => {
  const newEntry = req.body; // Assuming the request body contains the new entry data
  users.push(newEntry);
  res.status(201).json(newEntry); // Respond with the new entry and a 201 status code
});


app.listen(PORT, () => {  console.log(`Example app listening on port ${PORT}!`);
});