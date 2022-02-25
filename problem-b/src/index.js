import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './style.css';

import SAMPLE_DOGS from './data/dogs.json'; //a sample list of dogs (model)

ReactDOM.render(<App pets={SAMPLE_DOGS} />, document.getElementById('root'));
