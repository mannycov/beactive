import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logOutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import PrivateRoute from './components/common/PrivateRoute';

import AppNavbar from './components/layout/AppNavbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import LogIn from './components/auth/LogIn';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Goals from './components/goals/Goals';
import Goal from './components/goal/Goal';
import NotFound from './components/not-found/NotFound';

import './App.css';
// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Log Out user
    store.dispatch(logOutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to log in
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <AppNavbar />
            <Route exact path="/" component={ Landing } />
            <div className="container">
              <Route exact path="/register" component={ Register } />
              <Route exact path="/login" component={ LogIn } />
              <Route exact path="/profiles" component={ Profiles } />
              <Route exact path="/profile/:handle" component={ Profile } />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={ Dashboard } />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/create-profile" component={ CreateProfile } />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/edit-profile" component={ EditProfile } />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={ Goals } />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/goal/:id" component={ Goal } />
              </Switch>
              <Route exact path="/not-found" component={ NotFound } />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
