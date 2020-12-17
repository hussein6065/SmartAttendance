import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

// import { Route } from 'react-router-dom';
// import './App.css';
import SignUp from './signup';

// export default class Login extends Component {
// 	render() {
// 		return <SignIn />;
// 	}
// }

const SignUpPage = ({ match }) => (
	<Fragment>
		<Route path={`${match.url}/`} component={SignUp} />
	</Fragment>
);
export default SignUpPage;
