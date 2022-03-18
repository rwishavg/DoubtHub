import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import classes from "../Styles/page-styles/userPage.module.css";
// import { Rings } from "react-loader-spinner";
import { convertDate } from "../helper";
import Question from "../Components/DashboardComponents/Question";
const api_endpoint = process.env.REACT_APP_API_ENDPOINT;

const UserPage = (props) => {
	let { username } = useParams();
	const [userData, setUserData] = useState(null);
	useEffect(() => {
		axios({
			method: "POST",
			data: {
				username: username,
			},
			withCredentials: true,
			url: api_endpoint + "/user/getUser",
		}).then((response) => {
			if (Object.keys(response.data).length !== 0) {
				setUserData(response.data);
			} else {
				setUserData(null);
			}
		});
	}, [username]);
	if (userData === null) return <div className="fadeIn"></div>;
	else
		return (
			<div className="fadeIn">
				<div className={`cardComponent ${classes.userComponent}`}>
					<div className={`${classes.content}`}>
						<div className={classes["userImg"]}>
							<img src={userData.profileIMG} alt="" />
						</div>
						<br />
						<div className={classes["info"]}>
							{userData.firstName} {userData.lastName}
							<div className={classes["bio"]}>{userData.bio}</div>
						</div>
					</div>
				</div>
				{userData.questions.map((question) => (
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

export default React.memo(UserPage);
