const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const userscontroller = require('./controllers/users.controller');
const mongo = require('./mongo')

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};


app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/signin', (req, res) => {

});

app.post('/createaccount', userscontroller.createAccount);

app.listen(5000);
