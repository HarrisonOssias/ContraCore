import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavigationPage from './components/pages/NavigationPage';
import Navbar from './components/layout/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/' component={NavigationPage} />
      </Switch>
    </Router>
  );
};

export default App;
