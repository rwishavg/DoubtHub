import React from "react";
import classes from "../../Styles/component-styles/question.module.css";
import { Link } from "react-router-dom";
const QuestionUser = (props) => {
	if (props.reverse == true) {
		return (
			<div className={classes["user"]}>
				<div
					className={`${classes.name}`}
					style={{ alignItems: "flex-end" }}
				>
					<Link to={`/dashboard/u/${props.username}`}>
						{props.firstName}{" "}
						<span className={classes["lastName"]}>
							{props.lastName}
						</span>
					</Link>
					<div className={classes["date"]}>{props.date}</div>
				</div>
				<Link to={`/dashboard/u/${props.username}`}>
					<img
						src={props.profileIMG}
						alt=""
						className={`${classes.userPhoto}`}
					/>
				</Link>
			</div>
		);
	} else {
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
	}
};

export default QuestionUser;
