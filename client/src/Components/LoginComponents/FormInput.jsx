import React from "react";

const FormInput = (props) => {
	return (
		<div className="inputParent">
			<img src={props.icon} className="icon" alt="icon" />
			<div>
				<div className="inputHeading">{props.heading}</div>
				<input
					className="formInput"
					type={props.type}
					placeholder={props.placeholder}
					onChange={(e) => props.update(e.target.value)}
				/>
			</div>
		</div>
	);
};

export default FormInput;
