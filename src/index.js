import React from "react";
import { Provider } from "react-redux";
import App from "./App";
import { legacy_createStore as createStore } from 'redux'
import musicPlayerReducer from "./store/musicPlayerReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import "./index.scss";
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

const store = createStore(musicPlayerReducer, composeWithDevTools())

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
