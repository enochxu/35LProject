const express = require('express');
const cors = require('cors');
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));

app.get('/', function (req, res) {
  res.send('Hello World');
});



app.listen(5000);
