import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { logo } from '../Logo';
import { Row, Col } from 'reactstrap';
import Table from '../../components/Table/Table';
// import Course from './Course';
class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = { data: [] };
	}
	// componentDidMount() {
	// 	fetch('http://localhost/backend/backend/api/read.php')
	// 		.then((res) => res.json())
	// 		.then(
	// 			(results) => {
	// 				this.setState({ data: results.data });
	// 			},
	// 			(error) => {
	// 				this.setState({ error });
	// 			}
	// 		);
	// }

	render() {
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
							<span className="mr-2">Course Code:</span> <span>CSS 112</span>
						</div>
						<div>
							<span className="mr-2">Faculty:</span> <span>Francis Gatsi</span>
						</div>
						<div>
							<span className="mr-2">Faculty Intern:</span>
							<span>Nana Ama</span>
						</div>
						<div>
							<span className="mr-2">Number of classes Missed:</span>
							<span>5</span>
						</div>
					</Col>
					<Col>Graph</Col>
				</Row>
				<Row className=" m-2 p-2 border border-info">
					<Col>
						<Table />
					</Col>
				</Row>
			</Fragment>
		);
	}
}

export default Dashboard;
