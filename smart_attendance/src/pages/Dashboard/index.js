import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

// import { Route } from 'react-router-dom';
// import './App.css';
import BasicDashboard from './DashboardF';
const Dashboard = ({ match }) => (
	<Fragment>
		<Route path={`${match.url}/student`} component={BasicDashboard} />
	</Fragment>
);
export default Dashboard;
// export default class Login extends Component {
// 	render() {
// 		return <Dashboard />;
// 	}
// }
