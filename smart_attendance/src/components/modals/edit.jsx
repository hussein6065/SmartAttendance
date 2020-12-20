import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { DotLoader } from 'react-spinners';
import { css } from '@emotion/react/';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
	const [open, setOpen] = useState(false);
	const [load, setLoad] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const handleMark = () => {
		setLoad(true);
		var data = {
			mode: 'manual',
			lecture: props.lecture,
			student: props.data.id,
			value: props.data.status === '1' ? 0 : 1,
		};
		fetch(
			'http://smartattendance.uksouth.cloudapp.azure.com/backend/api/autoMark.php',
			{
				method: 'POST',
				header: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			}
		)
			.then((response) => response.text())
			.then((data) => {
				props.call();
				console.log(data);
			});
		console.log(data);
		setLoad(false);
		setOpen(false);
	};
	const loaderCSS = css`
		margin-top: 25px;
		margin-bottom: 25px;
	`;
	return (
		<div>
			<button className="btn btn-success btn-block" onClick={handleClickOpen}>
				Action
			</button>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle id="alert-dialog-slide-title">
					{'Do you want to check presence for Lecture?'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						Clicking
						{props.data.status === '1' ? (
							<strong> Absent </strong>
						) : (
							<strong> Present </strong>
						)}{' '}
						will mean <strong>{props.data.student}</strong>{' '}
						{props.data.status === '1' ? (
							<strong>did not </strong>
						) : (
							<strong> did </strong>
						)}
						attend this Lecture.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleMark} color="success">
						{props.data.status === '1' ? (
							<strong> Absent </strong>
						) : (
							<strong> Present </strong>
						)}
					</Button>
				</DialogActions>
			</Dialog>
			{load ? (
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
						<DotLoader css={loaderCSS} color="blue" loading={load} />
					</div>
				</div>
			) : (
				''
			)}
		</div>
	);
}
