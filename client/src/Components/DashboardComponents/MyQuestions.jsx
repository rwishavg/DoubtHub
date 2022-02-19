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
const AllQuestions = (props) => {
	useEffect(() => {
		props.getData();
	}, []);

	return (
		<div>
			{props.data.length === 0 && (
				<div style={zeroStyle}>
					Its lonely here. <br />
					Add some questions...
				</div>
			)}
			{props.data.map((question) => (
				<Question
					key={question._id}
					userid={question.userid}
					heading={question.heading}
					description={question.description}
					id={question._id}
					updateData={props.getData}
					date={props.convertDate(question.createdAt)}
					questionID={question.questionID}
				/>
			))}
		</div>
	);
};

export default AllQuestions;
