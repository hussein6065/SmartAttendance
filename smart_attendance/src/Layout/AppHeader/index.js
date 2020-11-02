import React, { Fragment } from 'react';
import cx from 'classnames';

import logo from '../../pages/Logo';

// import SearchBox from "./Components/SearchBox";
import UserBox from './Components/UserBox';

class Header extends React.Component {
	render() {
		return (
			<Fragment>
				<HeaderLogo />

				<div className="app-header__content">
					<div className="app-header-right">
						<UserBox />
					</div>
				</div>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	enableHeaderShadow: state.ThemeOptions.enableHeaderShadow,
	closedSmallerSidebar: state.ThemeOptions.closedSmallerSidebar,
	headerBackgroundColor: state.ThemeOptions.headerBackgroundColor,
	enableMobileMenuSmall: state.ThemeOptions.enableMobileMenuSmall,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
