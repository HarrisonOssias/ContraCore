import React from 'react';
import './App.css';
import { Router, Switch, Route } from 'react-router-dom';
import NavigationPage from './components/pages/NavigationPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={NavigationPage} />
      </Switch>
    </Router>
  );
};

export default App;
