import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import Webcam from 'react-webcam';

import { faSchool } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
			<button className="btn btn-info btn-block" onClick={handleClickOpen}>
				Schedule Lectures
			</button>
			<Dialog
				open={open}
				disableBackdropClick
				disableEscapeKeyDown
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">
					Attandance of Computer Organzation
				</DialogTitle>
				<DialogContent>
					Lecturer: Francis Gatsi
					<br />
					Intern: Nana Ama
					<br />
					Lecture title: <input type="text" name="" id="" />
					<br />
					Date: <input type="date" name="date" id="date" />
					<br />
					Time: <input type="time" name="time" id="time" />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleClose} color="primary">
						Schedule Lecture
					</Button>
				</DialogActions>
			</Dialog>
		</span>
	);
}
