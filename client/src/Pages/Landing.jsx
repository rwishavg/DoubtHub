import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Assets/DoubtHub Logo.png";
import "../Styles/page-styles/landing.css";
const Landing = () => {
	return (
		<div className="landingContainer">
			<div className="logoLanding">
				<img src={Logo} alt="" />
			</div>
			<div className="loginSign">
				<Link to="/login" className="button">
					Login
				</Link>
				<Link to="/register" className="button">
					Sign Up
				</Link>
			</div>
		</div>
	);
};

export default Landing;
