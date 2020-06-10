import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import TodoList from './components/TodoList';
import TodoContextProvider from './context/TodosProvider';

function App() {
    return (
        <TodoContextProvider>
            <Router>
                <Switch>
                    <Route exact path="/" component={TodoList}/>
                </Switch>
            </Router>
        </TodoContextProvider>
    );
}

export default App;
