const functions = require('firebase-functions');
const app = require('express')();
const cors = require('cors');

const {
    getTodos,
    getOneTodo,
    postTodo,
    editTodo,
    deleteTodo,
} = require('./api/todos')

// Access-Control-Allow-Origin: *
app.use(cors());

app.get('/todos', getTodos);
app.get('/todo/:todoId', getOneTodo);
app.post('/todo', postTodo);
app.put('/todo/:todoId', editTodo);
app.delete('/todo/:todoId', deleteTodo);

exports.api = functions.https.onRequest(app);
