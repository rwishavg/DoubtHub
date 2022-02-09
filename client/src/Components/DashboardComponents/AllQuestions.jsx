import React from "react";
import Question from "./Question";
import NewQuestion from "./NewQuestion";
const AllQuestions = () => {
	return (
		<div>
			<NewQuestion />
			<Question />
			<Question />
			<Question />
			<Question />
		</div>
	);
};

export default AllQuestions;
