import React, { useEffect, useState } from "react";
import classes from "../../Styles/component-styles/newQuestion.module.css";

const activeStyle = {
	cardStyle: { height: "60vh", width: "100%" },
	body: { height: "35vh", width: "100%" },
	descriptionStyle: {},
};

const inactiveStyle = {
	cardStyle: { height: "18vh" },
	body: { display: "none" },
	descriptionStyle: { display: "none" },
	collapse: {display:"none"}
};

const NewQuestion = () => {
	const [cardState, setCardState] = useState(false);
	const [style, setStyle] = useState(inactiveStyle);
	const [title1, setTitle1] = useState("Have a Question?");
	useEffect(() => {
		if (cardState === true) {
			setStyle(activeStyle);
			setTitle1("Question Title:");
		}
		else {
			setStyle(inactiveStyle)
			setTitle1("Have a Question?")
		}
	}, [cardState]);

	return (
		<div
			className={`cardComponent ${classes.newQuestion}`}
			style={style.cardStyle}
		>
			<div className={classes["content"]}>
				<div className={classes["heading"]}>{title1}</div>
				<div className={classes["inputRow"]}>
					<input
						type="text"
						className={classes["Input"]}
						placeholder="Start typing here..."
						onClick={(e) => setCardState(true)}
					/>
					<div className={`button ${classes.buttonStyle}`} >
						Submit
					</div>
				</div>
				<div
					className={classes["heading"]}
					style={style.descriptionStyle}
				>
					Description :
				</div>
				<div className={classes["bg"]} style={style.body}>
					<textarea
						type="text"
						className={classes["textArea"]}
						placeholder="Start typing here..."
						/>
				</div>
				<div className={classes["filterBg"]} style={style.collapse} onClick={(e) => setCardState(false)}>COLLAPSE</div>
			</div>
		</div>
	);
};

export default NewQuestion;
