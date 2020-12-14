import React from 'react';
import ReactDOM from 'react-dom';
import Landing from './pages/Login';
import SignIn from './pages/signup';
import Dash from './pages/Dashboard';
import Info from './pages/Info2';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<React.StrictMode>
		<Info />
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
