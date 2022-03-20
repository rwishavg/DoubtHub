import React, { useContext, useState } from "react";
import "../../Styles/component-styles/settings.css";
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
		if (newPassword === reNewPassword) {
			axios({
				method: "PUT",
				data: {
					oldPassword: password,
					newPassword: newPassword,
					emailID: user.emailID,
				},
				withCredentials: true,
				url: api_endpoint + "/user/profile/changePassword",
			}).then((response) => {
				toast.success("Password Changed", response);
			});
		} else {
			toast.error("Passwords do not match");
		}
	};

	const deleteAccount = () => {
		axios({
			method: "DELETE",
			data: {
				password: password,
				email: user.emailID,
			},
			withCredentials: true,
			url: api_endpoint + "/user/profile/deleteAccount",
		}).then((response) => {
			toast.success("Account Deleted");
		});
	};

	return (
		<div className="cardComponent settingsCard">
			<div className="settingsForm">
				<div className="heading">Settings</div>
				<div className="heading2">Toggle LightMode/ DarkMode :</div>
				<DarkMode />
				{user.googleID === "" && (
					<div className="settingsName">
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
						<button
							className="button"
							type="button"
							onClick={changePass}
							style={{ marginTop: "2vh", width: "10vw" }}
						>
							Submit
						</button>
					</div>
				)}

				<div className="heading2">Delete Account :</div>

				<button
					className="button"
					type="button"
					onClick={deleteAccount}
					style={{
						marginTop: "2vh",
						width: "10vw",
						border: "2px solid red",
						color: "red",
					}}
				>
					Delete Account
				</button>
			</div>
		</div>
	);
};

export default Settings;
