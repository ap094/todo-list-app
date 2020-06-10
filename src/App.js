import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TodoList from './components/TodoList';
import TodoContextProvider from './context/TodosProvider';
import TodoDetails from './components/TodoDetails';

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
