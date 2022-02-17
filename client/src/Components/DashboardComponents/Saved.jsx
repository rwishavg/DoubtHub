import React, { useEffect, useState, useContext } from "react";
import Question from "./Question";
import { userObjectContext } from "../../Context";
import axios from "axios";
const api_endpoint = process.env.REACT_APP_API_ENDPOINT;

const Saved = (props) => {
	const [user, isAuthenticated] = useContext(userObjectContext);
	const [savedData, setSavedData] = useState([]);
	let getData = () => {
		axios
			.get(api_endpoint + "/user/data", { withCredentials: true })
			.then((response) => {
				axios({
					method: "POST",
					data: {
						saved: response.data.saved,
					},
					withCredentials: true,
					url: api_endpoint + "/question/getSavedQuestions",
				}).then((response) => {
					setSavedData(response.data);
				});
			});
	};
	useEffect(() => {
		getData();
	}, []);

	return (
		<div>
			{savedData.map((question) => (
				<Question
					key={question._id}
					userid={question.userid}
					heading={question.heading}
					description={question.description}
					id={question._id}
					exists={question.exists}
					updateData={getData}
					date={props.convertDate(question.createdAt)}
				/>
			))}
		</div>
	);
};

export default Saved;
