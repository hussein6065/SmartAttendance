import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import Webcam from 'react-webcam';
import Table from '../Table/new';
import { faSchool } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// const data = [
// 	{
// 		id: 60652022,
// 		name: 'Hussein Fuseini',
// 		status: 'missed',
// 	},
// 	{
// 		id: 60652022,
// 		name: 'Hussein Fuseini',
// 		status: 'attended',
// 	},
// 	{
// 		id: 60652022,
// 		name: 'Hussein Fuseini',
// 		status: 'attended',
// 	},
// 	{
// 		id: 60652022,
// 		name: 'Hussein Fuseini',
// 		status: 'missed',
// 	},
// 	{
// 		id: 60652022,
// 		name: 'Hussein Fuseini',
// 		status: 'missed',
// 	},
// 	{
// 		id: 60652022,
// 		name: 'Hussein Fuseini',
// 		status: 'missed',
// 	},
// ];
export default function FormDialog(props) {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<span>
			<button className="btn btn-success btn-block" onClick={handleClickOpen}>
				{props.title ? props.title : 'More details'}
			</button>
			<Dialog
				open={open}
				disableBackdropClick
				disableEscapeKeyDown
				onClose={handleClose}
				fullWidth={true}
				maxWidth="lg"
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">
					Attandance For {props.data.lecture}
				</DialogTitle>
				<DialogContent>
					<Table data={props.data.students} lecture={props.data.id} />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</span>
	);
}
