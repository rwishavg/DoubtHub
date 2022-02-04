import React, { useState } from "react";
import FormInput from "../LoginComponents/FormInput";
import LoginButtons from "./LoginButtons";
import "../../Styles/page-styles/login.css";
import mailIcon from "../../Assets/Icons/mail.svg";
import eye from "../../Assets/Icons/eye.svg";
import axios from "axios";

const api_endpoint = process.env.REACT_APP_API_ENDPOINT;

const LoginCard = (props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rePassword, setRePassword] = useState("");

	const submitLogin = () => {
		axios.post(api_endpoint + "/user/auth/local", { username: email, password: password })
			.then((response) => console.log(response));
	}
	
	const submitSignUp = () => {
		if (password === rePassword && password!=="") {
			axios.post(api_endpoint + "/user/signup", { username: email, password: password})
				.then((response) => console.log(response));
		}
		else {
			alert("Password mismatch");
		}
	}

	return (
		<div className="cardComponent loginComponent">
			<form className="form" action="">
				<div className="heading">{props.heading}</div>
				<FormInput
					icon={mailIcon}
					heading="Email"
					type="text"
					placeholder="Enter Email"
					update={setEmail}
				/>
				<FormInput
					icon={eye}
					heading="Password"
					type="password"
					placeholder="Enter Password"
					update={setPassword}
				/>

				{props.page === "login" ? (
					<LoginButtons submit={submitLogin} />
				) : (
					<div className="centerSignUp">
						<FormInput
							icon={eye}
							heading="Re-enter Password"
							type="password"
							placeholder="Re-enter Password"
							update={setRePassword}
						/>

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
