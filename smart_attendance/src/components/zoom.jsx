import React, { useState } from 'react';
import { ZoomMtg } from '@zoomus/websdk';

class Zooom {
	constructor(props) {
		this.signatureEndpoint = 'http://localhost:4000';
		this.apiKey = 'co14GPT_T32hKQSA8b8jDQ';
		this.meetingNumber = 123456789;
		this.role = 0;
		this.leaveUrl = 'http://localhost:9999';
		this.userName = 'WebSDK';
		this.userEmail = '';
		this.passWord = '';
		this.API_Secret = 'G4QeyI2M0jC4xdTYrwPnazkgTtntT0AKdNXo';
		this.JWT_Token =
			'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJxY01pU2VQOVRCZUNHWWNZMFlsYV9RIn0.rnYUyqdO-eouedj5UugMI-jNyJB1_9f7Ag5FuBoc80Q';
	}
	connect() {
		ZoomMtg.init({
			leaveUrl: this.leaveUrl,
			isSupportAV: true,
			success: (success) => {
				console.log(success);

				ZoomMtg.join({
					signature: this.signature,
					
					meetingNumber: this.meetingNumber,
					userName: this.userName,
					apiKey: this.apiKey,
					userEmail: this.userEmail,
					passWord: this.passWord,
					success: (success) => {
						console.log(success);
					},
					error: (error) => {
						console.log(error);
					},
				});
			},
			error: (error) => {
				console.log(error);
			},
		});
	}
}
export default Zooom;
