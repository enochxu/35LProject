const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const userscontroller = require('./controllers/users.controller');
const listcontroller = require('./controllers/list.controller');
const mongo = require('./mongo');
const npmlog = require('npmlog');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World');
});

// user routes
// app.get()
app.post('/signin', userscontroller.signIn);
app.post('/createaccount', userscontroller.createAccount);
app.get('/authenticate', userscontroller.authenticate);
app.post('/logout', userscontroller.logout);
app.put('/sharelist', userscontroller.shareList); 

// list routes
app.get('/getlist', listcontroller.getList);
app.post('/additem', listcontroller.addItem);
// Causes minor bug preventing repeat of add item (single character)
app.post('/removeitem', listcontroller.removeItem);
app.post('/clearitems', listcontroller.clearItems);

app.listen(5000);
