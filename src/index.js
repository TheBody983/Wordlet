import "./config";

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import App from './routes/App';
import About from './routes/About';
import Forge from './routes/Forge';
import Advanced from './routes/Advanced';
import Decoy from './routes/Decoy';
import Header from "./components/Header";

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path = "/" element={<><Header /><App /></>}/>
            <Route
                path="*"
                element = {
                <section>
                    <h1>Wordlet 404 page not found</h1>
                </section>
                }
            />
                <Route path = "about" element = {<><Header /><About /></>} />
                <Route path = "forge" element = {<><Header /><Forge /></>} />
                <Route path = "advanced" element = {<><Header /><Advanced /></>} />
            <Route path = "decoy" element = {<><Header /><Decoy /></>} />
        </Routes>
    </BrowserRouter>,
document.getElementById('root')
); 
