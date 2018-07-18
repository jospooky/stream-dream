import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Modal from '../Modal/Modal';
import InputGroupBody, {
	InputGroupAppend,
	InputGroupInput
} from '../../styled/Input/InputGroup';

const LogoText = styled.h2`
	padding-top: 35px;

	width: 150px;

	font-size: 24px;
	font-weight: 500;
	color: #191b21;

	text-align: center;

	border-bottom: 1px #191b21 solid;

	padding-bottom: 10px;

	margin-bottom: 15px;
`;

const FormBody = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;
`;

const SubmitButton = styled.button`
	background: #1a4fa5;
	border: 1px #1a4fa5 solid;
	color: #ecede8;

	margin-top: 15px;

	border-radius: 15px;

	width: 100px;
	height: 35px;
`;

class LoginForm extends Component {
	constructor() {
		super();

		this.state = {
			email: '',
			password: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.submit = this.submit.bind(this);
	}

	handleChange(e) {
		const newState = {};
		newState[e.target.name] = e.target.value;

		this.setState(newState);
	}

	submit() {
		axios
			.post(`${process.env.REACT_APP_API_LOCATION}auth/login`, this.state)
			.then(res => {
				if (res.response) {
					console.log(res);
				}
			});
	}

	render() {
		return (
			<FormBody>
				<LogoText>Login</LogoText>

				<InputGroupBody>
					<InputGroupAppend>
						<p>Email</p>
					</InputGroupAppend>

					<InputGroupInput>
						<input
							type="text"
							name="email"
							placeholder="Email"
							onChange={this.handleChange}
							value={this.state.email}
						/>
					</InputGroupInput>
				</InputGroupBody>

				<InputGroupBody>
					<InputGroupAppend>
						<p>Password</p>
					</InputGroupAppend>

					<InputGroupInput>
						<input
							type="password"
							name="password"
							onChange={this.handleChange}
							value={this.state.password}
						/>
					</InputGroupInput>
				</InputGroupBody>

				<SubmitButton onClick={this.submit}>Submit</SubmitButton>
			</FormBody>
		);
	}
}

export default Modal(LoginForm);