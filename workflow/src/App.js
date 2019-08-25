import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavigationPage from './components/pages/NavigationPage';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AuthState from './context/auth/AuthState';
import ProjectState from './context/project/ProjectState';

const App = () => {
  return (
    <div className='App'>
      <AuthState>
        <ProjectState>
          <Router>
            <Fragment>
              <Navbar />
              <Switch>
                <Route exact path='/' component={NavigationPage} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
              </Switch>
            </Fragment>
          </Router>
        </ProjectState>
      </AuthState>
    </div>
  );
};

export default App;
