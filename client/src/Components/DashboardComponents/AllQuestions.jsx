import React, { useEffect, useState } from "react";
import Question from "./Question";
import NewQuestion from "./NewQuestion";
import axios from "axios";
const api_endpoint = process.env.REACT_APP_API_ENDPOINT;
const AllQuestions = () => {
	const [questionData, setQuestionData] = useState([]);
	useEffect(() => {
		axios
			.get(api_endpoint + "/question/getQuestions", {
				withCredentials: true,
			})
			.then((response) => {
				setQuestionData(response.data);
			});
	}, []);

	useEffect(() => {
		console.log(questionData);
	}, [questionData]);

	return (
		<div>
			<NewQuestion />
			{questionData.map((question) => (
				<Question
					key={question._id}
					heading={question.heading}
					description={question.description}
				/>
			))}
		</div>
	);
};

export default AllQuestions;
