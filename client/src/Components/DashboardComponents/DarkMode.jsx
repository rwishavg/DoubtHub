import React, { useEffect, useState, useContext } from "react";
import "../../Styles/Dark.css";
import { UilSun } from "@iconscout/react-unicons";
import { UilMoon } from "@iconscout/react-unicons";
import { userObjectContext } from "../../Context";
const setDark = () => {
	localStorage.setItem("theme", "dark");
	document.documentElement.setAttribute("data-theme", "dark");
};

const setLight = () => {
	localStorage.setItem("theme", "light");
	document.documentElement.setAttribute("data-theme", "light");
};

const storedTheme = localStorage.getItem("theme");

const prefersDark =
	window.matchMedia &&
	window.matchMedia("(prefers-color-scheme: dark)").matches;

const defaultDark =
	storedTheme === "dark" || (storedTheme === null && prefersDark);

if (defaultDark) {
	setDark();
}

const DarkMode = () => {
	const data = useContext(userObjectContext);
	const updateTheme = data[4];
	const [def, setDef] = useState(defaultDark);
	const toggleTheme = (e) => {
		if (def === 0) {
			setDark();
			updateTheme("dark");
		} else {
			setLight();
			updateTheme("light");
		}
	};

	useEffect(() => {
		if (data[5] === "light") setDef(0);
		else setDef(1);
	}, [data[5]]);

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
