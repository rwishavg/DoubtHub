import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Login from "./Login";
import Sidebar from "../Components/DashboardComponents/Sidebar";
import "../Styles/page-styles/dashboard.css";

const api_endpoint = process.env.REACT_APP_API_ENDPOINT;

const Dashboard = () => {
	const [user, setUser] = useState({});
	useEffect(() => {
		axios
			.get(api_endpoint + "/user/data", { withCredentials: true })
			.then((response) => setUser(response.data));
	}, []);

	return (
		<div className="container">
			<Sidebar user={user} />
			<div className="dashContainer">
				<Routes>
					<Route path="/trending" element={<Login />}></Route>
					<Route path="/trending" element={<Login />}></Route>
				</Routes>
			</div>
		</div>
	);
};

export default Dashboard;
