import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TodoContextProvider from './services/TodosProvider';
import TodoList from './pages/TodoList';
import TodoDetails from './pages/TodoDetails';
import PageNotFound from './components/PageNotFound';

export default function App() {
    return (
        <TodoContextProvider>
            <Router>
                <Switch>
                    <Route exact path="/" component={TodoList}/>
                    <Route path="/detail/:todoId" component={TodoDetails}/>
                    <Route path="*" component={PageNotFound}/>
                </Switch>
            </Router>
        </TodoContextProvider>
    );
}
