import React, { useContext } from "react";
import LoginCard from "../Components/LoginComponents/LoginCard";
import { Navigate } from "react-router-dom";
import { userObjectContext } from "../Context";
import "../Styles/page-styles/login.css";

const Login = () => {
	const [user, isAuthenticated] = useContext(userObjectContext);
	if (isAuthenticated === false) {
		return (
			<div className="loginContainer fadeIn">
				<LoginCard page="login" heading="Login" />
			</div>
		);
	} else if (isAuthenticated === true) {
		return <Navigate to="/dashboard" />;
	} else {
		return null;
	}
};

export default Login;
