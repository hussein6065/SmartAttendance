import React from 'react';
import { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
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

export default Course;
