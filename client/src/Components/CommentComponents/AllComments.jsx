import React from "react";
import Comments from "./Comments";
import classes from "../../Styles/component-styles/comments.module.css";
import NewComment from "./NewComment";
const AllComments = () => {
	return (
		<>
			<div className={`cardComponent ${classes["commentCard"]}`}>
				<Comments />
				<Comments />
				<Comments />
			</div>
			<NewComment />
		</>
	);
};

export default AllComments;
