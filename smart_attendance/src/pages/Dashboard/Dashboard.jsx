import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { logo } from '../Logo';
import { Row, Col } from 'reactstrap';
// import Zoom from '../../components/Zoom';
// import Course from './Course';
class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = { data: [] };
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

	render() {
		// const { data } = this.state.data;
		console.log(this.state.data);
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
						<h2>lectures</h2>
					</span>
				</Row>

				<Row className=" m-2 p-2 border border-info">
					{/* {this.state.data.map((item) => (
						<Course data={item} />
					))} */}
					<div style={{ color: 'white', backgroundColor: 'white' }}>
						<a href="./zoom">Join Class</a>
					</div>
				</Row>

				<Col></Col>
			</Fragment>
		);
	}
}

export default Dashboard;
