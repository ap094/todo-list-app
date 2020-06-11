import React, { createContext, useState } from 'react';
import { uuid } from 'uuidv4';
import todosData from '../utils/todosDummyData';

export const TodoContext = createContext();

const TodoContextProvider = ({ children }) => {
    const [ todos, setTodos ] = useState(todosData);

    const getTodo = (id) => {
        return todos.filter((todo) => todo.id === id)[0];
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

    return (
        <TodoContext.Provider
            value={{
                todos,
                getTodo,
                addTodo,
                editTodo,
                deleteTodo,
                deleteSelectedTodos,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};

export default TodoContextProvider;
