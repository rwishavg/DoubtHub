import React, { useState, useEffect } from "react";
import classes from "../../Styles/component-styles/searchbar.module.css";
import { convertDate } from "../../helper";
import Result from "./Result";
const SearchResults = (props) => {
	const [headingText, setHeadingText] = useState("No Result");
	useEffect(() => {
		if (props.results.length !== 0) setHeadingText("Results: ");
		else setHeadingText("No Results ");
	}, [props.results]);
	return (
		<div className={classes["resultContainer"]}>
			<div
				className={`centerContent ${classes.result}`}
				style={props.style}
			>
				<div className={classes["resHeading"]}>{headingText}</div>
				<div className={classes["wrapper"]}>
					{props.results.length > 0 && (
						<>
							{props.results.map((result) =>(
								<Result
									key={result._id}
									// updateData={props.getData}
									result={result}
									date={convertDate(result.createdAt)}
									active={props.active}
									type={props.type}
								/>
							))}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default SearchResults;
