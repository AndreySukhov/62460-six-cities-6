import React from 'react';
import ReactDOM from 'react-dom';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';

import rootReducer from './store/root-reducer';
import {ActionCreator} from './components/sign-in-page/store/actions';

import createApi from './api';

import App from './components/app/app';

const api = createApi();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: {
        extraArgument: {api}
      },
    });
  }
});


store.dispatch(ActionCreator.checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById(`root`)
);
