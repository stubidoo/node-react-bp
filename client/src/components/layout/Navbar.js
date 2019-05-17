import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <div className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container">
          <Link to="/" class="navbar-brand">Home</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" >Manage Invitations</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" >Add / Edit Invitation</a>
              </li>
            </ul>
            <ul class="nav navbar-nav ml-auto">
              <li class="nav-item">
                <Link class="nav-link" to="/login">Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Navbar;
