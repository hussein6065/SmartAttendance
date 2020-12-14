import React, { Component } from 'react';
// import Button from '@material-ui/core/Button';
import { Col, Card, CardBody } from 'reactstrap';
import Modal from '../../components/modal';
// import {
// 	faBookOpen,
// 	faBook,
// 	faClock,
// 	faCalendarDay,
// } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class Course extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { data } = this.props;
		console.log(data);
		return (
			<Col md="6" lg="3">
				<Card className="mb-3" style={{ width: '300px' }}>
					<CardBody>
						<div
							onClick={() => {
								console.log('Hussein');
							}}
							style={{
								height: '150px',
								backgroundColor: '#06A3B7',
								padding: '5px',
								cursor: 'pointer',
							}}
						>
							<div> Attandance: 15 / 20</div>
						</div>
						<div>
							<h3 className="border border-info">
								<span
									style={{
										color: 'rgb(77, 61, 77)',
										lineHeight: '1.3',
										fontSize: '0.875rem',
										fontWeight: 'bold',
										padding: '5px',
										cursor: 'pointer',
									}}
								>
									Computer Organization
								</span>
							</h3>
							<h4 className="border border-info">
								<span
									style={{
										color: 'rgb(77, 61, 77)',
										lineHeight: '1.0',
										fontSize: '0.715rem',
										fontWeight: 'bold',
										padding: '5px',
									}}
								>
									Francis Gatsi
								</span>
							</h4>
						</div>
						<hr />
						<nav>
							<Modal />
						</nav>
					</CardBody>
				</Card>
			</Col>
		);
	}
}

export default Course;
