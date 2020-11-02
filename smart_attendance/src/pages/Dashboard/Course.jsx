import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Col, Card, CardBody } from 'reactstrap';
import Modal from '../../components/modal';
import {
	faBookOpen,
	faBook,
	faClock,
	faCalendarDay,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class Course extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { data } = this.props;
		return (
			<Col md="6" lg="3">
				<Card className="mb-3" style={{ width: '300px' }}>
					<CardBody>
						<div style={{ height: '150px', backgroundColor: '#06A3B7' }}></div>
						<div>
							<h3 className="border border-info">
								<span
									style={{
										color: 'rgb(77, 61, 77)',
										lineHeight: '1.3',
										fontSize: '0.875rem',
										fontWeight: 'bold',
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
									}}
								>
									Francis Gatsi
								</span>
							</h4>
						</div>
						<hr />
						<nav>
							<Modal />
							<Modal />
							<Modal />
						</nav>
					</CardBody>
				</Card>
			</Col>
		);
	}
}

export default Course;
{
	/* <Card className="mb-3" style={{}}>
	<CardBody>
		<div style={{ height: '100px', backgroundColor: '#06A3B7' }}></div>
		<div>
			<div className="p-1 m-1">
				<FontAwesomeIcon icon={faBookOpen} />
				<span className="ml-2">{data.course}</span>
			</div>
			<div className=" p-1 m-1">
				<FontAwesomeIcon icon={faBook} />
				<span className="ml-2">{data.faculty}</span>
			</div>
			<div className=" p-1 m-1">
				<FontAwesomeIcon icon={faCalendarDay} />
				<span className="ml-2">Mon Tue</span>
			</div>
			<div className=" p-1 m-1">
				<FontAwesomeIcon icon={faClock} />
				<span className="ml-2">{data.time}</span>
			</div>
		</div>
		<hr />
		<div className="border border-info"></div>
	</CardBody>
</Card>; */
}
