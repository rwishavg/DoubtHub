import React from "react";
import QuestionUser from "../QuestionComponents/QuestionUser";
import classes from "../../Styles/component-styles/result.module.css";
import { shorten } from "../../helper";
import { Link, useNavigate } from "react-router-dom";
const Result = (props) => {
	const navigate = useNavigate();

	let shortDesc = shorten(props.question.description, 50);
	let shortHeading = shorten(props.question.heading, 40);
	return (
		<div
			className={`cardComponent ${classes["smallQuestion"]}`}
			onClick={() => {
				navigate(`../../Dashboard/q/${props.question.questionID}`, {
					replace: true,
				});
				props.active(false);
			}}
		>
			<div className={classes["content"]}>
				<div>
					<div className={classes["heading"]}>{shortHeading}</div>
					<div className={classes["description"]}>{shortDesc}</div>
				</div>
				<QuestionUser
					firstName={props.question.userid.firstName}
					// lastName={props.question.userid.lastName}
					profileIMG={props.question.userid.profileIMG}
					date={props.date}
					username={props.question.userid.username}
					reverse={true}
				/>
			</div>
		</div>
	);
};

export default Result;
