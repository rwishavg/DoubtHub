import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const LoginButtons = (props) => {
	const [toRegister, setRegister] = useState(false);
	const [host, setHost] = useState("");
	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			setHost("http://localhost:8000");
		}
	});

	if (toRegister === true) {
		return <Navigate to="/register" />;
	}

	const orStyle = {
		textAlign: "center",
		width: "100%",
		margin: "18px 0",
		fontWeight: "700",
	};

	const signInWithGoogle = () => {};

	return (
		<div className="buttons">
			<button
				type="button"
				className="button"
				onClick={props.submitLogin}
			>
				Log In
			</button>
			<button
				type="button"
				className="button"
				onClick={() => setRegister(true)}
			>
				Register
			</button>
			<div style={orStyle}>OR</div>

			<a
				href={host + "/user/auth/google"}
				className="button button-full"
				onClick={signInWithGoogle}
			>
				Sign In With google
			</a>
		</div>
	);
};

export default LoginButtons;
