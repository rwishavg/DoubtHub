import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import classes from "../../Styles/component-styles/newQuestion.module.css";
import { userObjectContext } from "../../Context";
const api_endpoint = process.env.REACT_APP_API_ENDPOINT;
const activeStyle = {
	cardStyle: { height: "60vh", width: "100%" },
	body: { height: "35vh", width: "100%" },
	descriptionStyle: {},
	collapse: { opacity: "1", zIndex: "1" },
};

const inactiveStyle = {
	cardStyle: { height: "18vh" },
	body: { display: "none" },
	descriptionStyle: { display: "none" },
	collapse: { opacity: "0", zIndex: "-1" },
};

const NewQuestion = (props) => {
	const [cardState, setCardState] = useState(false);
	const [style, setStyle] = useState(inactiveStyle);
	const [title, setTitle] = useState("Have a Question?");
	const [description, setDescription] = useState("");
	const [questionText, setQuestionText] = useState("");
	const user = useContext(userObjectContext)[0];
	const postQuestion = () => {
		axios({
			method: "POST",
			data: {
				userid: user._id,
				questionHeading: questionText,
				description: description,
			},
			withCredentials: true,
			url: api_endpoint + "/question/addNewQuestion",
		}).then((response) => {
			props.updateFunction();
		});
		alert("Question Created");
		setCardState(false);
		setDescription("");
		setQuestionText("");
	};

	useEffect(() => {
		if (cardState === true) {
			setStyle(activeStyle);
			setTitle("Question Title:");
		} else {
			setStyle(inactiveStyle);
			setTitle("Have a Question?");
		}
	}, [cardState]);
	return (
		<div
			className={`cardComponent ${classes.newQuestion}`}
			style={style.cardStyle}
		>
			<div className={classes["content"]}>
				<div className={classes["heading"]}>{title}</div>
				<div className={classes["inputRow"]}>
					<input
						type="text"
						className={classes["Input"]}
						placeholder="Start typing here..."
						onClick={(e) => setCardState(true)}
						onChange={(e) => setQuestionText(e.target.value)}
						value={questionText}
					/>
					<div
						className={`button ${classes.buttonStyle}`}
						onClick={postQuestion}
					>
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
						placeholder="Description..."
						onChange={(e) => setDescription(e.target.value)}
						value={description}
					/>
				</div>
				<div
					className={classes["filterBg"]}
					style={style.collapse}
					onClick={(e) => setCardState(false)}
				>
					COLLAPSE
				</div>
			</div>
		</div>
	);
};

export default NewQuestion;
