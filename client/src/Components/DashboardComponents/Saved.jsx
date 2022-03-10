import React, { useEffect } from "react";
import Question from "./Question";
import { convertDate } from "../../helper";
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
	let getData = async () => {
		let response = await axios.get(api_endpoint + "/user/data", {
			withCredentials: true,
		});
		let saved = response.data.saved;
		let qArr = [];
		for (var i = 0; i < saved.length; i++) {
			let question = await axios.get(
				api_endpoint + `/question/getSavedQuestions/${saved[i]}`,
				{ withCredentials: true }
			);
			qArr.push(question.data);
		}
		props.setData(qArr);
		props.getData();
	};
	useEffect(() => {
		getData();
	}, []);
	if (props.data.length === 0) {
		return <div style={zeroStyle}>No questions saved for now!</div>;
	} else {
		return (
			<div className="fadeIn">
				{props.data.map((question) => (
					<Question
						exists={question.exists}
						updateData={getData}
						key={question._id}
						question={question}
						date={convertDate(question.createdAt)}
					/>
				))}
			</div>
		);
	}
};

export default Saved;
