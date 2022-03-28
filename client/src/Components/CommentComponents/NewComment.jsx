import axios from "axios";
import React, { useState, useContext } from "react";
import { userObjectContext } from "../../Context";
import { useParams } from "react-router-dom";
import classes from "../../Styles/component-styles/comments.module.css";
import { toast } from "wc-toast";
import { useNavigate } from "react-router-dom";
const api_endpoint = process.env.REACT_APP_API_ENDPOINT;

const NewComment = (props) => {
	const [description, setDescription] = useState("");
	const [user, isAuthenticated] = useContext(userObjectContext);
	let { id } = useParams();

	const checkAuth = () => {
		if (isAuthenticated === false) {
			navigate("../../login", { replace: true });
			toast("Login To continue");
			return 0;
		} else return 1;
	};

	const navigate = useNavigate();
	
	const submitResponse = () => {
		if (checkAuth()) {
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
				props.setComments(response.data.comments);
			});
			toast.success("Response Added");
			setDescription("");
		}
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

export default React.memo(NewComment);
