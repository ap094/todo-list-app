import { uuid } from 'uuidv4';
import React, { createContext, useState } from 'react';
import todosData from '../todosDummyData';

export const TodoContext = createContext();

const TodoContextProvider = ({ children }) => {
    const [ todos, setTodos ] = useState(todosData);

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
                    ...todoRecord
                }
            }

            return todo;
        }));
    }

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.tableData.id !== id));
    }

    const deleteSelectedTodos = (selectedTodos) => {
        let todosCopy = [...todos];

        selectedTodos.forEach(st => {
            todosCopy = todosCopy.filter(tc => tc.tableData.id !== st.tableData.id);
        });

        setTodos(todosCopy);
    }

    return (
        <TodoContext.Provider value={{ todos, addTodo, editTodo, deleteTodo, deleteSelectedTodos }}>
            {children}
        </TodoContext.Provider>
    );
};

export default TodoContextProvider;
