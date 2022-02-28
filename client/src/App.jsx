import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Landing from "./Pages/Landing";
import "./App.css";
function App() {
	return (
		<BrowserRouter>
			<wc-toast position="top-right"></wc-toast>
			<Routes>
				<Route path="/" element={<Landing />}></Route>
				<Route path="/dashboard/*" element={<Dashboard />}></Route>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/register" element={<Register />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
