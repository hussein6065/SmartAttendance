import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { logo } from '../Logo';
import { Row, Col } from 'reactstrap';

// import {setEna}
// import Zoom from '../../components/Zoom';
import Course from './Course';
class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = { data: {}, info: {}, type: 'student' };
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
	UNSAFE_componentWillMount() {
		let { enableLogin, user, userData, setType } = this.props;

		if (!enableLogin) {
			this.props.history.push('/login');
		} else {
			this.setState({ info: user });
			this.setState({ data: userData });
			this.setState({ type: setType });
		}
	}
	render() {
		// hussein.fuseini@ashesi.edu.gh
		const { data, info, type } = this.state;
		localStorage.removeItem('id');
		this.state.type === 'student' && localStorage.setItem('id', info.id);
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

					<button
						type="button"
						className="btn btn-light"
						onClick={() => {
							this.props.history.push('/login/');
						}}
					>
						<FontAwesomeIcon icon={faSignOutAlt} />
					</button>
				</nav>
				<Row className=" m-2 p-2 border border-info">
					<Col>
						<h2>Information</h2>
						<Row>
							<Col>
								<div>Name</div>
								<div>Student ID</div>
								{this.state.type === 'student' && <div>Major</div>}
								<div>Email</div>
							</Col>
							<Col>
								<div>{info.name}</div>
								<div>{info.id}</div>
								{this.state.type === 'student' && <div>{info.major}</div>}
								<div>{info.email}</div>
							</Col>
						</Row>
					</Col>
				</Row>

				<Row className=" m-2 p-2 border border-info">
					<span className="text-capitalize">
						<h2>lectures</h2>
					</span>
				</Row>

				<Row className=" m-2 p-2 border border-info">
					{data.map((info) => (
						<Course key={info.id} data={info} user={type} />
					))}
				</Row>
			</Fragment>
		);
	}
}

// export default Dashboard;
const mapStateToProps = (state) => ({
	enableLogin: state.Information.enableLogin,
	user: state.Information.user,
	userData: state.Information.userData,
	setType: state.Information.setType,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
