import "./config"
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Log from './Log';
import App from './App';
import Market from './Market';

import Discord from './community/Discord'
import Contacts from "./community/Contacts";

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

ReactDOM.render(
	<React.StrictMode>
		<Discord />
		<Contacts />
	</React.StrictMode>,
	document.getElementById('communityAndFeedback')
);