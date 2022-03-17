import React, { useContext, useState} from "react";
import "../../Styles/component-styles/profile.css";
import axios from "axios";
import { userObjectContext } from "../../Context";
import { toast } from "wc-toast";
import Input from "./Input";
import { UilEye } from "@iconscout/react-unicons";
import DarkMode from "../DashboardComponents/DarkMode";


const api_endpoint = process.env.REACT_APP_API_ENDPOINT;

const Settings = () => {
	const user = useContext(userObjectContext)[0];
	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [reNewPassword, setReNewPassword] = useState("");

	const changePass = () => {
		axios({
			method: "PUT",
			data: {
				oldPassword: password,
				newPassword: newPassword,
				reNewPassword: reNewPassword,
				email: user.emailID,
			},
			withCredentials: true,
			url: api_endpoint + "/user/profile/password",
		}).then((response) => {
			toast.success("Password Changed");
		});
	};

	return (
		<div className="cardComponent profileCard">
			<form className="profileForm">
				<div className="heading">Settings</div>
				<DarkMode />
				<div className="profileName">
					<div className="nameSize">
						<div className="heading2">Password Change :</div>
						<Input
							heading="Current Password"
							placeholder="Password"
							update={setPassword}
							type="password"
						>
							<UilEye color="#A0A3BD" />
						</Input>
						<Input
							heading="New Password"
							placeholder="New Password"
							update={setNewPassword}
							type="password"
						>
							<UilEye color="#A0A3BD" />
						</Input>
						<Input
							heading="Re-Enter New Password"
							placeholder="New Password"
							update={setReNewPassword}
							type="password"
						>
							<UilEye color="#A0A3BD" />
						</Input>
					</div>
					<div className="profilePic">
						<div className="circleCard">
							<img src={user.profileIMG} alt="" />
						</div>
					</div>
				</div>

				<button
					className="button"
					type="button"
					onClick={changePass}
					style={{ marginTop: "2vh", width: "10vw" }}
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default Settings;
