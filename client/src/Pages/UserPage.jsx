import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { Rings } from "react-loader-spinner";
const api_endpoint = process.env.REACT_APP_API_ENDPOINT;
const UserPage = () => {
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
			setUserData(response.data);
			console.log(response);
		});
	}, [username]);
	if (userData === null) return <div></div>;
	else
		return (
			<div className="cardComponent">
				<div className="content">
					{" "}
					<img
						src={userData.profileIMG}
						alt=""
						style={{ width: "70px" }}
					/>
					<br />
					{userData.firstName} {userData.lastName} <br />
					{userData.bio}
				</div>
			</div>
		);
};

export default UserPage;
