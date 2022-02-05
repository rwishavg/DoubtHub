import React, { useContext } from "react";
import Logo from "../../Assets/DoubtHub Logo.png";
import { Link } from "react-router-dom";
import home from "../../Assets/Icons/home.svg";
import settings from "../../Assets/Icons/settings.svg";
import atsign from "../../Assets/Icons/atsign.svg";
import question from "../../Assets/Icons/question.svg";
import logout from "../../Assets/Icons/logout.svg";
import profile from "../../Assets/Icons/profile.svg";
import classes from "../../Styles/component-styles/sidebar.module.css";
import { userObjectContext } from "../../Context";
const api_endpoint = process.env.REACT_APP_API_ENDPOINT;

const Sidebar = (props) => {
	const [user, isAuthenticated] = useContext(userObjectContext);
	return (
		<div className={`${classes.sidebarContainer}`}>
			<div className={`cardComponent ${classes.sidebarComponent}`}>
				<img src={Logo} alt="" className={`${classes.logo}`} />
				<div className={`cardComponent ${classes.eventCard}`}></div>
				<Link to="/dashboard" className={`${classes.sidebarLink}`}>
					<img
						src={home}
						className={`${classes.iconSmaller}`}
						alt="icon"
					/>
					Dashboard
				</Link>
				<Link to="./login" className={`${classes.sidebarLink}`}>
					<img
						src={question}
						className={`${classes.iconSmaller}`}
						alt="icon"
					/>
					My Questions
				</Link>
				<Link to="./trending" className={`${classes.sidebarLink}`}>
					<img
						src={atsign}
						className={`${classes.iconSmaller}`}
						alt="icon"
					/>
					Trending
				</Link>
				<Link to="./settings" className={`${classes.sidebarLink}`}>
					<img
						src={settings}
						className={`${classes.iconSmaller}`}
						alt="icon"
					/>
					Settings
				</Link>
				<Link to="./profile" className={`${classes.sidebarLink}`}>
					<img
						src={profile}
						className={`${classes.iconSmaller}`}
						alt="icon"
					/>
					Profile
				</Link>
				<a
					href={api_endpoint + "/user/logout"}
					className={`${classes.sidebarLink}`}
				>
					<img
						src={logout}
						className={`${classes.iconSmaller}`}
						alt="icon"
					/>
					Logout
				</a>
				<div className={`cardComponent ${classes.userCard}`}>
					<img
						src={user.profileIMG}
						alt=""
						className={`${classes.userPhoto}`}
					/>
					<div className={`${classes.name}`}>
						{user.firstName} {user.lastName}
					</div>
				</div>
			</div>
		</div>
	);
};

export default React.memo(Sidebar);
