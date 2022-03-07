import React, { useState, useEffect } from "react";
import classes from "../../Styles/component-styles/searchbar.module.css";

import { UilSlidersVAlt } from "@iconscout/react-unicons";
import { UilSearch } from "@iconscout/react-unicons";

const tagNames = ["ALL", "TAG", "USERNAME", "NAME", "QUESTION"];

const Searchbar = () => {
	const [counter, setCounter] = useState(0);
	const [filterState, setFilterState] = useState(["TAG"]);
	const [searchText, setSearchText] = useState("");
	const changeTag = () => {
		setCounter((counter + 1) % tagNames.length);
	};

	useEffect(() => {
		setFilterState(tagNames[counter]);
	}, [counter]);

	return (
		<div className={classes["container"]}>
			<div className={`cardComponent ${classes.searchComponent}`}>
				<div className={`${classes.background}`}>
					<div className={classes["searchTag"]}>
						<UilSearch
							className={classes["searchIcon"]}
							color="#fff	"
						/>
						{filterState}
					</div>

					<input
						type="text"
						className={classes["searchInput"]}
						onChange={(e) => setSearchText(e.target.value)}
					/>
				</div>
				<div className={`${classes.filterBg}`} onClick={changeTag}>
					<UilSlidersVAlt
						className={classes["filterIcon"]}
						color="#602eeac2"
					/>
				</div>
			</div>
		</div>
	);
};

export default React.memo(Searchbar);
