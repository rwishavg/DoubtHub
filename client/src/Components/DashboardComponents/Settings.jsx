// import eye from "../../Assets/Icons/eye.svg";

// const [password, setPassword] = useState("");
// const [newPassword, setNewPassword] = useState("");

/* <Input
					icon={eye}
					heading="Old Password"
					type="password"
					placeholder="Enter Old Password"
					update={setPassword}
				/>
				<Input
					icon={eye}
					heading="New Password"
					type="password"
					placeholder="Enter New Password"
					update={setNewPassword}
				/> */

import React from "react";

const Settings = () => {
	return (
		<div>
			<div>Dark Mode/Light Mode</div>
			<div>Password Change</div>
			<div>Delete Account</div>
			<div>Shrink Sidebar</div>
			<div>Report</div>
		</div>
	);
};

export default Settings;
