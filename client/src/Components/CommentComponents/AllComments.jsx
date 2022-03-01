import React, {useState, useRef } from "react";
import Comment from "./Comment";
import classes from "../../Styles/component-styles/comments.module.css";
import NewComment from "./NewComment";
const AllComments = (props) => {
	const commentEndRef = useRef(null);
	const commentStartRef = useRef(null);
	const [comments, setComments] = useState(props.comments);
	const scrollToBottom = () => {
		commentEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};
	const scrollToTop = () => {
		commentStartRef.current?.scrollIntoView({ behavior: "smooth" });
	};
	return (
		<>
			<div
				ref={commentStartRef}
				style={{ position: "absolute", top: "0" }}
			></div>
			<div className={classes["fullwid"]}>
				<div className={classes["jump"]} onClick={scrollToBottom}>
					Respond
				</div>
			</div>
			<div className={`cardComponent ${classes["commentCard"]}`}>
				{comments.map((comment) => (
					<Comment
						key={comment._id}
						userid={comment.userid}
						body={comment.body}
						date={comment.createdAt}
					/>
				))}
			</div>

			<NewComment setComments={setComments} />
			<div className={classes["top"]} ref={commentEndRef}>
				<div className={classes["jump"]} onClick={scrollToTop}>
					To top
				</div>
			</div>
		</>
	);
};

export default AllComments;
