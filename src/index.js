import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import reducer from './store/reducer';

import createApi from './api';

import App from './components/app/app';

const store = createStore(
    reducer,
    composeWithDevTools(),
);

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById(`root`)
);
