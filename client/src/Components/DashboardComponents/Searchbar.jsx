import React from "react";
import classes from "../../Styles/component-styles/searchbar.module.css";
import search from "../../Assets/Icons/search.svg";
import filter from "../../Assets/Icons/filter.svg";
const Searchbar = () => {
	return (
		<div className={`cardComponent ${classes.searchComponent}`}>
			<div className={`${classes.background}`}>
				<img src={search} alt="" className={classes["searchIcon"]} />
				{/* Name: */}
				<input type="text" className={classes["searchInput"]} />
			</div>
			<div className={`${classes.filterBg}`}>
				<img src={filter} alt="" className={classes["filterIcon"]} />
			</div>
		</div>
	);
};

export default Searchbar;
