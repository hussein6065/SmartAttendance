import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// import Webcam from 'react-webcam';
import { RotateLoader } from 'react-spinners';
import { css } from '@emotion/react/';
import { toast } from 'react-toastify';

class FormModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			Lecture: '',
			date: '',
			week: '',
			course: '',
			open: false,
			time: '',
			load: false,
		};
		toast.configure();
	}
	loaderCSS = css`
		margin-top: 25px;
		margin-bottom: 25px;
	`;

	handleClickOpen = () => {
		console.log('open');
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};
	handleSubmit = () => {
		var data = {
			course: this.props.info.id,
			user: this.props.user,
			student:
				localStorage.getItem('id') !== null ? localStorage.getItem('id') : null,
		};
		// this.setState({ load: true });

		console.log(data);
		fetch(
			'http://smartattendance.uksouth.cloudapp.azure.com/backend/api/attendLecture.php',
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
				this.setState({ load: true });
				console.log(data);

				if (data.status === '1') {
					var time = data.info.time + 5400;
					time = time * 1000;
					var time2 = new Date().getTime();
					time <= time2
						? toast.info(
								<div>
									<span
										style={{
											width: '100%',
											textAlign: 'center',
											float: 'right',
										}}
									>
										Oooops, Lectures not Scheduled Yet
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
									onOpen: () => {
										this.setState({ load: true });
									},
									onClose: () => {
										this.setState({ load: false });
										this.setState({ open: false });
									},
								}
						  )
						: toast.success(
								<div>
									<span
										style={{
											width: '100%',
											textAlign: 'center',
											float: 'right',
										}}
									>
										Joining Lectures
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
										this.setState({ load: false });
										this.setState({ open: false });
										window.open(data.info.link);
									},
								}
						  );
				} else {
					toast.info(
						<div>
							<span
								style={{ width: '100%', textAlign: 'center', float: 'right' }}
							>
								Oooops, Lectures not Scheduled Yet
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
							onOpen: () => {
								this.setState({ load: true });
							},
							onClose: () => {
								this.setState({ load: false });
								this.setState({ open: false });
							},
						}
					);
				}
			});
	};

	render() {
		return (
			<span>
				<button
					className="btn btn-info btn-block"
					onClick={this.handleClickOpen}
				>
					{this.props.title ? this.props.title : 'Attand Lectures'}
				</button>
				<Dialog
					open={this.state.open}
					disableBackdropClick
					disableEscapeKeyDown
					onClose={this.handleClose}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title"></DialogTitle>
					<DialogContent>
						<h2>Join Lectures of {this.props.info.course} Now!</h2>
						<br />
						<strong>
							Make sure to use Your Ashesi Email to Log into Zoom!
						</strong>
					</DialogContent>
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
					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
							Cancel
						</Button>
						<Button onClick={this.handleSubmit} color="primary">
							Join Lecture
						</Button>
					</DialogActions>
				</Dialog>
			</span>
		);
	}
}

export default FormModal;
