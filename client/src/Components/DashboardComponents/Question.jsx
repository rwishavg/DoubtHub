import React, { useContext, useEffect, useState } from "react";
import classes from "../../Styles/component-styles/question.module.css";
import { userObjectContext } from "../../Context";
import home from "../../Assets/Icons/home.svg";
import filter from "../../Assets/Icons/filter.svg";
const activeStyle = {
	cardStyle: { maxHeight: "999vh" },
	maskStyle: {
		WebkitMaskImage: "none",
		maxHeight: "999vh",
	},
	moreText: "LESS",
};

const inactiveStyle = {
	cardStyle: { maxHeight: "35vh" },
	maskStyle: {
		WebkitMaskImage: "linear-gradient(180deg, #000 0%, transparent)",
		maxHeight: "7vh",
	},
	moreText: "MORE",
};
const Question = (props) => {
	const user = useContext(userObjectContext)[0];
	const [currentCard, setCurrentCard] = useState(false);
	const [styleState, setStyleState] = useState(inactiveStyle);
	const expandCard = () => {
		setCurrentCard(!currentCard);
	};

	useEffect(() => {
		if (currentCard === true) {
			setStyleState(activeStyle);
		} else {
			setStyleState(inactiveStyle);
		}
	}, [currentCard]);

	return (
		<div
			className={`cardComponent ${classes.questionComponent}`}
			style={styleState.cardStyle}
		>
			<div className={classes["content"]}>
				<div className={classes["user"]}>
					<img
						src={user.profileIMG}
						alt=""
						className={`${classes.userPhoto}`}
					/>
					<div className={`${classes.name}`}>
						{user.firstName} {user.lastName}
						<div className={classes["date"]}>20 January 2022</div>
					</div>
				</div>
				<div className={classes["questionHeading"]}>
					{props.heading}
				</div>
				<div
					className={classes["questionDescription"]}
					style={styleState.maskStyle}
				>
					{props.description}
				</div>
				<div className={`${classes.filterBg}`} onClick={expandCard}>
					VIEW {styleState.moreText}
				</div>
				<div className="icons">{/* <img src={home} alt="" /> */}</div>
			</div>
		</div>
	);
};

export default React.memo(Question);
