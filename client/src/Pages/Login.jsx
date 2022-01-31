import React from "react";
import "../Styles/page-styles/login.css";
import Card from "../Components/Card";
const Login = () => {
	let submit = () => {
		console.log("asd");
	};
	return (
		<div className="container">
			<Card width="40vw" heading="Login" onClick={submit}></Card>
		</div>
	);
};

export default Login;
