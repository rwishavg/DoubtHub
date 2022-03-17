import React, { useEffect, useState } from "react";
import axios from "axios";
import Question from "../Components/DashboardComponents/Question";
import AllComments from "../Components/CommentComponents/AllComments";

import { useParams } from "react-router-dom";
import { convertDate } from "../helper";
const api_endpoint = process.env.REACT_APP_API_ENDPOINT;

const QuestionPage = (props) => {
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
		return (
			<div className="fadeIn">
				<Question
					key={questionData._id}
					updateData={props.getData}
					date={convertDate(questionData.createdAt)}
					page={"QuesPage"}
					question={questionData}
				/>
				<AllComments comments={questionData.comments} />
			</div>
		);
	}
};

export default React.memo(QuestionPage);
