const express = require('express');
const cors = require('cors');
const app = express();
const mongo = require('./mongo')

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

const dbClient = mongo;
const db = dbClient.db('todolist');

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World');
});

// app.get('/signin', (req, res) => {

// });

app.post('/createaccount', async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send('Username or password missing');
  }

  // console.log(db.collection('users'));
  // db.createCollection('users', (err, res) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log('User Collection created');
  //   }
  // });

  
  const user = await db.collection('users').findOne({ username: req.body.username });
  if (user) {
    return res.status(400).json({ message: 'Username already exists.' });
  }

  const newUser = {
    username: req.body.username,
    password: req.body.password,
  }

  db.collection('users').insertOne(newUser).then((result) => {
    return res.status(200).json({ message: 'User created.' });
  }).catch((err) => {
    return res.status(400).json({ message: 'Error creating user.' });
  });

});

app.listen(5000);
