import React from 'react';
import ReactDOM from 'react-dom';
import NewPostUI from '../pages/admin.js';
import PostUI from '../pages/post.js';
import Index from '../pages/index.js';

import './style.css';

var componentName = document.querySelector("meta[name=\"component\"").content

if (componentName == "NewPostUI"){
    ReactDOM.hydrate(<NewPostUI/>, document.getElementById('app'));
} else if (componentName == "Index3"){
    ReactDOM.hydrate(<PostUI/>, document.getElementById('app'));
}
