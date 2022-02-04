import React, { useContext } from "react";
import Logo from "../../Assets/DoubtHub Logo.png";
import { Link } from "react-router-dom";
import home from "../../Assets/Icons/home.svg";
import settings from "../../Assets/Icons/settings.svg";
import atsign from "../../Assets/Icons/atsign.svg";
import question from "../../Assets/Icons/question.svg";
import logout from "../../Assets/Icons/logout.svg";
import "../../Styles/component-styles/sidebar.css";
import { userObjectContext } from "../../Context";
const api_endpoint = process.env.REACT_APP_API_ENDPOINT;

const Sidebar = () => {
	const [user, isAuthenticated] = useContext(userObjectContext);
	return (
		<div className="sidebarContainer">
			<div className="cardComponent sidebarComponent">
				<img src={Logo} alt="" className="logo" />
				<div className="cardComponent eventCard"></div>
				<Link to="/dashboard" className="sidebarLink">
					<img src={home} className="iconSmaller" alt="icon" />
					Dashboard
				</Link>
				<Link to="./login" className="sidebarLink">
					<img src={question} className="iconSmaller" alt="icon" />
					My Questions
				</Link>
				<Link to="./trending" className="sidebarLink">
					<img src={atsign} className="iconSmaller" alt="icon" />
					Trending
				</Link>
				<Link to="./settings" className="sidebarLink">
					<img src={settings} className="iconSmaller" alt="icon" />
					Settings
				</Link>
				<a href={api_endpoint + "/user/logout"} className="sidebarLink">
					<img src={logout} className="iconSmaller" alt="icon" />
					Logout
				</a>
				<Link to="./profile" className="cardComponent userCard">
					<img src={user.profileIMG} alt="" className="userPhoto" />
					<div className="name">
						{user.firstName} {user.lastName}
					</div>
				</Link>
			</div>
		</div>
	);
};

export default React.memo(Sidebar);
