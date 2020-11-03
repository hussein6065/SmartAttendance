import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Webcam from 'react-webcam';
import Zoom from './zoom';

import { faSchool } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const zoom = new Zoom();

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
			<Button
				className="badge badge-primary"
				color="primary"
				onClick={handleClickOpen}
			>
				<FontAwesomeIcon icon={faSchool} />
			</Button>
			<Dialog
				open={open}
				disableBackdropClick
				disableEscapeKeyDown
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title"></DialogTitle>
				<DialogContent>
					<Button onClick={zoom.connect()}>Zoom</Button>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleClose} color="primary">
						Update
					</Button>
				</DialogActions>
			</Dialog>
		</span>
	);
}
