import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Question from "../Components/DashboardComponents/Question";
import Input from "../Components/DashboardComponents/Input";
// import classes from "../Styles/page-styles/editPage.module.css";
import { userObjectContext } from "../Context";
import classes from "../Styles/component-styles/newQuestion.module.css";
import { toast } from "wc-toast";
const api_endpoint = process.env.REACT_APP_API_ENDPOINT;

const style = {
	cardStyle: { height: "60vh", width: "100%" },
	body: { height: "35vh", width: "100%" },
	descriptionStyle: {},
	collapse: { opacity: "1", zIndex: "1" },
};
const EditPage = (props) => {
	const [cardState, setCardState] = useState(false);
	const [questionData, setQuestionData] = useState(null);
	const user = useContext(userObjectContext)[0];
	let { id } = useParams();
	useEffect(() => {
		axios
			.get(api_endpoint + `/question/getQuestionPages/${id}`, {
				withCredentials: true,
			})
			.then((response) => {
				setQuestionData(response.data);
			});
	}, [id]);

	const updateQuestion = () => {
		axios({
			method: "PUT",
			data: {
				questionID: id,
				heading: questionData.heading,
				body: questionData.description,
			},
			withCredentials: true,
			url: api_endpoint + "/question/updateQuestion",
		}).then((response) => {
			toast("Updated");
		});
	};

	if (questionData === null) {
		return <div></div>;
	} else if (questionData.exists === false) {
		return (
			<div className="fadeIn">
				Page Does not Exist
				<br />
				Back to Dashboard
			</div>
		);
	} else {
		return (
			<>
				<Question
					key={questionData._id}
					updateData={props.getData}
					question={questionData}
					remOptions={false}
					// date={convertDate(questionData.createdAt)}
				/>
				<div
					className={`cardComponent ${classes.newQuestion}`}
					style={style.cardStyle}
				>
					<div className={classes["content"]}>
						<div className={classes["heading"]}>Change Title: </div>
						<div className={classes["inputRow"]}>
							<input
								type="text"
								className={classes["Input"]}
								placeholder="Start typing here..."
								onClick={(e) => setCardState(true)}
								onChange={(e) =>
									setQuestionData({
										...questionData,
										heading: e.target.value,
									})
								}
								value={questionData.heading}
							/>
							<div
								className={`button ${classes.buttonStyle}`}
								onClick={updateQuestion}
							>
								Update
							</div>
						</div>
						<div
							className={classes["heading"]}
							style={style.descriptionStyle}
						>
							Change Description :
						</div>
						<div className={classes["bg"]} style={style.body}>
							<textarea
								type="text"
								className={classes["textArea"]}
								placeholder="Description..."
								onChange={(e) =>
									setQuestionData({
										...questionData,
										description: e.target.value,
									})
								}
								value={questionData.description}
							/>
						</div>
					</div>
				</div>
			</>
		);
	}
};

export default EditPage;
