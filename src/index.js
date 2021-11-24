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
import UserMarket from "./routes/UserMarket";

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path = "/" element={<App />}/>
            <Route
                path="*"
                element = {
                <section>
                    <h1>Wordlet 404 page not found</h1>
                </section>
                }
            />
                <Route path = "about" element = {<About />} />
                <Route path = "forge" element = {<Forge />} />
                <Route path = "advanced" element = {<Advanced />} />
                <Route path = "userMarket" element = {<UserMarket />} />
            <Route path = "decoy" element = {<Decoy />} />
        </Routes>
    </BrowserRouter>,
document.getElementById('root')
); 
