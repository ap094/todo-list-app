import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TodoContextProvider from './context/TodosProvider';
import TodoList from './pages/TodoList';
import TodoDetails from './pages/TodoDetails';

function App() {
    return (
        <TodoContextProvider>
            <Router>
                <Switch>
                    <Route exact path="/" component={TodoList}/>
                    <Route path="/detail/:todoId" component={TodoDetails}/>
                </Switch>
            </Router>
        </TodoContextProvider>
    );
}

export default App;
