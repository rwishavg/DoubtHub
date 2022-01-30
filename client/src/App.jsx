import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import "./App.css";
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/dashboard" element={<Dashboard />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
