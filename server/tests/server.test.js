const expect = require('expect')
,     request = require('supertest')
,     {ObjectID} = require('mongodb');

const {app} = require('./../server.js')
,     {Todo} = require('./../models/todo.js');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo'
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done())
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    let text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text: text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text)
      })
      .end((err, res) => {
        if(err) return done(err);

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e))
      });
  })
  it('should not create todo with invalid data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e))
      })
  })
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2)
      })
      .end(done)
  })
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text)
      })
      .end(done)
  });

  it('should return a 404 if todo not found', (done) => {
    let hexId = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done)
  });

  it('should return a 404 if non-object id', (done) => {
    let badId = '1234abc';
    request(app)
      .get(`/todos/${badId}`)
      .expect(404)
      .end(done)
  })
})
