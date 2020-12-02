import React from 'react';
import ReactDOM from 'react-dom';
// import Landing from './pages/Login';
import Dash from './pages/Dashboard';
import * as serviceWorker from './serviceWorker';
// import Zoom from './components/Zoom';

ReactDOM.render(
	<React.StrictMode>
		<Dash />
	</React.StrictMode>,
	document.getElementById('root')
);
ReactDOM.render(
	<React.StrictMode>
		<Dash />
	</React.StrictMode>,
	document.getElementById('zoom')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
