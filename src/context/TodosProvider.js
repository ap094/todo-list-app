import React, { createContext, useState } from 'react';
import { uuid } from 'uuidv4';
import todosData from '../util/todosDummyData';

export const TodoContext = createContext();

const TodoContextProvider = ({ children }) => {
    const [ todos, setTodos ] = useState(todosData);

    const getTodo = (id) => {
        let todoData = {};

        todos.forEach((todo) => {
            if (todo.id === id) {
                todoData = { ...todo };
            }
        });

        return todoData;
    }

    const addTodo = (todo) => {
        setTodos([
            ...todos,
            { ...todo, id: uuid(), createdAt: new Date().toLocaleString() }
        ]);
    };

    const editTodo = (todoRecord) => {
        setTodos(todos.map((todo) => {
            if (todo.id === todoRecord.id) {
                return {
                    ...todoRecord,
                }
            }

            return todo;
        }));
    }

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    const deleteSelectedTodos = (selectedTodos) => {
        let todosCopy = [...todos];

        selectedTodos.forEach(st => {
            todosCopy = todosCopy.filter(tc => tc.id !== st.id);
        });

        setTodos(todosCopy);
    }

    console.log('Todos', todos)

    return (
        <TodoContext.Provider
            value={{
                todos,
                addTodo,
                editTodo,
                deleteTodo,
                deleteSelectedTodos,
                getTodo
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};

export default TodoContextProvider;
