import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
const api_endpoint = process.env.REACT_APP_API_ENDPOINT;
export const userObjectContext = createContext({});
const Context = (props) => {
	const [userObject, setUserObject] = useState({});
	const [isAuthenticated, setIsAuthenticated] = useState(null);
	const [theme, setTheme] = useState("dark");
	const updateContext = () => {
		axios
			.get(api_endpoint + "/user/data", { withCredentials: true })
			.then((response) => {
				if (response.data) {
					setUserObject(response.data);
					setIsAuthenticated(true);
				} else {
					setIsAuthenticated(false);
				}
			});
	};
	useEffect(() => {
		updateContext();
	}, []);

	return (
		<userObjectContext.Provider
			value={[
				userObject,
				isAuthenticated,
				setUserObject,
				updateContext,
				setTheme,
				theme,
			]}
		>
			{props.children}
		</userObjectContext.Provider>
	);
};

export default Context;
