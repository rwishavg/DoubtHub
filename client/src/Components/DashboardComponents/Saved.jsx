import React, { useEffect, useState, useContext } from "react";
import Question from "./Question";
import { userObjectContext } from "../../Context";
import axios from "axios";
const api_endpoint = process.env.REACT_APP_API_ENDPOINT;
const zeroStyle = {
	margin: "0 auto",
	width: "100%",
	// display: "flex",
	// justifyContent: "center",
	marginTop: "4vh",
	marginLeft: "4vh",
	fontWeight: "300",
	color: "#666666",
};
const Saved = (props) => {
	const [user, isAuthenticated, setUserObject] =
		useContext(userObjectContext);

	let getData = () => {
		axios
			.get(api_endpoint + "/user/data", { withCredentials: true })
			.then((response) => {
				props.getData();
				axios({
					method: "POST",
					data: {
						saved: response.data.saved,
					},
					withCredentials: true,
					url: api_endpoint + "/question/getSavedQuestions",
				}).then((response) => {
					props.setData(response.data);
				});
			});
	};
	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="fadeIn">
			{props.data.length === 0 && (
				<div style={zeroStyle}>No questions saved for now!</div>
			)}
			{props.data.map((question) => (
				<Question
					key={question._id}
					userid={question.userid}
					heading={question.heading}
					description={question.description}
					id={question._id}
					exists={question.exists}
					updateData={getData}
					date={props.convertDate(question.createdAt)}
					questionID={question.questionID}
				/>
			))}
		</div>
	);
};

export default Saved;
