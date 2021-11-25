const mongo = require('../mongo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dbClient = mongo;
const db = dbClient.db('todolist');
const Users = db.collection('users');

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;

// consider using jwt?
const signIn = async (req, res) => {
  const JWT_EXPIRY = 60 * 60 * 24; // 1 day

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
  res.cookie('username', user.username, { maxAge: JWT_EXPIRY });

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
    password: hash,
    hasAccess: [req.body.username],
    list: [],
  }

  Users.insertOne(newUser).then((result) => {
    return res.status(200).json({ message: 'User created.' });
  }).catch((err) => {
    return res.status(400).json({ message: 'Error creating user.' });
  });
}

const addList = async (req, res) => {
  // get current user
  // list access field
}

const authenticate = async (req, res) => {

}

module.exports = {
  signIn,
  createAccount,
  addList,
}