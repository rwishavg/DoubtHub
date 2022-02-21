import React from "react";
import classes from "../../Styles/component-styles/question.module.css";
import { Link } from "react-router-dom";
const QuestionUser = (props) => {
	return (
		<div className={classes["user"]}>
			<Link to={`/dashboard/u/${props.username}`}>
				<img
					src={props.profileIMG}
					alt=""
					className={`${classes.userPhoto}`}
				/>
			</Link>
			<div className={`${classes.name}`}>
				<Link to={`/dashboard/u/${props.username}`}>
					{props.firstName} {props.lastName}
				</Link>
				<div className={classes["date"]}>{props.date}</div>
			</div>
		</div>
	);
};

export default QuestionUser;
