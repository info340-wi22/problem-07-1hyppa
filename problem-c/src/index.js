import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import './style.css'; //import css file!

import FIFA_MATCHES_2018 from './data/fifa-matches-2018.json'; //the data to display

ReactDOM.render(<App gameData={FIFA_MATCHES_2018} />, document.getElementById('root'));
