import React, { Component } from 'react';
import './index.css';
import { image, logo } from '../Logo';
import Switch from 'react-switch';
import FaceScan from '../../components/modals/faceScan';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			userError: false,
			// if user is lecture of FI
			passError: false,
			faculty: false,
			image,
		};
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
		const email = 'hussein.fuseini@ashesi.edu.gh';
		event.target.value === email
			? this.setState({
					username: event.target.value,
					userError: false,
					faculty: true,
			  })
			: this.setState({
					username: event.target.value,
					userError: true,
			  });
	};
	handleSubmit = (event) => {
		event.preventDefault();
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
					</div>
				</nav>
				<div className="auth-wrapper">
					<form action="#" className="auth-inner">
						<h3>Log In</h3>
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
								<label htmlFor="email">
									Staff | Student ID{' '}
									<span className="text-danger">
										{this.state.userError ? '*' : ''}
									</span>
								</label>
								<input
									type="text"
									className={
										this.state.userError
											? 'form-control border border-danger'
											: 'form-control'
									}
									placeholder="Enter ID number"
									value={this.state.username}
									onChange={this.handleUsername}
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
								<label htmlFor="password">Confirm Password</label>
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

							<FaceScan />
							<hr />
							<button
								type="submit"
								className="btn btn-success btn-block"
								onClick={this.handleSubmit}
							>
								Sign Up
							</button>
						</div>
						<button
							// type="submit"
							className="btn btn-success btn-block"
							onClick={this.sendData}
						>
							Send Data
						</button>
					</form>
					<div>
						<img src={this.state.image} alt="" />
					</div>
				</div>
			</div>
		);
	}
}
