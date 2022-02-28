import axios from "axios";
import React, { useState, useContext } from "react";
import { userObjectContext } from "../../Context";
import { useParams } from "react-router-dom";
import classes from "../../Styles/component-styles/comments.module.css";
import { toast } from "https://cdn.skypack.dev/wc-toast";
const api_endpoint = process.env.REACT_APP_API_ENDPOINT;
const NewComment = (props) => {
	const [description, setDescription] = useState("");
	const user = useContext(userObjectContext)[0];
	let { id } = useParams();
	const submitResponse = () => {
		axios({
			method: "POST",
			data: {
				questionID: id,
				userid: user._id,
				body: description,
			},
			withCredentials: true,
			url: api_endpoint + "/comment/addNewComment",
		}).then((response) => {
			// console.log(response.data.comments);
			props.setComments(response.data.comments);
		});
		toast.success("Response Added");
	};
	return (
		<div className={`cardComponent ${classes.newComment}`}>
			<div className={classes["full"]}>
				<div className={classes["heading"]}>Respond:</div>
				<div className={classes["bg"]}>
					<textarea
						type="text"
						className={classes["textArea"]}
						placeholder="Write your response here..."
						onChange={(e) => setDescription(e.target.value)}
						value={description}
					/>
				</div>
				<div
					className={`button ${classes.wid}`}
					onClick={submitResponse}
				>
					Respond
				</div>
			</div>
		</div>
	);
};

export default NewComment;
