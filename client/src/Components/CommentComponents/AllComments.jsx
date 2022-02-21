import React from "react";
import Comments from "./Comments";
import classes from "../../Styles/component-styles/comments.module.css";
const AllComments = () => {
	return (
		<div className={`cardComponent ${classes["commentCard"]}`}>
			<Comments />
			<div class={classes["line"]}></div>
			<Comments />
			<div class={classes["line"]}></div>
			<Comments />
		</div>
	);
};

export default AllComments;
