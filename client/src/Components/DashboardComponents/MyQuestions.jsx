import React, { useEffect } from "react";
import Question from "./Question";
import { convertDate } from "../../helper";

const zeroStyle = {
	margin: "0 auto",
	width: "100%",
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
						date={convertDate(question.createdAt)}
					/>
				))}
			</div>
		);
};

export default AllQuestions;
