import React from "react";
import classes from "../../Styles/component-styles/comments.module.css";
const NewComment = () => {
	return (
		<div className={`cardComponent ${classes.newComment}`}>
			<div className={classes["full"]}>
				<div className={classes["heading"]}>Respond:</div>
				<div className={classes["bg"]}>
					<textarea
						type="text"
						className={classes["textArea"]}
						placeholder="Write your response here..."
						// onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<div className={`button ${classes.wid}`}>Respond</div>
			</div>
		</div>
	);
};

export default NewComment;
