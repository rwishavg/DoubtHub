import React, { useContext, useEffect, useState } from "react";
import classes from "../../Styles/component-styles/question.module.css";

import { Link, useNavigate } from "react-router-dom";
import { userObjectContext } from "../../Context";

import QuestionUser from "../QuestionComponents/QuestionUser";

import { UilThumbsUp } from "@iconscout/react-unicons";
import { UilCommentAltLines } from "@iconscout/react-unicons";
import { UilPen } from "@iconscout/react-unicons";
import { UilFavorite } from "@iconscout/react-unicons";
import { UilBan } from "@iconscout/react-unicons";
import { UilTrashAlt } from "@iconscout/react-unicons";
import { UilEllipsisV } from "@iconscout/react-unicons";
import { toast } from "https://cdn.skypack.dev/wc-toast";

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
	const [likeCount, setLikeCount] = useState(props.question.likes.length);
	const [commentCount, setCommentCount] = useState(
		props.question.comments.length
	);

	const expandCard = () => setCurrentCard(!currentCard);
	const navigate = useNavigate();
	let defaultOptions = props.remOptions;
	if (defaultOptions === undefined) defaultOptions = true;
	useEffect(() => {
		if (props.question.description.length > 250)
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
				id: props.question._id,
			},
			withCredentials: true,
			url: api_endpoint + "/question/delete",
		}).then((response) => {
			toast.success("Question Deleted");
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
				id: props.question._id,
			},
			withCredentials: true,
			url: api_endpoint + "/question/saveQuestion",
		}).then((response) => {
			if (response.data === "Added")
				toast.success("Question " + response.data + " to bookmarks");
			else toast.success("Question " + response.data + " from bookmarks");
			props.updateData();
		});

		setOptionStyle(optionInactiveStyle);
	};

	const likeQuestion = () => {
		axios({
			method: "POST",
			data: {
				userID: user._id,
				questionID: props.question._id,
			},
			withCredentials: true,
			url: api_endpoint + "/question/likeQuestion",
		}).then((response) => {
			setLikeCount(response.data.count);
			if (response.data.message === "Liked")
				toast.success("Question " + response.data.message);
			else toast.success("Question " + response.data.message);
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
						firstName={props.question.userid.firstName}
						lastName={props.question.userid.lastName}
						profileIMG={props.question.userid.profileIMG}
						date={props.date}
						username={props.question.userid.username}
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
							{props.question.userid._id === user._id &&
								defaultOptions && (
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
						{props.question.heading}
					</div>
					<div
						className={classes["questionDescription"]}
						style={styleState.maskStyle}
					>
						{props.question.description}
					</div>
					<div
						className={`${classes.filterBg}`}
						onClick={expandCard}
						style={styleState.buttonDisplay}
					>
						VIEW {styleState.moreText}
					</div>

					<div className={classes["icons"]}>
						<div>{likeCount}</div>
						<UilThumbsUp
							onClick={likeQuestion}
							style={{ cursor: "pointer" }}
						/>
						<div></div>
						<div></div>
						<div></div>
						<div>{commentCount}</div>
						<Link
							to={`/dashboard/${props.question.questionID}`}
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
