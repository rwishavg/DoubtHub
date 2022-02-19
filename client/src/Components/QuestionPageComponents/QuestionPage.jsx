import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Question from "../DashboardComponents/Question";
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
		});
	}, [id]);

	if (questionData === null) {
		return <div>Loading</div>;
	} else
		return (
			<div>
				<Question
					key={questionData._id}
					userid={questionData.userid}
					heading={questionData.heading}
					description={questionData.description}
					id={questionData._id}
					updateData={props.getData}
					date={props.convertDate(questionData.createdAt)}
					questionID={questionData.questionID}
				/>
			</div>
		);
};

export default React.memo(QuestionPage);
