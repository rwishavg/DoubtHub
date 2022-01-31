import React from "react";
const Card = (props) => {
	const loginCard = {
		width: "70vw",
	};
	return (
		<div className="cardComponent" style={loginCard}>
			<div className="heading">{props.heading}</div>
		</div>
	);
};

export default Card;
