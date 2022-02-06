import React, { useContext, useState } from "react";
import Input from "./Input";
import "../../Styles/component-styles/profile.css";
import { userObjectContext } from "../../Context";
import { Link } from "react-router-dom";
import atsign from "../../Assets/Icons/atsigncolor.svg";
import eye from "../../Assets/Icons/eye.svg";
import bio from "../../Assets/Icons/bio.svg";
import profile from "../../Assets/Icons/profilecolor.svg";
const Profile = () => {
	const user = useContext(userObjectContext)[0];
	const [username, setUsername] = useState(user.username);
	const [firstName, setFirstName] = useState(user.firstName);
	const [lastName, setLastName] = useState(user.lastName);
	const [bioData, setBioData] = useState(user.bio);
	const [password, setPassword] = useState("");
	const [rePassword, setRePassword] = useState("");
	return (
		<div className="cardComponent profileCard">
			<form className="profileForm">
				<div className="heading">Profile</div>
				{/* <Link to={`./${user.username}`}>Raghav</Link> */}

				<div className="profileName">
					<div className="nameSize">
						<Input
							icon={profile}
							heading="First Name"
							type="text"
							placeholder="Enter First Name"
							update={setFirstName}
							value={firstName}
						/>
						<Input
							icon={profile}
							heading="Last Name"
							type="text"
							placeholder="Enter Last Name"
							update={setLastName}
							value={lastName}
						/>
					</div>
					<div className="profilePic">
						<div className="circleCard">
							<img src={user.profileIMG} alt="" />
						</div>
					</div>
				</div>
				<Input
					icon={atsign}
					heading="Username"
					type="text"
					placeholder="Enter Username"
					update={setUsername}
					value={username}
				/>
				<div className="bioBg">
					<img src={bio} className="bioIcon" alt="icon" />
					<div>
						<div className="bioHeading">Bio</div>
						<textarea
							className="bio"
							placeholder="Say Something..."
						>
							{bioData}
						</textarea>
					</div>
				</div>
				<Input
					icon={eye}
					heading="Password"
					type="password"
					placeholder="Enter Password"
					update={setPassword}
				/>

				<Input
					icon={eye}
					heading="Re-enter Password"
					type="password"
					placeholder="Re-enter Password"
					update={setRePassword}
				/>
				<button className="button button-full">Submit</button>
			</form>
		</div>
	);
};

export default Profile;
