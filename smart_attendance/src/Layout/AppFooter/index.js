import React, { Fragment } from 'react';

class AppFooter extends React.Component {
	render() {
		return (
			<Fragment>
				<div className="app-footer">
					<div className="app-footer__inner">
						<div className="app-footer-right">
							<ul className="nav">
								<li className="nav-item">
									<a href="javascript:void(0);" className="nav-link"></a>
								</li>
							</ul>
						</div>
						<div className="app-footer-right">
							<ul className="nav">
								<li className="nav-item">
									<a href="javascript:void(0);" className="nav-link">
										Privacy Policy
									</a>
								</li>
								<li className="nav-item mr-0">
									<a href="javascript:void(0);" className="nav-link">
										Ashesi University
									</a>
								</li>
								<li className="nav-item mr-0">
									<span className="nav-link">| Copyright © 2020</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default AppFooter;
