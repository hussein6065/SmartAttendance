import React, { Component } from 'react';
import { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
// import Button from '@material-ui/core/Button';
import { Col, Card, CardBody } from 'reactstrap';
import Modal from '../../components/modals/modal';
import ModalM from '../../components/modals/scheduleM';

function Course(props) {
	const history = useHistory();

	const { data } = props;
	return (
		<Fragment>
			<Col md="6" lg="3">
				<Card className="mb-3" style={{ width: '300px' }}>
					<CardBody>
						<div
							style={{
								height: '150px',
								backgroundColor: '#06A3B7',
								padding: '5px',
								cursor: 'pointer',
							}}
							onClick={() => {
								localStorage.setItem('course', data.id);
								history.push('/Info/faculty');
							}}
						></div>
						<div>
							<h3 className="border border-info">
								<span
									style={{
										color: 'rgb(77, 61, 77)',
										lineHeight: '1.3',
										fontSize: '0.875rem',
										fontWeight: 'bold',
										padding: '5px',
										cursor: 'pointer',
									}}
								>
									{data.course}
								</span>
							</h3>
							<h4 className="border border-info">
								<span
									style={{
										color: 'rgb(77, 61, 77)',
										lineHeight: '1.0',
										fontSize: '0.715rem',
										fontWeight: 'bold',
										padding: '5px',
									}}
								>
									{data.faculty}
								</span>
							</h4>
						</div>
						<hr />
						<nav>
							{props.user === 'fi' && (
								<div className="mb-2">
									<ModalM info={data} />
								</div>
							)}
							<Modal
								info={data}
								user={props.user}
								title={props.user === 'fi' ? 'Start Lecture' : 'Join Lecture'}
							/>
						</nav>
					</CardBody>
				</Card>
			</Col>
		</Fragment>
	);
}
// class Course extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {};
// 	}
// 	render() {
// 		const { data } = this.props;
// 		console.log(data);
// 		return (
// 			<Col md="6" lg="3">
// 				<Card className="mb-3" style={{ width: '300px' }}>
// 					<CardBody>
// 						<div
// 							onClick={() => {
// 								// console.log('Hussein');
// 								const history = useHistory();
// 								history.push('/Info/faulty');
// 								console.log('Hussein');
// 							}}
// 							style={{
// 								height: '150px',
// 								backgroundColor: '#06A3B7',
// 								padding: '5px',
// 								cursor: 'pointer',
// 							}}
// 						>
// 							<div> Attandance: 15 / 20</div>
// 						</div>
// 						<div>
// 							<h3 className="border border-info">
// 								<span
// 									style={{
// 										color: 'rgb(77, 61, 77)',
// 										lineHeight: '1.3',
// 										fontSize: '0.875rem',
// 										fontWeight: 'bold',
// 										padding: '5px',
// 										cursor: 'pointer',
// 									}}
// 								>
// 									Computer Organization
// 								</span>
// 							</h3>
// 							<h4 className="border border-info">
// 								<span
// 									style={{
// 										color: 'rgb(77, 61, 77)',
// 										lineHeight: '1.0',
// 										fontSize: '0.715rem',
// 										fontWeight: 'bold',
// 										padding: '5px',
// 									}}
// 								>
// 									Francis Gatsi
// 								</span>
// 							</h4>
// 						</div>
// 						<hr />
// 						<span>{0 ? <Modal title={'Start Meeting'} /> : <ModalM />}</span>
// 					</CardBody>
// 				</Card>
// 			</Col>
// 		);
// 	}
// }

export default Course;

// import React, { Component } from 'react';
// // import Button from '@material-ui/core/Button';
// import { Col, Card, CardBody } from 'reactstrap';
// import Modal from '../../components/modals/modal';
// // import {
// // 	faBookOpen,
// // 	faBook,
// // 	faClock,
// // 	faCalendarDay,
// // } from '@fortawesome/free-solid-svg-icons';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// class Course extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {};
// 	}
// 	render() {
// 		const { data } = this.props;
// 		console.log(data);
// 		return (
// 			<Col md="6" lg="3">
// 				<Card className="mb-3" style={{ width: '300px' }}>
// 					<CardBody>
// 						<div
// 							onClick={() => {
// 								console.log('Hussein');
// 							}}
// 							style={{
// 								height: '150px',
// 								backgroundColor: '#06A3B7',
// 								padding: '5px',
// 								cursor: 'pointer',
// 							}}
// 						>
// 							<div> Attandance: 15 / 20</div>
// 						</div>
// 						<div>
// 							<h3 className="border border-info">
// 								<span
// 									style={{
// 										color: 'rgb(77, 61, 77)',
// 										lineHeight: '1.3',
// 										fontSize: '0.875rem',
// 										fontWeight: 'bold',
// 										padding: '5px',
// 										cursor: 'pointer',
// 									}}
// 								>
// 									Computer Organization
// 								</span>
// 							</h3>
// 							<h4 className="border border-info">
// 								<span
// 									style={{
// 										color: 'rgb(77, 61, 77)',
// 										lineHeight: '1.0',
// 										fontSize: '0.715rem',
// 										fontWeight: 'bold',
// 										padding: '5px',
// 									}}
// 								>
// 									Francis Gatsi
// 								</span>
// 							</h4>
// 						</div>
// 						<hr />
// 						<nav>
// 							<Modal />
// 						</nav>
// 					</CardBody>
// 				</Card>
// 			</Col>
// 		);
// 	}
// }

// export default Course;
