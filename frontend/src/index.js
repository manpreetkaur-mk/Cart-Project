import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux"
import RootReducer from './User interface/RootReducer';
import  {createStore} from "redux"
var store=createStore(RootReducer)
const container = document.getElementById('root');


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <BrowserRouter>
    <Provider store={store}>
    <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
