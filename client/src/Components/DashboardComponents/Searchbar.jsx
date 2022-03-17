import React, { useState, useEffect } from "react";
import classes from "../../Styles/component-styles/searchbar.module.css";

import { UilSlidersVAlt } from "@iconscout/react-unicons";
import { UilSearch } from "@iconscout/react-unicons";
import axios from "axios";
import Question from "./Question";
import { convertDate } from "../../helper";
import SearchResults from "./SearchResults";
const tagNames = ["question", "tag", "username", "name"];
const api_endpoint = process.env.REACT_APP_API_ENDPOINT;
const activeStyle = {
	cardStyle: { height: "60vh", width: "100%" },
	body: { height: "35vh", width: "100%" },
	search: {
		zIndex: "250",
		background: "#fff",
	},
	dark: {
		opacity: "1",
		minHeight: "100vh",
	},
	opac: { opacity: "1", display: "block" },
};

const inactiveStyle = {
	cardStyle: { height: "18vh" },
	body: { display: "none" },
	search: { zIndex: "5", background: "#fcfcfc" },
	dark: { opacity: "0", minHeight: "100vh" },
	opac: { opacity: "0" },
};

const inactiveStyle2 = {
	cardStyle: { height: "18vh" },
	body: { display: "none" },
	search: { zIndex: "5", background: "#fcfcfc" },
	dark: { opacity: "1", minHeight: "0" },
	opac: { opacity: "1", display: "none" },
};

const Searchbar = () => {
	const [counter, setCounter] = useState(0);
	const [filterState, setFilterState] = useState(["TAG"]);
	const [searchText, setSearchText] = useState("");
	const [debouncedText, setDebouncedText] = useState("");
	const [active, setActive] = useState(false);
	const [style, setStyle] = useState(inactiveStyle2);

	const [questionResult, setQuestionResult] = useState([]);
	const [result, setResult] = useState([]);
	const changeTag = () => {
		setCounter((counter + 1) % tagNames.length);
	};

	useEffect(() => {
		setFilterState(tagNames[counter]);
	}, [counter]);

	useEffect(() => {
		async function fetchData() {
			let response = await axios.get(
				api_endpoint + `/search/${filterState}/${debouncedText}`,
				{
					withCredentials: true,
				}
			);
			setResult(response.data);
		}
		if (debouncedText !== "") {
			fetchData();
		}
	}, [debouncedText, filterState]);

	useEffect(() => {
		if (searchText !== "") setActive(true);
		else setActive(false);
		let timer = setTimeout(() => {
			setDebouncedText(searchText);
		}, 700);
		return () => {
			clearTimeout(timer);
		};
	}, [searchText]);

	useEffect(() => {
		let timeout;
		if (active === true) {
			setStyle(activeStyle);
			disableScroll();
		} else {
			enableScroll();
			setStyle(inactiveStyle);
			timeout = setTimeout(() => {
				setStyle(inactiveStyle2);
			}, 500);
		}
		return () => {
			clearTimeout(timeout);
		};
	}, [active]);

	function disableScroll() {
		let scrollTop =
			window.pageYOffset || document.documentElement.scrollTop;
		let scrollLeft =
			window.pageXOffset || document.documentElement.scrollLeft;
		window.onscroll = function () {
			window.scrollTo(scrollLeft, scrollTop);
		};
	}

	function enableScroll() {
		window.onscroll = function () {};
	}

	return (
		<>
			<div
				className={classes["dark"]}
				style={style.dark}
				onClick={() => setActive(false)}
			></div>
			<div className={classes["container"]} style={style.search}>
				<SearchResults
					type={filterState}
					result={result}
					style={style.opac}
					active={setActive}
				/>
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
		</>
	);
};

export default React.memo(Searchbar);
