import React, { useEffect, useState, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "../Components/DashboardComponents/Profile";
import AllQuestions from "../Components/DashboardComponents/AllQuestions";
import MyQuestions from "../Components/DashboardComponents/MyQuestions";
import Sidebar from "../Components/DashboardComponents/Sidebar";
import Searchbar from "../Components/DashboardComponents/Searchbar";
import "../Styles/page-styles/dashboard.css";
import { userObjectContext } from "../Context";
import axios from "axios";
const api_endpoint = process.env.REACT_APP_API_ENDPOINT;
const Dashboard = () => {
	// const createQuestion = () => {};
	const [questionData, setQuestionData] = useState([]);
	const getData = () => {
		axios
			.get(api_endpoint + "/question/getQuestions", {
				withCredentials: true,
			})
			.then((response) => {
				// console.log(response);
				setQuestionData(response.data);
			});
	};
	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		console.log(questionData);
	}, [questionData]);

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
							element={
								<AllQuestions
									data={questionData}
									getData={getData}
								/>
							}
						></Route>
						<Route
							exact
							path="/myQuestions"
							element={
								<MyQuestions
									data={questionData}
									getData={getData}
								/>
							}
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
