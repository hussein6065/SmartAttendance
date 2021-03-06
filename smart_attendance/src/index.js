import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './Layout/AppMain';
import * as serviceWorker from './serviceWorker';
import configureStore from './config/config';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
const store = configureStore();
const rootElement = document.getElementById('root');

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

// /* <React.StrictMode>

// </React.StrictMode> */
