import React, { useContext, useState } from "react";
import Input from "./Input";
import axios from "axios";
import { userObjectContext } from "../../Context";
import "../../Styles/component-styles/profile.css";

import { UilAt } from "@iconscout/react-unicons";
import { UilFileEditAlt } from "@iconscout/react-unicons";
import { UilUser } from "@iconscout/react-unicons";
import { toast } from "https://cdn.skypack.dev/wc-toast";
const api_endpoint = process.env.REACT_APP_API_ENDPOINT;

const Profile = () => {
	const user = useContext(userObjectContext)[0];
	const updateUser = useContext(userObjectContext)[2];
	const [username, setUsername] = useState(user.username);
	const [firstName, setFirstName] = useState(user.firstName);
	const [lastName, setLastName] = useState(user.lastName);
	const [bioData, setBioData] = useState(user.bio);

	const submit = () => {
		axios({
			method: "POST",
			data: {
				username: username,
				firstName: firstName,
				lastName: lastName,
				bio: bioData,
				email: user.emailID,
			},
			withCredentials: true,
			url: api_endpoint + "/user/profile/edit",
		}).then((response) => {
			console.log(response);
			toast.success("Profile Updated");
			updateUser(response.data);
		});
	};

	return (
		<div className="cardComponent profileCard">
			<form className="profileForm">
				<div className="heading">Profile</div>
				<div className="profileName">
					<div className="nameSize">
						<Input
							heading="First Name"
							type="text"
							placeholder="Enter First Name"
							update={setFirstName}
							value={firstName}
						>
							<UilUser color="#A0A3BD" />
						</Input>
						<Input
							heading="Last Name"
							type="text"
							placeholder="Enter Last Name"
							update={setLastName}
							value={lastName}
						>
							<UilUser color="#A0A3BD" />
						</Input>
					</div>
					<div className="profilePic">
						<div className="circleCard">
							<img src={user.profileIMG} alt="" />
						</div>
					</div>
				</div>
				<Input
					heading="Username"
					type="text"
					placeholder="Enter Username"
					update={setUsername}
					value={username}
				>
					<UilAt color="#A0A3BD" />
				</Input>
				<div className="bioBg">
					<UilFileEditAlt className="bioIcon" color="#A0A3BD" />
					<div>
						<div className="bioHeading">Bio</div>
						<textarea
							className="bio"
							placeholder="Say Something..."
							onChange={(e) => setBioData(e.target.value)}
							value={bioData}
						></textarea>
					</div>
				</div>

				<button
					className="button button-full"
					type="button"
					onClick={submit}
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default Profile;
