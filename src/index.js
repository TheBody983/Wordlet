import "./config";

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import App from './App';
import About from './components/About';
import Forge from './components/Forge';
import Advanced from './components/Advanced';
import Decoy from './components/Decoy';

ReactDOM.render(
	<BrowserRouter>
    <Routes>
      <Route path = "/" element={<App />}>
        <Route
          path="*"
          element = {
            <main style = {{ padding: "1rem" }}>
              <p>Wordlet 404 page not found</p>
            </main>
          }
        />
      </Route>
	  <Route path = "/about" element = {<About />} />
	  <Route path = "/forge" element = {<Forge />} />
	  <Route path = "/advanced" element = {<Advanced />} />
    <Route path = "/decoy" element = {<Decoy />} />
    </Routes>
  </BrowserRouter>,
document.getElementById('root')
); 
