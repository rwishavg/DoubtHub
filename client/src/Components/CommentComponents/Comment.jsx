import React, { useContext, useState } from "react";
import classes from "../../Styles/component-styles/comments.module.css";
import QuestionUser from "../QuestionComponents/QuestionUser";
import { UilAngleUp } from "@iconscout/react-unicons";
import { UilAngleDown } from "@iconscout/react-unicons";

import { userObjectContext } from "../../Context";
import axios from "axios";
import { toast } from "wc-toast";

const api_endpoint = process.env.REACT_APP_API_ENDPOINT;

const Comment = (props) => {
	const [upvote, setUpvote] = useState(
		props.comment.upvote.length - props.comment.downvote.length
	);
	const user = useContext(userObjectContext)[0];

	let calculateDate = (date) => {
		let d = Date.parse(date);
		let val = Date.now() - d;
		let hours = (val / (1000 * 60 * 60)).toFixed(1);
		let minutes = (val / (1000 * 60)).toFixed(1);
		if (hours < 1) {
			return Math.floor(minutes) + " minutes ago";
		} else if (hours > 24) {
			let day = Math.floor(hours / 24);
			if (day > 1) return day + " days ago";
			else return day + " day ago";
		} else {
			if (hours < 2) return Math.floor(hours) + " hour ago";
			else return Math.floor(hours) + " hours ago";
		}
	};

	const upvoteComment = () => {
		axios({
			method: "PUT",
			data: {
				userID: user._id,
				commentID: props.comment._id,
			},
			withCredentials: true,
			url: api_endpoint + "/comment/upvoteComment",
		}).then((response) => {
			setUpvote(response.data.count);
			if (response.data.message === "Liked")
				toast.success("Comment " + response.data.message);
			else toast.success("Comment " + response.data.message);
		});
	};

	const downvoteComment = () => {
		axios({
			method: "PUT",
			data: {
				type: "downvote",
				userID: user._id,
				commentID: props.comment._id,
			},
			withCredentials: true,
			url: api_endpoint + "/comment/downvoteComment",
		}).then((response) => {
			setUpvote(response.data.count);
			if (response.data.message === "Liked")
				toast.success("Comment " + response.data.message);
			else toast.success("Comment " + response.data.message);
		});
	};

	return (
		<div>
			<div className={classes["content"]}>
				<div className={classes["topOptions"]}>
					<div className={classes["icons"]}>
						<UilAngleUp
							style={{ cursor: "pointer" }}
							onClick={upvoteComment}
							color="var(--font-color)"
						/>
						{upvote}
						<UilAngleDown
							style={{ cursor: "pointer" }}
							onClick={downvoteComment}
							color="var(--font-color)"
						/>
					</div>
					<QuestionUser
						firstName={props.comment.userid.firstName}
						lastName={props.comment.userid.lastName}
						profileIMG={props.comment.userid.profileIMG}
						username={props.comment.userid.username}
						date={calculateDate(props.comment.createdAt)}
						reverse={true}
					/>
				</div>
				<div className={classes["commentDescription"]}>
					{props.comment.body}
				</div>
			</div>
			<div className={classes["line"]}></div>
		</div>
	);
};

export default Comment;
