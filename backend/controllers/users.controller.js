const mongo = require('../mongo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dbClient = mongo;
const db = dbClient.db('todolist');
const Users = db.collection('users');

const SALT_ROUNDS = 10;

// consider using jwt?
const signIn = async (req, res) => {
  const JWT_EXPIRY = 60 * 60 * 24; // 1 day

  // created using generateKey.js
  // generallly, bad idea to store this in plain text here, but fine for the purpose of this project
  const JWT_SECRET = "4e2b288f54953de72a2fdea8ad0f5f639e1ac7f6e00238c8f3412236370f83d1";

  if (!req.body.username || !req.body.password) {
    res.status(400).send('Username or password missing');
  }

  const user = await Users.findOne({ username: req.body.username });
  if (!user) {
    return res.status(400).json({ message: 'User does not exist.' });
  }

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) {
    return res.status(400).json({ message: 'Incorrect password.' });
  }

  const token = jwt.sign({ 
    username: user.username
  }, JWT_SECRET, {
    expiresIn: JWT_EXPIRY,
  });

  res.cookie('token', token, { maxAge: JWT_EXPIRY });

  return res.status(200).json({ message: 'User signed in.' });
}


const createAccount = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send('Username or password missing');
  }
  
  const user = await Users.findOne({ username: req.body.username });
  if (user) {
    return res.status(400).json({ message: 'Username already exists.' });
  }

  const hash = await bcrypt.hash(req.body.password, SALT_ROUNDS);
  const newUser = {
    username: req.body.username,
    password: hash
  }

  Users.insertOne(newUser).then((result) => {
    return res.status(200).json({ message: 'User created.' });
  }).catch((err) => {
    return res.status(400).json({ message: 'Error creating user.' });
  });
}

const authenticate = async (req, res) => {

}

module.exports = {
  signIn,
  createAccount,
}