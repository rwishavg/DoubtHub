import React, { useEffect, useState, useContext } from "react";
import "../../Styles/Dark.css";
import { UilSun } from "@iconscout/react-unicons";
import { UilMoon } from "@iconscout/react-unicons";
import { userObjectContext } from "../../Context";

const DarkMode = () => {
	const data = useContext(userObjectContext);
	const updateTheme = data[4];
	let theme = data[5];
	document.documentElement.setAttribute("data-theme", localStorage.getItem("theme"));
	localStorage.setItem("theme", theme);

	if (theme === "") {
		theme = "light";
	}

	const setDark = () => {
		updateTheme("dark");
		localStorage.setItem("theme", "dark");
		document.documentElement.setAttribute("data-theme", "dark");
	};

	const setLight = () => {
		updateTheme("light");
		localStorage.setItem("theme", "light");
		document.documentElement.setAttribute("data-theme", "light");
	};

	//1 for dark, 0 for light
	const [def, setDef] = useState(localStorage.getItem("theme") === "light" ? 0 : 1);

	const toggleTheme = (e) => {
		console.log("def", def);
		if (def === 1) {
			setLight();
			updateTheme("light");
		} else {
			setDark();
			updateTheme("dark");
		}
	};

	useEffect(() => {
		if (theme === "dark") setDef(1);
		else setDef(0);
	}, [theme]);

	return (
		<div className="toggle-theme-wrapper">
			<span>
				<UilSun color="#A0A3BD" />
			</span>
			<label className="toggle-theme" htmlFor="checkbox">
				<input
					type="checkbox"
					id="checkbox"
					onChange={toggleTheme}
					defaultChecked={def}
				/>
				<div className="slider round"></div>
			</label>
			<span>
				<UilMoon color="#A0A3BD" />
			</span>
		</div>
	);
};

export default DarkMode;
