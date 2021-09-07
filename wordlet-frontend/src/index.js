import "./config"
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Log from './Log';
import App from './App';
import Market from './Market';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <Log />
    </React.StrictMode>,
    document.getElementById('btn')
);

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('accountData')
);

ReactDOM.render(
  <React.StrictMode>
    <Market />
  </React.StrictMode>,
  document.getElementById('marketData')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
