import "./config"
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Log from './Log';
import App from './App';
import Market from './Market';

import Dev from './Dev';
import Discord from "./Discord";
import SetupAccount from "./SetupAccount"

ReactDOM.render(
<React.StrictMode>
	<Log />
</React.StrictMode>,
document.getElementById('btn')
);

ReactDOM.render(
	<React.StrictMode>
		<App />
		<Dev />
		<SetupAccount />
	</React.StrictMode>,
document.getElementById('accountData')
);

ReactDOM.render(
<React.StrictMode>
	<Market />
</React.StrictMode>,
document.getElementById('marketData')
);
