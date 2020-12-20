import React, { Component } from 'react';
import './index.css';
import { image, logo } from '../Logo';
import Switch from 'react-switch';
// import FaceScan from '../../components/modals/faceScan';
import { ToastContainer, toast } from 'react-toastify';
import { RotateLoader } from 'react-spinners';
import { css } from '@emotion/react/';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			confirmPass: '',
			userError: false,
			// if user is lecture of FI
			passError: true,
			faculty: false,
			id: '',
			load: false,
		};
		toast.configure();
	}
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
	handlePasswordConfirm = (event) => {
		event.target.value === this.state.password
			? this.setState({
					confirmPass: event.target.value,
					passError: false,
			  })
			: this.setState({
					confirmPass: event.target.value,
					passError: true,
			  });
	};
	handleId = (event) => {
		this.setState({
			id: event.target.value,
		});
	};
	handleSubmit = (event) => {
		event.preventDefault();

		if (
			!this.state.userError &&
			!this.state.passError &&
			!(this.state.id === '')
		) {
			this.setState({ load: true });
			var data = {
				email: this.state.username,
				password: this.state.password,
				id: this.state.id,
				role: this.state.faculty ? 'fi' : 'student',
			};
			console.log(data);
			fetch('http://localhost/backend/backend/api/register.php', {
				method: 'POST',
				header: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			})
				.then((response) => response.json())

				.then((data) => {
					console.log(data);
					if (data.status === '1') {
						toast.success(
							<div>
								<span
									style={{ width: '100%', textAlign: 'center', float: 'right' }}
								>
									Sign Up Successful
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
									this.props.history.push('/login/');
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
								onClose: () => {
									this.setState({ load: false });
								},
							}
						);
					}
				});
		}
	};

	sendData = () => {
		// fetch('http://localhost/backend/backend/api/read.php')
		// 	.then((res) => res.json())
		// 	.then(
		// 		(results) => {
		// 			this.setState({ data: results.data });
		// 		},
		// 		(error) => {
		// 			this.setState({ error });
		// 		}
		// 	);
		var data = {
			// name: 'Hussein Fuseini',
			// userData: '',
			url: localStorage.getItem('img'),
			// recognitionModel: 'recognition_03',
		};
		// fetch(
		// 	'https://eastus.api.cognitive.microsoft.com/face/v1.0/persongroups/sample_group_1/persons/836c5f3a-ca7f-43d9-a101-867bc115f45b/persistedFaces',
		// 	{
		// 		method: 'POST',
		// 		body: localStorage.getItem('img'),
		// 		headers: {
		// 			'Ocp-Apim-Subscription-Key': '1594fc5295cc429c996c1814026ae32e',
		// 			'Content-Type': 'application/octet-stream',
		// 		},
		// 	}
		// )
		// 	.then((rest) => rest.json())
		// 	.then(
		// 		(results) => {
		// 			console.log(results);
		// 		},
		// 		(error) => alert(error)
		// 	);
		// "836c5f3a-ca7f-43d9-a101-867bc115f45b"
		// alert('DOne');
		// var ie = localStorage.getItem('img');
		// this.setState({ image: ie });
		// console.log(this.state.image);
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
						<div>
							<button
								onClick={() => {
									this.props.history.push('/login/');
								}}
								className="btn btn-info btn-block"
							>
								Login
							</button>
						</div>
					</div>
				</nav>
				<div className="auth-wrapper">
					<form action="#" className="auth-inner">
						<h3>Sign Up</h3>
						<div className="form-group">
							<div className="form-group mt-3">
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
							</div>
							<div className="form-group mt-3">
								<label htmlFor="email">Staff | Student ID </label>
								<input
									type="text"
									className="form-control"
									placeholder="Enter ID number"
									value={this.state.id}
									onChange={this.handleId}
								/>
							</div>

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
							<div className="form-group mt-3">
								<label htmlFor="password">
									Confirm Password{' '}
									<span className="text-danger">
										{this.state.passError ? '* No match' : ''}
									</span>
								</label>
								<input
									type="password"
									placeholder="Enter password"
									className="form-control"
									value={this.state.confirmPass}
									onChange={this.handlePasswordConfirm}
								/>
							</div>

							<label htmlFor="" className="container d-line">
								<span>Are you a faculty?</span>

								<span className="float-right">
									<Switch
										onChange={() => {
											this.setState({ faculty: !this.state.faculty });
										}}
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

							<hr />
							<button
								type="submit"
								className="btn btn-success btn-block"
								onClick={this.handleSubmit}
							>
								Sign Up
							</button>
						</div>
					</form>

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
