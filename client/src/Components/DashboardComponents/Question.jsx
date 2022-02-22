import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "../../Styles/component-styles/question.module.css";
import Context, { userObjectContext } from "../../Context";
import options from "../../Assets/Icons/options.svg";
import like from "../../Assets/Icons/like.svg";
import comment from "../../Assets/Icons/comment.svg";
import QuestionUser from "../QuestionComponents/QuestionUser";
import { ReactComponent as EditSvg } from "../../Assets/Icons/edit.svg";
import { ReactComponent as DelSvg } from "../../Assets/Icons/delete.svg";
import { ReactComponent as RepSvg } from "../../Assets/Icons/report.svg";
import { ReactComponent as StarSvg } from "../../Assets/Icons/star.svg";
import DeletedQuestion from "./DeletedQuestion";
import axios from "axios";
import {
	activeStyle,
	inactiveStyle,
	smallDesc,
	optionActiveStyle,
	optionInactiveStyle,
} from "../QuestionComponents/StyleStates";
const api_endpoint = process.env.REACT_APP_API_ENDPOINT;

const Question = (props) => {
	const user = useContext(userObjectContext)[0];
	const [currentCard, setCurrentCard] = useState(false);
	const [styleState, setStyleState] = useState(inactiveStyle);
	const [optionState, setOptionState] = useState(false);
	const [optionStyle, setOptionStyle] = useState(optionInactiveStyle);
	const expandCard = () => setCurrentCard(!currentCard);
	const navigate = useNavigate();
	let defaultOptions = props.remOptions;
	if (defaultOptions === undefined) defaultOptions = true;
	useEffect(() => {
		if (props.description.length > 250)
			if (currentCard === true) setStyleState(activeStyle);
			else setStyleState(inactiveStyle);
		else setStyleState(smallDesc);
		// console.log(props);
	}, [currentCard]);

	useEffect(() => {
		if (optionState === true) setOptionStyle(optionActiveStyle);
		else setOptionStyle(optionInactiveStyle);
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
			props.updateData();
		});
		if (props.page === "QuesPage") {
			navigate("../../Dashboard", { replace: true });
		}
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
		}).then((response) => {
			alert("Question " + response.data + " in bookmarks");
			props.updateData();
		});
	};

	if (props.exists === false) {
		return (
			<DeletedQuestion
				optionState={optionState}
				optionStyle={optionStyle}
				updateData={props.updateData}
				setOptionState={setOptionState}
				saveQuestion={saveQuestion}
			/>
		);
	} else {
		return (
			<div
				className={`cardComponent ${classes.questionComponent}`}
				style={styleState.cardStyle}
			>
				<div className={classes["content"]}>
					<QuestionUser
						firstName={props.userid.firstName}
						lastName={props.userid.lastName}
						profileIMG={props.userid.profileIMG}
						date={props.date}
						username={props.userid.username}
					/>
					<div className={classes["options"]}>
						<div
							className={classes["moreOptions"]}
							style={optionStyle}
						>
							<StarSvg
								style={{ stroke: "black" }}
								className={classes["blueClass"]}
								onClick={saveQuestion}
							/>
							{props.userid._id === user._id && defaultOptions && (
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
						<Link to={`/dashboard/${props.questionID}`}>
							<img src={comment} alt="" />
						</Link>
					</div>
				</div>
			</div>
		);
	}
};

export default React.memo(Question);
