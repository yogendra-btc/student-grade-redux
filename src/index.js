import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Root from './Root'
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import { render } from 'react-dom';
import { reducer } from './student';

const store = createStore(reducer)


render(
    <Root store={store} />,
    document.getElementById('root')
  )
// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
