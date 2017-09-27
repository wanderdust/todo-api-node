const {ObjectID} = require('mongodb')
,     {mongoose} = require('./../server/db/mongoose.js')
,     {Todo} = require('./../server/models/todo.js')
,     {User} = require('./../server/models/user.js')

// let id = '59cb80754f94280dec75c88d';
//
// if (!ObjectID.isValid(id)) {
//   console.log('Id not valid')
// }
//
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log(todos)
// }).catch((e) => console.log(e.message));
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log(todo)
// }).catch((e) => console.log(e.message));
//
// Todo.findById(id).then((todo) => {
//   if (!todo) return console.log('Id not found')
//   console.log(todo)
// }).catch((e) => console.log(e.message));

User.findById('59c9544d1bfe7866ec2a224d').then( user => {
  if (!user) return console.log('Id not found');
  
  console.log(user)
}).catch(e => console.log(e))
