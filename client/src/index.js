/* BootStrap Deps */
import './lib-css/custom-bootstrap-4.3.1.min.css';
import $ from 'jquery'; // eslint-disable-line
import Popper from 'popper.js'; // eslint-disable-line
import 'bootstrap/dist/js/bootstrap.bundle.min';
/* BootStrap Deps */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
