import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import CreateInvite from './components/create-invite/CreateInvite';

import './App.css';

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);

  const decoded = jwt_decode(localStorage.jwtToken);

  store.dispatch(setCurrentUser(decoded));

  // Expired
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());

    // TODO : Clear current profile

    window.location.href = '/login';
  }
}
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container page">
            <Route exact path="/" component={ Landing } />
            <Route exact path="/login" component={ Login } />
            <Route exact path="/manage-invitations" component={ CreateInvite } />
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
