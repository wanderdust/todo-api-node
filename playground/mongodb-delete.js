const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) return console.log(err);

  // deleteMany();
  // db.collection('Todos').deleteMany({
  //   text: 'Do homework'
  // }, (err, res) => {
  //   if (err) return console.log(err);
  //
  //   console.log(res)
  // })

  // deleteOne(); -> Deletes the first one with that criteria
  // db.collection('Todos').deleteOne({
  //   text: 'Do more exercise'
  // }).then((res) => {
  //   console.log(res)
  // }).catch((err) => {
  //   console.log(err)
  // })

  // findOneAndDelete() -> Returns the deleted object.
  db.collection('Todos').findOneAndDelete({
    completed: false
  }).then((res) => {
    console.log(res.value)
  }).catch((err) => {
    console.log(err)
  })
  db.close();
})
