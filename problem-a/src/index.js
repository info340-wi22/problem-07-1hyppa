import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App.js';
import senatorsArr from './senators.json';
console.log(senatorsArr);

//render the App component here!
let renderElem = <App senators={senatorsArr}/>;
ReactDOM.render(renderElem, document.getElementById("root"));
