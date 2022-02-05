import React from "react";
import Input from "./Input";
import mailIcon from "../../Assets/Icons/mail.svg";
import "../../Styles/component-styles/profile.css";
const Profile = () => {
	return (
		<div className="cardComponent profileCard">
			<form className="profileForm">
				<div className="heading">Profile</div>
				<Input
					icon={mailIcon}
					heading="Email"
					type="email"
					placeholder="Enter Email"
				/>
				<Input
					icon={mailIcon}
					heading="Email"
					type="email"
					placeholder="Enter Email"
				/>
			</form>
		</div>
	);
};

export default Profile;
