import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { logo } from '../Logo';
import { Row, Col } from 'reactstrap';
import Table from '../../components/Table/TableF';
// import Course from './Course';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				code: 'CS 111',
				faculty: 'Francis Gatsi',
				fi: 'Nana Ama',
				students: 50,
			},
		};
	}

	componentDidMount() {
		fetch('http://localhost/backend/backend/api/read.php')
			.then((res) => res.json())
			.then(
				(results) => {
					this.setState({ data: results.data });
				},
				(error) => {
					this.setState({ error });
				}
			);
	}
	data = [
		{
			id: 1,
			date: 'Sat Oct 10 11:58:11 2020',
			lecture: 'Lecture 1',
			week: '1',
			attendees: 25,
		},
		{
			id: 2,
			date: 'Sat Oct 10 11:58:11 2020',
			lecture: 'Lecture 3',
			week: '2',
			attendees: 25,
		},
		{
			id: 3,
			date: 'Sat Oct 10 11:58:11 2020',
			lecture: 'Lecture 3',
			week: '3',
			attendees: 25,
		},
	];
	render() {
		const { data } = this.state;
		return (
			<Fragment>
				<nav
					className="navbar navbar-expand-lg navbar-light"
					style={{ backgroundColor: '#1c8ef9' }}
				>
					<div className="container d-flex flex-row justify-content-center ">
						<img width={100} className="" src={logo} alt="logo" />
						<h1 className="m-auto">Online Attendance</h1>
					</div>

					<button type="button" className="btn btn-light">
						<FontAwesomeIcon icon={faSignOutAlt} />
					</button>
				</nav>

				<Row className=" m-2 p-2 border border-info">
					<span className="text-capitalize">
						<h2>Computer Organization</h2>
					</span>
				</Row>
				<Row className=" m-2 p-2 border border-info">
					<Col>
						<div>
							<span className="mr-2">Course Code:</span>
							{data.code} <span></span>
						</div>
						<div>
							<span className="mr-2">Faculty:</span>{' '}
							<span>{data.faculty} </span>
						</div>
						<div>
							<span className="mr-2">Faculty Intern:</span>
							<span>{data.fi} </span>
						</div>
						<div>
							<span className="mr-2">Total Number of Students:</span>
							<span>{data.students} </span>
						</div>
					</Col>
				</Row>
				<Row className=" m-2 p-2 border border-info">
					<Col>
						<Table data={this.data} />
					</Col>
				</Row>
			</Fragment>
		);
	}
}

export default Dashboard;
