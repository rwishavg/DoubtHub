import React, { useEffect, useState, useContext } from "react";
import Question from "./Question";
import { userObjectContext } from "../../Context";
import axios from "axios";
const api_endpoint = process.env.REACT_APP_API_ENDPOINT;

const AllQuestions = (props) => {
	const [questionData, setQuestionData] = useState([]);
	const [user, isAuthenticated] = useContext(userObjectContext);
	const getData = () => {
		axios({
			method: "POST",
			data: {
				emailID: user.emailID,
			},
			withCredentials: true,
			url: api_endpoint + "/question/myQuestions",
		}).then((response) => {
			setQuestionData(response.data);
		});
	};
	useEffect(() => {
		getData();
	}, []);

	return (
		<div>
			{questionData.map((question) => (
				<Question
					key={question._id}
					userid={question.userid}
					heading={question.heading}
					description={question.description}
					id={question._id}
					updateData={getData}
					date={props.convertDate(question.createdAt)}
				/>
			))}
		</div>
	);
};

export default AllQuestions;
