import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Webcam from 'react-webcam';

// import { faSchool } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function FormDialog(props) {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const webcamRef = React.useRef(null);
	const [imgSrc, setImgSrc] = React.useState(null);
	const capture = React.useCallback(() => {
		const imageScr = webcamRef.current.getScreenshot();
		setImgSrc(imageScr);
		localStorage.setItem('img', imageScr);
	}, [webcamRef, setImgSrc]);

	return (
		<span>
			<button
				className="btn btn-success btn-block"
				color="primary"
				onClick={handleClickOpen}
			>
				Take Facial Data
				{/* <FontAwesomeIcon icon={faSchool} /> */}
			</button>

			<Dialog
				open={open}
				disableBackdropClick
				disableEscapeKeyDown
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title"></DialogTitle>
				<DialogContent>
					{!imgSrc ? (
						<Webcam
							audio={false}
							ref={webcamRef}
							screenshotFormat="image/png"
							height={400}
							width={400}
						/>
					) : (
						<img src={imgSrc} alt="Facial ID" />
					)}
				</DialogContent>
				<button onClick={capture}>Capture Data</button>
				<button
					onClick={() => {
						alert(imgSrc);
						setImgSrc(null);
					}}
				>
					Recapture
				</button>
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
