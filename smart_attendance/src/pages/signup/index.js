import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import SignUp from './signup';

const SignUpPage = ({ match }) => (
	<Fragment>
		<Route path={`${match.url}/`} component={SignUp} />
	</Fragment>
);
export default SignUpPage;
