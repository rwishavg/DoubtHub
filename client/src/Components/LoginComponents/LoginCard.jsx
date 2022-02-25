import React, { useEffect, useState } from "react";
import Input from "../DashboardComponents/Input";
import LoginButtons from "./LoginButtons";
import "../../Styles/page-styles/login.css";
import axios from "axios";
import validator from "validator";

import { UilEnvelope } from '@iconscout/react-unicons'
import { UilEyeSlash } from '@iconscout/react-unicons'

const api_endpoint = process.env.REACT_APP_API_ENDPOINT;

const LoginCard = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rePassword, setRePassword] = useState("");
	const [localAuth, setLocalAuth] = useState(null);
	const [localSignUp, setLocalSignUp] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const submitLogin = () => {
		var validateEmail = email;
		if (validator.isEmail(validateEmail)) {
			axios({
				method: "POST",
				data: {
					username: email,
					password: password,
				},
				withCredentials: true,
				url: api_endpoint + "/user/auth/local",
			}).then((response) => setLocalAuth(response.data));
		} else {
			setErrorMessage("Enter valid Email!");
		}
	};

	const submitSignUp = () => {
		var validateEmail = email;
		if (validator.isEmail(validateEmail)) {
			if (password === rePassword && password !== "") {
				axios
					.post(api_endpoint + "/user/signup", {
						username: email,
						password: password,
					})
					.then((response) => setLocalSignUp(response.data));
				console.log("axios");
			} else {
				setErrorMessage("Password Mismatch!");
			}
		} else {
			setErrorMessage("Enter valid Email!");
		}
	};

	useEffect(() => {
		console.log(localSignUp);
		if (localSignUp === "New User Created") {
			window.open("/login", "_self");
		} else if (localSignUp === "User Already Exists") {
			setErrorMessage("User Already Exists");
		} else {
		}
	}, [localSignUp]);

	useEffect(() => {
		if (localAuth === true) {
			window.open("/dashboard", "_self");
		} else if (localAuth === false) {
			setErrorMessage("Incorrect Credentials");
			setPassword("");
		} else {
		}
	}, [localAuth]);

	return (
		<div className="cardComponent loginComponent">
			<form className="form" action="">
				<div className="heading">
					{props.heading}
					<span className="errorMessage">{errorMessage}</span>
				</div>
				<Input
					heading="Email"
					type="email"
					placeholder="Enter Email"
					update={setEmail}
				>
					<UilEnvelope />
				</Input>

				<Input
					heading="Password"
					type="password"
					placeholder="Enter Password"
					update={setPassword}
				>
					<UilEyeSlash/>
				</Input>

				{props.page === "login" ? (
					<LoginButtons submit={submitLogin} />
				) : (
					<div className="centerSignUp">
						<Input
							heading="Re-enter Password"
							type="password"
							placeholder="Re-enter Password"
							update={setRePassword}
						>
							<UilEyeSlash/>		
						</Input>

						<button
							type="button"
							className="button"
							onClick={submitSignUp}
						>
							Sign Up
						</button>
					</div>
				)}
			</form>
		</div>
	);
};

export default LoginCard;
