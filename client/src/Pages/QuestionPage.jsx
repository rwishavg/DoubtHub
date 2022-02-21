import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Question from "../Components/DashboardComponents/Question";
import DeletedQuestion from "../Components/DashboardComponents/DeletedQuestion";
import AllComments from "../Components/CommentComponents/AllComments";
const api_endpoint = process.env.REACT_APP_API_ENDPOINT;

const QuestionPage = (props) => {
	let { id } = useParams();
	const [questionData, setQuestionData] = useState(null);
	useEffect(() => {
		axios({
			method: "POST",
			data: {
				id: id,
			},
			withCredentials: true,
			url: api_endpoint + "/question/getQuestionPage",
		}).then((response) => {
			setQuestionData(response.data);
			console.log(response);
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
		return (
			<div className="fadeIn">
				<Question
					key={questionData._id}
					userid={questionData.userid}
					heading={questionData.heading}
					description={questionData.description}
					id={questionData._id}
					updateData={props.getData}
					date={props.convertDate(questionData.createdAt)}
					questionID={questionData.questionID}
					page={"QuesPage"}
				/>
				<AllComments />
			</div>
		);
	}
};

export default React.memo(QuestionPage);
