import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import React, { Suspense, lazy, Fragment } from 'react';
const Login = lazy(() => import('../../pages/Login'));
const SignUp = lazy(() => import('../../pages/signup'));
const Dashboard = lazy(() => import('../../pages/Dashboard'));
const Info = lazy(() => import('../../pages/Info'));
const AppMain = () => {
	return (
		<Fragment>
			<Suspense
				fallback={
					<div className="loader-container">
						<div className="loader-container-inner">
							<h6 className="mt-5">
								Please wait while we load all the Components examples
								<small>
									Because this is a demonstration we load at once all the
									Components examples. This wouldn't happen in a real live app!
								</small>
							</h6>
						</div>
					</div>
				}
			>
				<Route path="/Dashboard" component={Dashboard} />
			</Suspense>
			<Suspense
				fallback={
					<div className="loader-container">
						<div className="loader-container-inner">
							<h6 className="mt-5">
								Please wait while we load all the Components examples
								<small>
									Because this is a demonstration we load at once all the
									Components examples. This wouldn't happen in a real live app!
								</small>
							</h6>
						</div>
					</div>
				}
			>
				<Route path="/Info" component={Info} />
			</Suspense>
			<Suspense
				fallback={
					<div className="loader-container">
						<div className="loader-container-inner">
							<h6 className="mt-5">
								Please wait while we load all the Components examples
								<small>
									Because this is a demonstration we load at once all the
									Components examples. This wouldn't happen in a real live app!
								</small>
							</h6>
						</div>
					</div>
				}
			>
				<Route path="/login" component={Login} />
			</Suspense>
			<Suspense
				fallback={
					<div className="loader-container">
						<div className="loader-container-inner">
							<h6 className="mt-5">
								Please wait while we load all the Components examples
								<small>
									Because this is a demonstration we load at once all the
									Components examples. This wouldn't happen in a real live app!
								</small>
							</h6>
						</div>
					</div>
				}
			>
				<Route path="/signup" component={SignUp} />
			</Suspense>
		</Fragment>
	);
};
export default AppMain;
