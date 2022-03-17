import React from "react";
import QuestionUser from "../QuestionComponents/QuestionUser";
import classes from "../../Styles/component-styles/result.module.css";
import { shorten } from "../../helper";
import { Link, useNavigate } from "react-router-dom";
const Result = (props) => {
	const navigate = useNavigate();
	console.log(props.type);
	if (props.type === "question") {
		let shortDesc = shorten(props.result.description, 50);
		let shortHeading = shorten(props.result.heading, 40);
		return (
			<div
				className={`cardComponent ${classes["smallQuestion"]}`}
				onClick={() => {
					navigate(`../../Dashboard/q/${props.result.questionID}`, {
						replace: true,
					});
					props.active(false);
				}}
			>
				<div className={classes["content"]}>
					<div>
						<div className={classes["heading"]}>{shortHeading}</div>
						<div className={classes["description"]}>
							{shortDesc}
						</div>
					</div>
					<QuestionUser
						firstName={props.result.userid.firstName}
						// lastName={props.question.userid.lastName}
						profileIMG={props.result.userid.profileIMG}
						date={props.date}
						username={props.result.userid.username}
						reverse={true}
					/>
				</div>
			</div>
		);
	}

	if (props.type === "name") {
		console.log(props.result);
		return (
			<div
				className={`cardComponent ${classes["smallTile"]}`}
				onClick={() => {
					navigate(`../../Dashboard/u/${props.result.username}`, {
						replace: true,
					});
					props.active(false);
				}}
			>
				<div className={classes["content"]}>
					<QuestionUser
						firstName={props.result.firstName}
						lastName={props.result.lastName}
						profileIMG={props.result.profileIMG}
						username={props.result.username}
					/>
				</div>
			</div>
		);
	}

	if (props.type === "username") {
		return <div></div>;
	}
	if (props.type === "tag") {
		return <div></div>;
	}
};

export default Result;
