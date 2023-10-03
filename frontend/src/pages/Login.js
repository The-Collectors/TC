import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import backgroundImage from '../image/login.png';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';
import { useUser } from '../components/UserContext';
import { Title, TopDownDiv, TopLinkTitle, TClogo, BgDiv } from './CommonStyling';
import styled from 'styled-components';

const Login = () => {
	// Declare state variables for user input
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	// Declare state variable for error handling
	const [error, setError] = useState('');
	// Get setAuthData function from the AuthContext
	const { setAuthData } = useAuth();
	// Get setUser function from the UserContext
	const { setUser } = useUser();
	// Declare navigate function for routing
	const navigate = useNavigate();

	// Function to handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		//console.log('Email:', email, 'Password:', password);

		// Validate input fields
		if (!email || !password) {
			setError("Email and password fields are required");
			return;
		}

		// Send data to the server
		try {
			const response = await axios.post("http://localhost:8000/api/login", {
				email,
				password,
			}, {
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json'
				}
			});

			// Store user data and redirect to the main application page
			setAuthData({ isLoggedIn: true, data: response.data });
			//console.log(response.data);
			setUser({ email: email }); // Set the user's email
			navigate('/');

		} catch (error) {
			console.error("Error during login:", error);
			// Handle login error
			if (error.response && error.response.status === 400) {
				setError("Incorrect email or password");
			} else {
				setError("Login failed. Please try again.");
			}
		}
	};

	// Render the login form
	return (
		<LoginBg>
			<LoginHeader>
				<HeaderLink to="/">
					<TClogoL />
					<TopLinkTitle>THE COLLECTORS</TopLinkTitle>
				</HeaderLink>
			</LoginHeader>
			<TopDownDiv>
				<LoginTitle> SIGN<br/>IN </LoginTitle>
				<div className="login-container">
					{/* Display error message */}
					{error && <div className="error-message">{error}</div>}
					<form onSubmit={handleSubmit}>
						{/* Email input field */}
						<div className="input-group">
							<Label> E-Mail </Label>
							{/*<label htmlFor="email">Email</label>*/}
							<input
								type="email"
								id="email"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						{/* Password input field */}
						<div className="input-group">
							<Label> Password </Label>
							{/*<label htmlFor="password">Password</label>*/}
							<input
								type="password"
								id="password"
								name="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						<button type="submit">Log In</button>
					</form>
					{/* Link to the registration page */}
					<Link to="/Register">
						<button className="register-button">
							Register
						</button>
					</Link>
				</div>
			</TopDownDiv>
		</LoginBg>
	);
};

export default Login;

// >>styles are written here<<

const LoginTitle = styled(Title)`
	font-family: 'wordclock';
	line-height: 0.8;
`;

const Label = styled.label`
	font-family: 'kodeR';
	display: block;
	margin-bottom: 0.5em;
`;

const LoginHeader = styled.div`
	position: absolute;
	top: 15px;
	left: 15px;
	display: flex;
	flex-direction: row;
`;

const HeaderLink = styled(Link)`
	display: flex;
	flex-direction: row;
	align-items: center;
	text-decoration: none;
`;

const TClogoL = styled(TClogo)`
	margin-right: 15px;
`;

const LoginBg = styled(BgDiv)`
	background-image: url(${backgroundImage});
	align-items: center;
	display: flex;
	width: 100vw;
	height: 100vh;
`




