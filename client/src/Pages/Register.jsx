import React from "react";
import LoginCard from "../Components/LoginComponents/LoginCard";
import "../Styles/page-styles/login.css";

const Register = () => {
	return (
		<div className="loginContainer fadeIn">
			<LoginCard page="register" heading="Register" />
		</div>
	);
};

export default Register;
