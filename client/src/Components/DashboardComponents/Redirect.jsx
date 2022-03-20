import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
const Redirect = () => {
	const navigate = useNavigate();
	useEffect(() => {
		navigate(`./1`);
	}, []);

	return <div>Redirect</div>;
};

export default Redirect;
