import React from "react";
import { Link } from "react-router-dom";
import { UilArrowCircleRight } from "@iconscout/react-unicons";
import { UilArrowCircleLeft } from "@iconscout/react-unicons";
import classes from "../../Styles/component-styles/pagination.module.css";
const PaginationComponent = (props) => {
	return (
		<div className={classes["container"]}>
			<div className={classes["number"]}>{props.number}</div>
			<Link
				to={`/${props.page}/${props.number - 1}`}
				className={classes["links"]}
			>
				<UilArrowCircleLeft color="black" />
			</Link>
			<Link
				to={`/${props.page}/${props.number + 1}`}
				className={classes["links"]}
			>
				<UilArrowCircleRight color="black" />
			</Link>
		</div>
	);
};

export default PaginationComponent;
