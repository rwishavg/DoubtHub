import React from "react";
import Logo from "../../Assets/DoubtHub Logo.png";
import { Link } from "react-router-dom";
const Sidebar = (props) => {
	return (
		<div className="sidebarContainer">
			<div className="cardComponent sidebarComponent">
				<img src={Logo} alt="" className="logo" />
				<Link to="./test">test</Link>
				<Link to="/dashboard">dashboard</Link>
				<div className="cardComponent userCard">
					<img
						src={props.user.picture}
						alt=""
						className="userPhoto"
					/>

					<div className="name">
						{props.user.given_name} {props.user.family_name}
					</div>
				</div>
			</div>
		</div>
	);
};

export default React.memo(Sidebar);
