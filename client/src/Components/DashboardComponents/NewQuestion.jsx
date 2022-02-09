import React from "react";
import classes from "../../Styles/component-styles/newQuestion.module.css";
const NewQuestion = () => {
	return (
		<div className={`cardComponent ${classes.newQuestion}`}>
			<div className={classes["content"]}>
				<div className={classes["heading"]}>Have a Question</div>
			</div>
		</div>
	);
};

export default NewQuestion;
