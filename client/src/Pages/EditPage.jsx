import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Question from "../Components/DashboardComponents/Question";
const api_endpoint = process.env.REACT_APP_API_ENDPOINT;
const EditPage = (props) => {
	let { id } = useParams();
	const [questionData, setQuestionData] = useState(null);
	useEffect(() => {
		axios
			.get(api_endpoint + `/question/getQuestionPages/${id}`, {
				withCredentials: true,
			})
			.then((response) => {
				setQuestionData(response.data);
			});
	}, [id]);
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
		console.log("comments", questionData.comments);
		return (
			<div className="fadeIn">
				<Question
					key={questionData._id}
					updateData={props.getData}
					date={props.convertDate(questionData.createdAt)}
					page={"QuesPage"}
					question={questionData}
				/>
			</div>
		);
	}
};

export default EditPage;
