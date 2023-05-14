const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const users = [];

app.post('/users', (req, res) => {
  const {name} = req.body;
  const id = Math.floor(Math.random() * 1000).toString();
  users.push({id, name});
  res.json({id});
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
