const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb://localhost:27017/todolist', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// let dbo;

client.connect((err, db) => {
  if (err) {
    console.log(err);
  } else {
    // dbo = db.db('todolist');
  //   dbo.createCollection('users', (err, res) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log('User Collection created');
  //     }
  //   });
    console.log('Connected to database.');
  }
});

// console.log(client.db)

module.exports = client;