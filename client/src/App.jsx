import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import "./App.css";
function App() {
	return (
		<div>
			<Routes>
				<Route path="/dashboard/*" element={<Dashboard />}></Route>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/register" element={<Register />}></Route>
			</Routes>
		</div>
	);
}

export default App;
