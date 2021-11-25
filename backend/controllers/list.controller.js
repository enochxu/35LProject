const mongo = require('../mongo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dbClient = mongo;
const db = dbClient.db('todolist');
const Users = db.collection('users');
const getUser = require('../helpers/getUser');

const getList = async (req, res) => {
  // get user
  if (!req.cookies.token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const reqUser = await getUser(req.cookies.token);
  if (!reqUser) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const listUser = await Users.findOne({ username: req.params.username });
  if (!listUser) {
    return res.status(400).json({ message: 'User does not exist.' });
  }

  if (listUser.sharedWith.includes(reqUser.username)) {
    return res.status(200).json(listUser.list);
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

const addItem = async (req, res) => {
  // get user
  if (!req.cookies.token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (!req.body.item) {
    return res.status(400).json({ message: 'Item missing.' });
  }

  const user = await getUser(req.cookies.token);
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  Users.updateOne(
    { username: user.username },
    { $push: { list: req.body.item } }
  )
    .then(() => {
      res.status(200).json({ message: "Item added." });
    })
    .catch((err) => {
      return res.status(500).json({ message: "Could not add item." });
    });
}

const editItem = async (req, res) => {

}

module.exports = {
  getList,
  addItem,
}