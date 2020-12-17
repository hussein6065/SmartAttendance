import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

// import { Route } from 'react-router-dom';
// import './App.css';
import Info from './Info';

// export default class Login extends Component {
// 	render() {
// 		return <Dashboard />;
// 	}
// }
const Dashboard = ({ match }) => (
	<Fragment>
		<Route path={`${match.url}/faculty`} component={Info} />
	</Fragment>
);
export default Dashboard;
