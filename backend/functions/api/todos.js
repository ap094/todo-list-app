const { db } = require('../utils/admin');

exports.getTodos = (request, response) => {
    db
        .collection('todos')
        .orderBy('createdAt', 'desc')
        .get()
        .then((data) => {
            let todos = [];

            data.forEach((todo) => {
                todos.push({
                    id: todo.id,
                    taskName: todo.data().taskName,
                    taskDescription: todo.data().taskDescription,
                    createdAt: todo.data().createdAt,
                });
            });

            return response.json(todos);
        })
        .catch((err) => {
            return response.status(500).json({
                error: {
                    message: 'Error on get todos',
                    code: err.code
                }
            });
        });
};

exports.getOneTodo = (request, response) => {
    db
        .doc(`todos/${request.params.todoId}`)
        .get()
        .then((data) => {
            if (!data.exists) {
                return response.status(404).json({ error: 'Todo not found' });
            }

            return response.json({
                ...data.data(),
                todoId: data.id
            });
        })
        .catch((err) => {
            return response.status(500).json({
                error: {
                    message: 'Error on get one todo',
                    code: err.code
                }
            });
        });
}

exports.postTodo = (request, response) => {
    if (request.body.taskName.trim() === '') {
        return response.status(400).json({ taskName: 'Field must not be empty' });
    }

    if (request.body.taskDescription.trim() === '') {
		return response.status(400).json({ taskDescription: 'Field must not be empty' });
    }

    const newTodoItem = {
        taskName: request.body.taskName,
        taskDescription: request.body.taskDescription,
        createdAt: new Date().toLocaleString('hr-HR')
    }

    db
        .collection('todos')
        .add(newTodoItem)
        .then((data)=>{
            return response.json({
                ...newTodoItem,
                id: data.id
            });
        })
        .catch((err) => {
            return response.status(500).json({
                error: {
                    message: 'Error on post todo',
                    code: err.code
                }
            });
        });
};

exports.editTodo = (request, response) => {
    if (request.body.todoId || request.body.createdAt) {
        return response.status(403).json({ message: 'Not allowed to edit' });
    }

    db
        .doc(`/todos/${request.params.todoId}`)
        .update(request.body)
        .then(()=> {
            return response.json({ message: 'Updated successfully!' });
        })
        .catch((err) => {
            return response.status(500).json({
                error: {
                    message: 'Error on edit todo',
                    code: err.code
                }
            });
        });
}

exports.deleteTodo = (request, response) => {
    const document = db.doc(`/todos/${request.params.todoId}`);

    document
        .get()
        .then((data) => {
            if (!data.exists) {
                return response.status(404).json({ error: 'Todo not found' })
            }

            return document.delete();
        })
        .then(() => {
            response.json({ message: 'Delete successfull!' });
        })
        .catch((err) => {
            return response.status(500).json({
                error: {
                    message: 'Error on delete todo',
                    code: err.code
                }
            });
        });
}
