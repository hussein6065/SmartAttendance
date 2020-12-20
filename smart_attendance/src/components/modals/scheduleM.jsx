import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Row, Col } from 'reactstrap';
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
			link: '',
		};
		toast.configure();
	}
	loaderCSS = css`
		margin-top: 25px;
		margin-bottom: 25px;
	`;
	handleData = (event) => {
		this.setState({ [event.target.id]: event.target.value });
	};
	handleClickOpen = () => {
		console.log('open');
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};
	handleSubmit = () => {
		const { Lecture, date, week, time, link } = this.state;
		var dateTime = `${date} ${time}`;
		var rawTime = new Date(dateTime).getTime() / 1000;

		if (
			Lecture !== '' &&
			date !== '' &&
			week !== '' &&
			time !== '' &&
			link !== ''
		) {
			var data = {
				lecture: Lecture,
				week: week,
				course: this.props.info.id,
				time: rawTime,
				zoom: link,
			};
			this.setState({ load: true });
			console.log(data);
			fetch(
				'http://smartattendance.uksouth.cloudapp.azure.com/backend/api/scheduleLecture.php',
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
					console.log(data);
					if (data.status === true) {
						toast.success(
							<div>
								<span
									style={{ width: '100%', textAlign: 'center', float: 'right' }}
								>
									Lecture Scheduled Successful
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
								},
							}
						);
					} else {
						toast.info(
							<div>
								<span
									style={{ width: '100%', textAlign: 'center', float: 'right' }}
								>
									Invalid Information
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
			toast.info(
				<div>
					<span style={{ width: '100%', textAlign: 'center', float: 'right' }}>
						Invalid Inputs
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
			<span>
				<button
					className="btn btn-info btn-block"
					onClick={this.handleClickOpen}
				>
					Schedule Lectures
				</button>
				<Dialog
					open={this.state.open}
					disableBackdropClick
					disableEscapeKeyDown
					onClose={this.handleClose}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">
						Schedule Lecture of {this.props.info.course}
					</DialogTitle>
					<DialogContent>
						<Row>
							<Col>
								<div>Lecture</div>
								<div className="mt-3">Week</div>
								<div className="mt-3">Date</div>
								<div className="mt-2">Time</div>
								<div className="mt-3">Zoom Link</div>
							</Col>
							<Col>
								<div>
									<input
										type="text"
										name=""
										id="Lecture"
										onChange={this.handleData}
										value={this.state.Lecture}
									/>
								</div>
								<div className="mt-2">
									<input
										type="text"
										name=""
										id="week"
										onChange={this.handleData}
										value={this.state.week}
									/>
								</div>
								<div className="mt-2">
									<input
										type="date"
										name="date"
										id="date"
										onChange={this.handleData}
										value={this.state.date}
									/>
								</div>
								<div className="mt-2">
									<input
										type="time"
										name="time"
										id="time"
										onChange={this.handleData}
										value={this.state.time}
									/>
								</div>
								<div className="mt-2">
									<input
										type="text"
										name="link"
										id="link"
										onChange={this.handleData}
										value={this.state.link}
									/>
								</div>
							</Col>
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
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
							Cancel
						</Button>
						<Button onClick={this.handleSubmit} color="primary">
							Schedule Lecture
						</Button>
					</DialogActions>
				</Dialog>
			</span>
		);
	}
}

export default FormModal;
