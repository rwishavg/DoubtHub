import React, { useState, useEffect } from "react";
import classes from "../../Styles/component-styles/searchbar.module.css";

import { UilSlidersVAlt } from "@iconscout/react-unicons";
import { UilSearch } from "@iconscout/react-unicons";
import axios from "axios";
import Question from "./Question";
import { convertDate } from "../../helper";
const tagNames = ["question", "tag", "username", "name"];
const api_endpoint = process.env.REACT_APP_API_ENDPOINT;
const activeStyle = {
	cardStyle: { height: "60vh", width: "100%" },
	body: { height: "35vh", width: "100%" },
	search: { zIndex: "250", background: "transparent" },
	dark: {
		opacity: "0.8",
		minHeight: "100vh",
	},
	opac: { opacity: "1", display: "block" },
};

const inactiveStyle = {
	cardStyle: { height: "18vh" },
	body: { display: "none" },
	search: { zIndex: "5", background: "#fcfcfc" },
	dark: { opacity: "0", minHeight: "1vh" },
	opac: { opacity: "1" },
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
				setQuestionResult(response.data);
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
		} else {
			setStyle(inactiveStyle);

			timeout = setTimeout(() => {
				setStyle(inactiveStyle2);
			}, 500);
		}

		return () => {
			clearTimeout(timeout);
		};
	}, [active]);

	return (
		<>
			<div className={classes["dark"]} style={style.dark}></div>
			<div className={classes["container"]} style={style.search}>
				<div className={classes["resultContainer"]}>
					<div
						className={`centerContent ${classes.result}`}
						style={style.opac}
					>
						{questionResult.length > 0 &&
							(filterState === "question" ||
								filterState === "all") && (
								<>
									{questionResult.map((question) => (
										<Question
											key={question._id}
											// updateData={props.getData}
											question={question}
											date={convertDate(
												question.createdAt
											)}
										/>
									))}
								</>
							)}
					</div>
				</div>

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
