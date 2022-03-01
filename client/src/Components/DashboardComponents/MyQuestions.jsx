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
	if (props.data.length === 0) {
		return (
			<div style={zeroStyle}>
				Its lonely here. <br />
				Add some questions...
			</div>
		);
	} else
		return (
			<div className="fadeIn">
				{props.data.map((question) => (
					<Question
						questionID={question.questionID}
						key={question._id}
						updateData={props.getData}
						question={question}
						date={props.convertDate(question.createdAt)}
					/>
				))}
			</div>
		);
};

export default AllQuestions;
