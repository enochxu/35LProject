const mongo = require('../mongo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const getUser = require('../helpers/getUser');
const dbClient = mongo;
const db = dbClient.db('todolist');
const Users = db.collection('users');

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;

// consider using jwt?
const signIn = async (req, res) => {
  const JWT_EXPIRY = 60 * 60 * 24; // 1 day

  if (!req.body.username || !req.body.password) {
    return res.status(400).send('Username or password missing');
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

  res.cookie('token', token, { maxAge: JWT_EXPIRY*1000 });
  res.cookie('username', user.username, { maxAge: JWT_EXPIRY*1000 });

  res.status(200).json({ message: "User signed in.", username: user.username });
  return;
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

const shareList = async (req, res) => {
  // get current user
  if (!req.cookies.token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (!req.body.shareUsername) {
    return res.status(400).json({ message: 'Username missing.' });
  }

  const user = await getUser(req.cookies.token);
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  Users.updateOne(
    { username: req.body.shareUsername },
    { $addToSet: { hasAccess: user.username } }
  )
    .then(() => {
      res.status(200).json({ message: "Shared succesfully." });
    })
    .catch((err) => {
      return res.status(400).json({ message: "User does not exist." });
    });
}

const logout = async (req, res) => {
  res.clearCookie('token');
  res.clearCookie('username');
  return res.status(200).json({ message: 'User logged out.' });
}

const authenticate = async (req, res) => {
  // get current user
  if (!req.cookies.token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const user = await getUser(req.cookies.token);
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  } else {
    return res.status(200).json({ message: 'User authenticated.', username: user.username });
  }
}

module.exports = {
  signIn,
  createAccount,
  shareList,
  authenticate,
  logout,
}