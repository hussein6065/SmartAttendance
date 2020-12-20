import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import SignIn from './login';

const LoginPage = ({ match }) => (
	<Fragment>
		<Route path={`${match.url}/`} component={SignIn} />
	</Fragment>
);
export default LoginPage;
