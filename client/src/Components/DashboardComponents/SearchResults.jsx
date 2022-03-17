import React, { useState, useEffect } from "react";
import classes from "../../Styles/component-styles/searchbar.module.css";
import Question from "./Question";
import { convertDate } from "../../helper";
import Result from "./Result";
const SearchResults = (props) => {
	const [headingText, setHeadingText] = useState("No Result");
	useEffect(() => {
		if (props.result.length !== 0) setHeadingText("Results: ");
		else setHeadingText("No Results ");
	}, [props.result]);

	return (
		<div className={classes["resultContainer"]}>
			<div
				className={`centerContent ${classes.result}`}
				style={props.style}
			>
				<div className={classes["resHeading"]}>{headingText}</div>
				{props.result.length > 0 && props.type === "question" && (
					<>
						{props.result.map((question) => (
							<Result
								key={question._id}
								// updateData={props.getData}
								question={question}
								date={convertDate(question.createdAt)}
								active={props.active}
							/>
						))}
					</>
				)}
			</div>
		</div>
	);
};

export default SearchResults;
