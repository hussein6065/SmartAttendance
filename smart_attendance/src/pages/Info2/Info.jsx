import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { logo } from '../Logo';
import { Row, Col } from 'reactstrap';
import Table from '../../components/Table/TableF';
import Table2 from '../../components/Table/Table2';
import { RotateLoader } from 'react-spinners';
import { css } from '@emotion/react/';
// import Course from './Course';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			load: false,
			tableData: null,
		};
	}
	loaderCSS = css`
		margin-top: 25px;
		margin-bottom: 25px;
	`;
	UNSAFE_componentWillMount() {
		let { enableLogin, user, userData, setType } = this.props;

		if (false) {
			this.props.history.push('/login/');
		} else {
			this.setState({ info: user });
			this.setState({ data: userData });
			this.setState({ type: setType });
		}
	}
	// data = [
	// 	{
	// 		id: 1,
	// 		date: 'Sat Oct 10 11:58:11 2020',
	// 		lecture: 'Lecture 1',
	// 		week: '1',
	// 		attendees: 25,
	// 	},
	// 	{
	// 		id: 2,
	// 		date: 'Sat Oct 10 11:58:11 2020',
	// 		lecture: 'Lecture 3',
	// 		week: '2',
	// 		attendees: 25,
	// 	},
	// 	{
	// 		id: 3,
	// 		date: 'Sat Oct 10 11:58:11 2020',
	// 		lecture: 'Lecture 3',
	// 		week: '3',
	// 		attendees: 25,
	// 	},
	// ];
	componentDidMount() {
		var cours = localStorage.getItem('course');
		var dat = this.state.data.filter((info) => info.id === cours);
		this.setState({ data: dat[0] });
		this.setState({ load: true });
		// fetch('http://localhost/backend/backend/api/read.php')
		// 	.then((response) => response.text())
		// 	.then((data) => {
		// 		console.log(data);
		// 	});
		var dataSend = {
			type: this.state.type === 'student' ? 'lectures' : 'course',
			course: cours,
			id: this.state.type === 'student' ? this.state.info.id : '',
		};
		console.log(dataSend);
		fetch('http://localhost/backend/backend/api/getAttendance.php', {
			method: 'POST',
			header: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(dataSend),
		})
			.then((response) => response.json())

			.then((data) => {
				console.log(data);
				this.setState({ tableData: data });
				this.setState({ load: false });
			});
	}
	render() {
		const { data, info, tableData } = this.state;
		console.log('The data =>', tableData);

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
					<span className="text-capitalize">
						<h2>{data.course}</h2>
					</span>
				</Row>
				<Row className=" m-2 p-2 border border-info">
					<Col>
						<div>Course Code</div>
						<div>Faculty</div>

						<div>Faculty Intern</div>
						{this.state.type === 'fi' && <div>Total Number of Students</div>}
					</Col>
					<Col>
						<div>{data.id}</div>
						<div>{data.faculty}</div>

						<div>{data.fi}</div>
						{this.state.type === 'fi' && <div>{data.numberOfStudents}</div>}
					</Col>
				</Row>
				<Row className=" m-2 p-2 border border-info">
					{this.state.type === 'fi' && (
						<Col>
							{tableData !== null ? <Table data={tableData} /> : ''}
							{/* <Table data={tableData} /> */}
						</Col>
					)}
					{this.state.type === 'student' && (
						<Col>
							{tableData !== null ? <Table2 data={tableData} /> : ''}
							{/* <Table data={tableData} /> */}
						</Col>
					)}
				</Row>
				{this.state.load ? (
					<div
						style={{
							position: 'fixed',
							top: '0',
							left: '0',
							height: '100vh',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							width: '100%',
							zIndex: '1500',
						}}
					>
						<div>
							<RotateLoader
								css={this.loaderCSS}
								color="blue"
								loading={this.state.load}
							/>
						</div>
					</div>
				) : (
					''
				)}
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	enableLogin: state.Information.enableLogin,
	user: state.Information.user,
	userData: state.Information.userData,
	setType: state.Information.setType,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
