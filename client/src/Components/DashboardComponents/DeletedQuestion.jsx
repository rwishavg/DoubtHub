import React from "react";
import classes from "../../Styles/component-styles/question.module.css";

import { UilFavorite } from "@iconscout/react-unicons";
import { UilEllipsisV } from "@iconscout/react-unicons";

const DeletedQuestion = (props) => {
	return (
		<div
			className={`cardComponent ${classes.questionComponent}`}
			// style={styleState.cardStyle}
		>
			<div className={classes["content"]}>
				<div className={classes["questionHeading"]}>
					This Post Is No Longer Available &#128565;
				</div>
				<div className={classes["questionDescription"]}>
					Please Remove From Saved Questions
				</div>
			</div>
			<div className={classes["options"]}>
				<div
					className={classes["moreOptions"]}
					style={props.optionStyle}
				>
					<UilFavorite
						onClick={() => {
							props.saveQuestion();
							props.updateData();
						}}
						className={classes["blueClass"]}
					/>
				</div>
				<UilEllipsisV
					onClick={(e) => props.setOptionState(!props.optionState)}
				/>
			</div>
		</div>
	);
};

export default React.memo(DeletedQuestion);
