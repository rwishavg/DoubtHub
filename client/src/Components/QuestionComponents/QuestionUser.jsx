import React from "react";
import classes from "../../Styles/component-styles/question.module.css";
const QuestionUser = (props) => {
	return (
		<div className={classes["user"]}>
			<img
				src={props.profileIMG}
				alt=""
				className={`${classes.userPhoto}`}
			/>
			<div className={`${classes.name}`}>
				{props.firstName} {props.lastName}
				<div className={classes["date"]}>{props.date}</div>
			</div>
		</div>
	);
};

export default QuestionUser;
