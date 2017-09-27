// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log(err)
  };
  console.log('Connected to MongoDB server');

  // db.collection('Todos').find({
  //   _id: new ObjectID('59c8d689acf1c82add35960a')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, null, 2))
  // }).catch((err) => {
  //   console.log(err)
  // })

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count: ${count}`);
  // }).catch((err) => {
  //   console.log(err)
  // })

  db.collection('Users').find({
    name: "Pablo"
  }).toArray().then((res) => {
    console.log(JSON.stringify(res, null, 2))
  }).catch((err) => {
    console.log(err)
  })

  db.close();
})
