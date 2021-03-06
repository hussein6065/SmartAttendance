import React, { Component } from 'react';
import './index.css';
import { logo } from '../Logo';
import { connect } from 'react-redux';
import Switch from 'react-switch';
import { ToastContainer, toast } from 'react-toastify';
import {
	setLogin,
	setUserData,
	setUser,
	setUserType,
} from '../../reducers/Information';
import { RotateLoader } from 'react-spinners';
import { css } from '@emotion/react/';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			userError: false,
			load: false,

			faculty: false,
		};
		toast.configure();
	}
	loaderCSS = css`
		margin-top: 25px;
		margin-bottom: 25px;
	`;
	handleSwitch = (value) => {
		this.setState({ faculty: value });
	};
	handlePassword = (event) => {
		this.setState({
			password: event.target.value,
		});
	};

	handleUsername = (event) => {
		// const email = 'hussein.fuseini@ashesi.edu.gh';
		var valid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
			event.target.value
		);

		valid
			? this.setState({
					username: event.target.value,
					userError: false,
			  })
			: this.setState({
					username: event.target.value,
					userError: true,
			  });
	};
	handleSubmit = (event) => {
		event.preventDefault();
		let {
			enableLogin,
			setLogin,
			setUser,
			setUserType,
			setUserData,
		} = this.props;

		var data = {
			email: this.state.username,
			password: this.state.password,
			role: this.state.faculty ? 'fi' : 'student',
		};
		if (!this.state.userError && !(this.state.password === '')) {
			console.log(data);
			fetch(
				'http://smartattendance.uksouth.cloudapp.azure.com/backend/api/login.php',
				{
					method: 'POST',
					header: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				}
			)
				.then((response) => response.json())

				.then((data) => {
					if (data.status === 1) {
						setLogin(!enableLogin);
						setUser(data.info);
						setUserData(data.courses);
						setUserType(data.type);
						// console.log(data.courses);
						toast.success(
							<div>
								<span
									style={{ width: '100%', textAlign: 'center', float: 'right' }}
								>
									Login Successful
								</span>
							</div>,
							{
								position: toast.POSITION.BOTTOM_CENTER,
								autoClose: 3000,
								hideProgressBar: true,
								closeOnClick: false,
								pauseOnHover: false,
								draggable: false,
								progress: undefined,
								closeButton: false,
								onOpen: () => {
									this.setState({ load: true });
								},
								onClose: () => {
									this.props.history.push('/Dashboard/Student');
								},
							}
						);
					} else {
						toast.info(
							<div>
								<span
									style={{ width: '100%', textAlign: 'center', float: 'right' }}
								>
									Invalid Email and Password
								</span>
							</div>,
							{
								position: toast.POSITION.BOTTOM_CENTER,
								autoClose: 1500,
								hideProgressBar: true,
								closeOnClick: false,
								pauseOnHover: false,
								draggable: false,
								progress: undefined,
								closeButton: false,
							}
						);
					}
				});
		} else {
			toast.error(
				<div>
					<span style={{ width: '100%', textAlign: 'center', float: 'right' }}>
						{this.state.password === ''
							? 'Enter Password'
							: 'Enter a Valid Email'}
					</span>
				</div>,
				{
					position: toast.POSITION.BOTTOM_CENTER,
					autoClose: 1500,
					hideProgressBar: true,
					closeOnClick: false,
					pauseOnHover: false,
					draggable: false,
					progress: undefined,
					closeButton: false,
				}
			);
		}
	};
	render() {
		return (
			<div className="App">
				<nav
					className="navbar navbar-expand-lg navbar-light fixed-top"
					style={{ backgroundColor: '#1c8ef9' }}
				>
					<div className="container d-flex flex-row justify-content-center ">
						<img width={100} className="" src={logo} alt="logo" />
						<h1 className="m-auto">Online Attendance Portal</h1>
					</div>
				</nav>
				<ToastContainer />
				<div className="auth-wrapper">
					<form action="#" className="auth-inner">
						<h3>Log In</h3>
						<div className="form-group">
							<label htmlFor="email">
								Email Address{' '}
								<span className="text-danger">
									{this.state.userError ? '*' : ''}
								</span>
							</label>
							<input
								type="email"
								className={
									this.state.userError
										? 'form-control border border-danger'
										: 'form-control'
								}
								placeholder="Enter email"
								value={this.state.username}
								onChange={this.handleUsername}
							/>
							<div className="form-group mt-3">
								<label htmlFor="password">Password</label>
								<input
									type="password"
									placeholder="Enter password"
									className="form-control"
									value={this.state.password}
									onChange={this.handlePassword}
								/>
							</div>

							<label htmlFor="" className="container d-line">
								<span>Are you a faculty?</span>

								<span className="float-right">
									<Switch
										onChange={this.handleSwitch}
										checked={this.state.faculty}
										onColor="#86d3ff"
										onHandleColor="#2693e6"
										handleDiameter={30}
										uncheckedIcon={false}
										checkedIcon={false}
										boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
										activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
										height={20}
										width={48}
										className="react-switch"
										id="material-switch"
									/>
								</span>
							</label>
							<button
								type="submit"
								className="btn btn-primary btn-block"
								onClick={this.handleSubmit}
							>
								Login
							</button>
							<div className="d-flex justify-content-center mt-3">
								<a href="https://outlook.office365.com/">Forget Password?</a>
							</div>

							<hr />
							<button
								type="submit"
								className="btn btn-success btn-block"
								onClick={() => {
									this.props.history.push('/signUp/');
								}}
							>
								Sign Up
							</button>
						</div>
					</form>
					{/* <Modal /> */}
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
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => ({
	enableLogin: state.Information.enableLogin,
});
const mapDispatchToProps = (dispatch) => ({
	setLogin: (enable) => dispatch(setLogin(enable)),
	setUser: (enable) => dispatch(setUser(enable)),
	setUserData: (enable) => dispatch(setUserData(enable)),
	setUserType: (enable) => dispatch(setUserType(enable)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
