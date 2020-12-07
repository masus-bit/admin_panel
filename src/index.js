import ReactDOM from "react-dom";
import React from "react";
import { reducer, ActionCreator } from "./reducer/reducer.js";
import { Provider } from "react-redux";
import {App} from "../src/components/app/app.jsx"
import { createStore} from "redux";
import{userList} from './bd.js'
import { Operations } from "./reducer/operations.js";



export const store = createStore(
  reducer,

  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (f) => f
  
);
localStorage.length>1?store.dispatch(ActionCreator.loadToStore()): store.dispatch(ActionCreator.load(userList, store))

const init = () => {
  ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector(`#root`)
  );
};

init();
