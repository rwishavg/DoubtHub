import React from "react";
import classes from "../../Styles/component-styles/input.module.css";

const Input = (props) => {
	return (
		<div className={classes["inputParent"]}>
			<img src={props.icon} className={classes["icon"]} alt="icon" />
			<div className="inputWidth">
				<div className={classes["inputHeading"]}>{props.heading}</div>
				<input
					className={classes["formInput"]}
					type={props.type}
					placeholder={props.placeholder}
					onChange={(e) => props.update(e.target.value)}
					value={props.value}
				/>
			</div>
		</div>
	);
};

export default React.memo(Input);
