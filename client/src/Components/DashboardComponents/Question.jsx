import React, { useContext, useEffect, useState } from "react";
import classes from "../../Styles/component-styles/question.module.css";
import axios from "axios";
import Context, { userObjectContext } from "../../Context";
import options from "../../Assets/Icons/options.svg";
import like from "../../Assets/Icons/like.svg";
import comment from "../../Assets/Icons/comment.svg";
import { ReactComponent as EditSvg } from "../../Assets/Icons/edit.svg";
import { ReactComponent as DelSvg } from "../../Assets/Icons/delete.svg";
import { ReactComponent as RepSvg } from "../../Assets/Icons/report.svg";
import { ReactComponent as StarSvg } from "../../Assets/Icons/star.svg";

const api_endpoint = process.env.REACT_APP_API_ENDPOINT;
const activeStyle = {
	cardStyle: { maxHeight: "999vh" },
	maskStyle: {
		WebkitMaskImage: "none",
		maxHeight: "999vh",
	},
	moreText: "LESS",
};

const inactiveStyle = {
	cardStyle: { maxHeight: "35vh" },
	maskStyle: {
		WebkitMaskImage: "linear-gradient(180deg, #000 0%, transparent)",
		maxHeight: "7vh",
	},
	moreText: "MORE",
};

const smallDesc = {
	cardStyle: { maxHeight: "35vh" },
	maskStyle: {
		WebkitMaskImage: "none",
	},
	buttonDisplay: {
		display: "none",
	},
};

const optionActiveStyle = { display: "flex" };
const optionInactiveStyle = { display: "none" };

const Question = (props) => {
	const user = useContext(userObjectContext)[0];
	const [currentCard, setCurrentCard] = useState(false);
	const [styleState, setStyleState] = useState(inactiveStyle);
	const [optionState, setOptionState] = useState(false);
	const [optionStyle, setOptionStyle] = useState(optionInactiveStyle);
	const expandCard = () => {
		setCurrentCard(!currentCard);
	};

	useEffect(() => {
		if (props.description.length > 250) {
			if (currentCard === true) {
				setStyleState(activeStyle);
			} else {
				setStyleState(inactiveStyle);
			}
		} else {
			setStyleState(smallDesc);
		}
	}, [currentCard]);

	useEffect(() => {
		if (optionState === true) {
			setOptionStyle(optionActiveStyle);
		} else {
			setOptionStyle(optionInactiveStyle);
		}
	}, [optionState]);

	const deleteQuestion = () => {
		axios({
			method: "POST",
			data: {
				id: props.id,
			},
			withCredentials: true,
			url: api_endpoint + "/question/delete",
		}).then((response) => {
			props.updateData(response);
		});
	};

	const saveQuestion = () => {
		axios({
			method: "POST",
			data: {
				email: user.emailID,
				id: props.id,
			},
			withCredentials: true,
			url: api_endpoint + "/question/saveQuestion",
		}).then((response) => {});
	};

	return (
		<div
			className={`cardComponent ${classes.questionComponent}`}
			style={styleState.cardStyle}
		>
			<div className={classes["content"]}>
				<div className={classes["user"]}>
					<img
						src={props.userid.profileIMG}
						alt=""
						className={`${classes.userPhoto}`}
					/>
					<div className={`${classes.name}`}>
						{props.userid.firstName} {props.userid.lastName}
						<div className={classes["date"]}>{props.date}</div>
					</div>
				</div>
				<div className={classes["options"]}>
					<div className={classes["moreOptions"]} style={optionStyle}>
						<StarSvg
							style={{ stroke: "black" }}
							className={classes["blueClass"]}
							onClick={saveQuestion}
						/>
						{props.userid._id === user._id && (
							<>
								<EditSvg style={{ stroke: "black" }} />
								<DelSvg
									style={{ stroke: "black" }}
									className={classes["redClass"]}
									onClick={deleteQuestion}
								/>
							</>
						)}
						<RepSvg
							style={{ stroke: "black" }}
							className={classes["redClass"]}
						/>
					</div>
					<img
						src={options}
						alt=""
						onClick={(e) => setOptionState(!optionState)}
					/>
				</div>
				<div className={classes["questionHeading"]}>
					{props.heading}
				</div>
				<div
					className={classes["questionDescription"]}
					style={styleState.maskStyle}
				>
					{props.description}
				</div>
				<div
					className={`${classes.filterBg}`}
					onClick={expandCard}
					style={styleState.buttonDisplay}
				>
					VIEW {styleState.moreText}
				</div>

				<div className={classes["icons"]}>
					<div>213</div>
					<img src={like} alt="" />
					<div></div>
					<div></div>
					<div></div>
					<div>213</div>
					<img src={comment} alt="" />
				</div>
			</div>
		</div>
	);
};

export default React.memo(Question);
