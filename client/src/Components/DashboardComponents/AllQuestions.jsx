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
				// console.log(response);
				setQuestionData(response.data);
			});
	};
	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		console.log(questionData);
	}, [questionData]);

	let convertDate = (createdAt) => {
		let result = createdAt.substring(0, 10);
		let day = result.substring(8, 10);
		let month = result.substring(5, 7);
		let year = result.substring(0, 4);
		if (month === "01") month = "Jan";
		else if (month === "02") month = "Feb";
		else if (month === "03") month = "Mar";
		else if (month === "04") month = "Apr";
		else if (month === "05") month = "May";
		else if (month === "06") month = "Jun";
		else if (month === "07") month = "Jul";
		else if (month === "08") month = "Aug";
		else if (month === "09") month = "Sep";
		else if (month === "10") month = "Oct";
		else if (month === "11") month = "Nov";
		else if (month === "12") month = "Dec";
		result = day + " " + month + " " + year;
		console.log(result);
		return result;
	}

	return (
		<div>
			<NewQuestion updateFunction={getData} prevData={questionData} />
			{questionData.map((question) => (
				<Question
					key={question._id}
					userid={question.userid}
					heading={question.heading}
					description={question.description}
					id={question._id}
					updateData={getData}
					date={convertDate(question.createdAt)}
				/>
			))}
		</div>
	);
};

export default AllQuestions;
