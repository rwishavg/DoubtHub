import React from "react";
import classes from "../../Styles/component-styles/question.module.css";
import options from "../../Assets/Icons/options.svg";
import { ReactComponent as StarSvg } from "../../Assets/Icons/star.svg";
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
			{/* {props.id} */}
			<div className={classes["options"]}>
				<div
					className={classes["moreOptions"]}
					style={props.optionStyle}
				>
					<StarSvg
						style={{ stroke: "black" }}
						className={classes["blueClass"]}
						onClick={() => {
							props.saveQuestion();
							props.updateData();
						}}
					/>
				</div>

				<img
					src={options}
					alt=""
					onClick={(e) => props.setOptionState(!props.optionState)}
				/>
			</div>
		</div>
	);
};

export default React.memo(DeletedQuestion);
