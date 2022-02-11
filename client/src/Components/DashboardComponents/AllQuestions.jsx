import React, { useEffect, useState } from "react";
import Question from "./Question";
import NewQuestion from "./NewQuestion";
import axios from "axios";
const api_endpoint = process.env.REACT_APP_API_ENDPOINT;
const AllQuestions = () => {
	const [questionData, setQuestionData] = useState([]);
	const getData = () => {
		axios
			.get(api_endpoint + "/question/getQuestions", {
				withCredentials: true,
			})
			.then((response) => {
				setQuestionData(response.data);
			});
	};
	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		console.log(questionData);
	}, [questionData]);

	return (
		<div>
			<NewQuestion updateFunction={getData} prevData={questionData} />
			{questionData.map((question) => (
				<Question
					key={question._id}
					heading={question.heading}
					description={question.description}
					id={question._id}
					updateData={getData}
				/>
			))}
		</div>
	);
};

export default AllQuestions;
