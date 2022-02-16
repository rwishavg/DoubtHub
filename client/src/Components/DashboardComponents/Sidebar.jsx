import React, { useState, useContext } from "react";
import Logo from "../../Assets/DoubtHub Logo.png";
import { Link } from "react-router-dom";
import home from "../../Assets/Icons/home.svg";
import settings from "../../Assets/Icons/settings.svg";
import saved from "../../Assets/Icons/saved.svg";
import question from "../../Assets/Icons/question.svg";
import logout from "../../Assets/Icons/logout.svg";
import profile from "../../Assets/Icons/profile.svg";
import menuIcon from "../../Assets/Icons/menu.svg";
import classes from "../../Styles/component-styles/sidebar.module.css";
import { Home } from "../../Assets/Icons/Icons";
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
					{/* <Home className={`${classes.iconSmaller}`} /> */}
					<div className={`${classes.hide}`}>Dashboard</div>
				</Link>
				<Link
					to="./myQuestions"
					className={`${classes.sidebarLink} ${classes.hide}`}
				>
					<img
						src={question}
						className={`${classes.iconSmaller}`}
						alt="icon"
					/>
					<div className={`${classes.hide}`}>My Questions</div>
				</Link>
				<Link to="./saved" className={`${classes.sidebarLink}`}>
					<img
						src={saved}
						className={`${classes.iconSmaller}`}
						alt="icon"
					/>
					<div className={`${classes.hide}`}>Saved</div>
				</Link>
				<Link to="./settings" className={`${classes.sidebarLink}`}>
					<img
						src={settings}
						className={`${classes.iconSmaller} `}
						alt="icon"
					/>
					<div className={`${classes.hide}`}>Settings</div>
				</Link>
				<Link to="./profile" className={`${classes.sidebarLink}`}>
					<img
						src={profile}
						className={`${classes.iconSmaller}`}
						alt="icon"
					/>
					<div className={`${classes.hide}`}>Profile</div>
				</Link>
				<a
					href={api_endpoint + "/user/logout"}
					className={`${classes.sidebarLink}`}
				>
					<img
						src={logout}
						className={`${classes.iconSmaller} ${classes.hide}`}
						alt="icon"
					/>
					<div className={`${classes.hide}`}>Logout</div>
				</a>
				<img
					onClick={() => props.setMenu(!props.menu)}
					src={menuIcon}
					className={`${classes.iconSmaller} ${classes.unhide}`}
					alt="icon"
				/>
				<div className={`cardComponent ${classes.userCard}`}>
					<img
						src={user.profileIMG}
						alt=""
						className={`${classes.userPhoto}`}
					/>
					<div className={`${classes.name} ${classes.hide}`}>
						{user.firstName} {user.lastName}
					</div>
				</div>
			</div>
		</div>
	);
};

export default React.memo(Sidebar);
