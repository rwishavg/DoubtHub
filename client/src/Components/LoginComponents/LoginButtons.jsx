import React, { useState } from "react";
import { Navigate } from "react-router-dom";
const api_endpoint = process.env.REACT_APP_API_ENDPOINT;

const LoginButtons = (props) => {
	const [toRegister, setRegister] = useState(false);

	if (toRegister === true) {
		return <Navigate to="/register" />;
	}
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
			<div className="orStyle">OR</div>

			<a
				href={api_endpoint + "/user/auth/google"}
				className="button button-full"
				onClick={signInWithGoogle}
			>
				Sign In With google
			</a>
		</div>
	);
};

export default React.memo(LoginButtons);
