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
		console.log(process.env.REACT_APP_API_ENDPOINT);
	}, []);

	return (
		<div className="container">
			<Routes>
				<Route path="/test" element={<Login />}></Route>
			</Routes>
			<Sidebar user={user} />
		</div>
	);
};

export default Dashboard;
