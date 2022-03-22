import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import classes from "../../Styles/component-styles/newQuestion.module.css";
import { userObjectContext } from "../../Context";
import { useNavigate } from "react-router-dom";
import { toast } from "wc-toast";
const api_endpoint = process.env.REACT_APP_API_ENDPOINT;

const activeStyle = {
	cardStyle: { height: "70vh", width: "100%" },
	body: { height: "35vh", width: "100%" },
	descriptionStyle: {},
	collapse: { opacity: "1", zIndex: "1" },
};

const inactiveStyle = {
	cardStyle: { height: "17vh" },
	body: { display: "none" },
	descriptionStyle: { display: "none" },
	collapse: { opacity: "0", zIndex: "-1" },
};

const NewQuestion = (props) => {
	const [tags, setTags] = useState([]);
	const [cardState, setCardState] = useState(false);
	const [style, setStyle] = useState(inactiveStyle);
	const [title, setTitle] = useState("Have a Question?");
	const [description, setDescription] = useState("");
	const [questionText, setQuestionText] = useState("");
	const [user, isAuthenticated] = useContext(userObjectContext);
	const navigate = useNavigate();

	const checkAuth = () => {
		if (isAuthenticated === false) {
			navigate("../../login", { replace: true });
			toast("Login To continue");
			return 0;
		} else return 1;
	};

	let onlyUnique = (value, index, self) => {
		return self.indexOf(value) === index;
	};

	const postQuestion = () => {
		if (checkAuth()) {
			let uniqueTags = tags.filter(onlyUnique);
			axios({
				method: "POST",
				data: {
					userid: user._id,
					questionHeading: questionText,
					description: description,
					tags: uniqueTags,
				},
				withCredentials: true,
				url: api_endpoint + "/question/addNewQuestion",
			}).then((response) => {
				props.updateFunction();
			});
			toast.success("Question Added");
			setCardState(false);
			setDescription("");
			setQuestionText("");
			setTags([]);
		}
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
				<div className={classes["heading"]}>Tags :</div>
				<div className={classes["inputRow"]}>
					<ReactTagInput
						maxTags={5}
						tags={tags}
						removeOnBackspace={true}
						onChange={(newTags) => {
							if (newTags.length - 1 > -1) {
								newTags[newTags.length - 1] =
									newTags[newTags.length - 1].toUpperCase();
							}
							setTags(newTags);
						}}
						validator={(value) => {
							if (value.length > 10) {
								toast.error("Max Tag Length Exceded !");
								return 0;
							}
							const space = value.indexOf(" ") !== -1;
							if (space) {
								toast.error("No Spaces!");
								return !space;
							}
							return !space;
						}}
					/>
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

export default React.memo(NewQuestion);
