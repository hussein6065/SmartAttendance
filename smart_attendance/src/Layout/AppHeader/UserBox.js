import React, { Fragment } from 'react';

import {
	DropdownToggle,
	DropdownMenu,
	Nav,
	Button,
	NavItem,
	NavLink,
	UncontrolledTooltip,
	UncontrolledButtonDropdown,
} from 'reactstrap';

import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { image } from '../../pages/Logo';

class UserBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false,
		};
	}

	render() {
		return (
			<Fragment>
				<div className="header-btn-lg pr-0">
					<div className="widget-content p-0">
						<div className="widget-content-wrapper">
							<div className="widget-content-left  mr-3 header-user-info">
								<div className="widget-heading font-weight-bolder">
									Samuel Dakurah
								</div>
							</div>
							<div className="widget-content-left">
								<UncontrolledButtonDropdown>
									<DropdownToggle color="link" className="p-0">
										<img
											width={42}
											className="rounded-circle"
											src={image}
											alt="Hussein"
										/>
										<i className="sign-out-alt"></i>
									</DropdownToggle>

									<DropdownMenu right className="rm-pointers dropdown-menu-lg">
										<Nav vertical>
											<NavItem className="nav-item-header">Activity</NavItem>
											<NavItem>
												<NavLink href="javascript:void(0);">Profile</NavLink>
												<NavLink href="javascript:void(0);">Settings</NavLink>
											</NavItem>
											<NavItem>
												<NavLink href="javascript:void(0);">Logout</NavLink>
											</NavItem>
										</Nav>
									</DropdownMenu>
								</UncontrolledButtonDropdown>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default UserBox;
