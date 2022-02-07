import React,{ useState, useEffect } from "react";
import classes from "../../Styles/component-styles/searchbar.module.css";
import search from "../../Assets/Icons/search.svg";
import filter from "../../Assets/Icons/filter.svg";

const tagNames = ["TAG", "USERNAME", "FULL NAME", "QUESTION"];

const Searchbar = () => {
	const [counter, setCounter] = useState(0);
	const [filterState, setFilterState] = useState(["TAG"]);
	
	const changeTag = () => {
		setCounter((counter + 1)%tagNames.length);
	}

	useEffect(() => {
		setFilterState (tagNames[counter]);
	}, [counter]);
	
	return (
		<div className={`cardComponent ${classes.searchComponent}`}>
			<div className={`${classes.background}`}>
				<img src={search} alt="" className={classes["searchIcon"]} />
				{/* Name: */}<div className={classes["searchTag"]}>{filterState}</div>
				<input type="text" className={classes["searchInput"]} />
			</div>
			<div className={`${classes.filterBg}`} onClick={changeTag}>
				<img src={filter} alt="" className={classes["filterIcon"]} />
			</div>
		</div>
	);
};

export default Searchbar;
