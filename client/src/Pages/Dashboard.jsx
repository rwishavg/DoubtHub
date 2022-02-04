import React, { useEffect, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Login from "./Login";
import Sidebar from "../Components/DashboardComponents/Sidebar";
import "../Styles/page-styles/dashboard.css";
import { userObjectContext } from "../Context";
const Dashboard = () => {
	const [user, isAuthenticated] = useContext(userObjectContext);
	if (isAuthenticated === true) {
		return (
			<div className="container">
				<Sidebar />
				<Routes>
					<Route path="/test" element={<Login />}></Route>
				</Routes>
			</div>
		);
	}
	// else if (isAuthenticated === false) {
	// 	return <Navigate to="/login" />;
	// }
	else {
		return <Navigate to="/login" />;
	}
};

export default Dashboard;
