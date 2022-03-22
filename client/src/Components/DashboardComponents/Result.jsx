import React from "react";
import QuestionUser from "../QuestionComponents/QuestionUser";
import classes from "../../Styles/component-styles/result.module.css";
import { shorten } from "../../helper";
import { useNavigate } from "react-router-dom";
const Result = (props) => {
	const navigate = useNavigate();
	if (props.type === "question" || props.type === "tag") {
		let shortDesc = shorten(props.result.description, 50);
		let shortHeading = shorten(props.result.heading, 40);
		if (props.result.userid === undefined) {
			return <div></div>;
		} else {
			return (
				<div
					className={`cardComponent ${classes["smallQuestion"]}`}
					onClick={() => {
						navigate(
							`../../Dashboard/q/${props.result.questionID}`,
							{
								replace: true,
							}
						);
						props.active(false);
					}}
				>
					<div className={classes["content"]}>
						<div>
							<div className={classes["heading"]}>
								{shortHeading}
							</div>
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
	}

	if (props.type === "name" || props.type === "username") {
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
};

export default Result;
