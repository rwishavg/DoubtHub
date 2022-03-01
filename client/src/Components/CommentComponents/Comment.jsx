import React,{useState} from "react";
import classes from "../../Styles/component-styles/comments.module.css";
import QuestionUser from "../QuestionComponents/QuestionUser";

import { UilAngleUp } from "@iconscout/react-unicons";

const Comment = (props) => {
	console.log(props)
	const [upvote, setUpvote] = useState(0);
	let calculateDate = (date) => {
		let d = Date.parse(date);
		let val = Date.now() - d;
		let hours = (val / (1000 * 60 * 60)).toFixed(1);
		let minutes = (val / (1000 * 60)).toFixed(1);
		if (hours < 1) {
			return Math.floor(minutes) + " minutes ago";
		} else {
			if (hours < 2) return Math.floor(hours) + " hour ago";
			else return Math.floor(hours) + " hours ago";
		}
	};

	return (
		<div>
			<div className={classes["content"]}>
				<div className={classes["topOptions"]}>
					<div className={classes["icons"]}>
						<UilAngleUp />
						{upvote}
					</div>
					<QuestionUser
						firstName={props.userid.firstName}
						lastName={props.userid.lastName}
						profileIMG={props.userid.profileIMG}
						username={props.userid.username}
						date={calculateDate(props.date)}
						reverse={true}
					/>
				</div>
				<div className={classes["commentDescription"]}>
					{props.body}
				</div>
			</div>
			<div className={classes["line"]}></div>
		</div>
	);
};

export default Comment;
