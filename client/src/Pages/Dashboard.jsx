import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "../Components/DashboardComponents/Profile";
import AllQuestions from "../Components/DashboardComponents/AllQuestions";
import Sidebar from "../Components/DashboardComponents/Sidebar";
import Searchbar from "../Components/DashboardComponents/Searchbar";
import "../Styles/page-styles/dashboard.css";
import { userObjectContext } from "../Context";
const Dashboard = () => {
	// const createQuestion = () => {};
	const isAuthenticated = useContext(userObjectContext)[1];
	if (isAuthenticated === true) {
		return (
			<div className="container">
				<Sidebar />
				<Searchbar />
				<div className="centerContent">
					<Routes>
						<Route
							exact
							path="/"
							element={<AllQuestions />}
						></Route>
						<Route
							exact
							path="/profile"
							element={<Profile />}
						></Route>
					</Routes>
				</div>
			</div>
		);
	} else if (isAuthenticated === false) {
		return <Navigate to="/login" />;
	} else {
		return null;
	}
};

export default Dashboard;
