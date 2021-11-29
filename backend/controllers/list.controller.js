const mongo = require('../mongo');
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

  try {
    const users = await Users.find(
      { username: { $in: reqUser.hasAccess } },
      { projection: { username: 1, list: 1, _id: 0 } }
    ).toArray();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: "Could not get list." });
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

// NOT WORKING, PROTOTYPE
const removeItem = async (req, res) => {
  // get user
  if (!req.cookies.token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (!req.body.rmItem) {
    return res.status(400).json({ message: 'Item missing.' });
  }

  const user = await getUser(req.cookies.token);
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  Users.updateOne(
    { username: user.username },
    { $pull: { list: rmItem } }
  )
    .then(() => {
      res.status(200).json({ message: "Item removed." });
    })
    .catch((err) => {
      return res.status(500).json({ message: "Could not remove item." });
    });
}

module.exports = {
  getList,
  addItem,
  removeItem
}
