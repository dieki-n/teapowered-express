import React from 'react';
import ReactDOM from 'react-dom';
import Index from '../components/index.js';

import './style.css';

ReactDOM.hydrate(<Index/>, document.getElementById('app'));