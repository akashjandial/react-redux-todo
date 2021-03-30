import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import persistState from 'redux-localstorage';
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import './styles/index.css';
import App from "./App.js";
import reducer from "./reducers/reducer.js";

// define persisted redux store with thunk
const enhancer = compose(persistState(), applyMiddleware(thunk));
// const store = createStore(reducer, enhancer);
const store = createStore(reducer,enhancer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
