import React from "react";
import Question from "./Question";

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
		return result;
	};

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
