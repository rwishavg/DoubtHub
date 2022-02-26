import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "../../Styles/component-styles/question.module.css";
import Context, { userObjectContext } from "../../Context";
import QuestionUser from "../QuestionComponents/QuestionUser";

import { UilThumbsUp } from "@iconscout/react-unicons";
import { UilCommentAltLines } from "@iconscout/react-unicons";
import { UilPen } from "@iconscout/react-unicons";
import { UilFavorite } from "@iconscout/react-unicons";
import { UilBan } from "@iconscout/react-unicons";
import { UilTrashAlt } from "@iconscout/react-unicons";
import { UilEllipsisV } from "@iconscout/react-unicons";

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
		setOptionStyle(optionInactiveStyle);
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
		setOptionStyle(optionInactiveStyle);
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
							<UilFavorite
								onClick={(e) => saveQuestion()}
								className={classes["blueClass"]}
							/>
							{props.userid._id === user._id && defaultOptions && (
								<>
									<UilPen />
									<UilTrashAlt
										onClick={deleteQuestion}
										className={classes["redClass"]}
									/>
								</>
							)}
							<UilBan className={classes["redClass"]} />
						</div>
						<UilEllipsisV
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
						<UilThumbsUp />
						<div></div>
						<div></div>
						<div></div>
						<div>213</div>
						<Link
							to={`/dashboard/${props.questionID}`}
							className="removeWid"
						>
							<UilCommentAltLines />
						</Link>
					</div>
				</div>
			</div>
		);
	}
};

export default React.memo(Question);
