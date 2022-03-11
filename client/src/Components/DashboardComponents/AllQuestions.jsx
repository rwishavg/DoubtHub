import React from "react";
import Question from "./Question";
import { convertDate } from "../../helper";
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
	return (
		<div className="fadeIn">
			{props.data.length === 0 && (
				<div style={zeroStyle}>
					Its lonely here. <br />
					Add some questions....
				</div>
			)}
			{props.data.map((question) => (
				<Question
					key={question._id}
					updateData={props.getData}
					question={question}
					date={convertDate(question.createdAt)}
				/>
			))}
		</div>
	);
};

export default React.memo(AllQuestions);
