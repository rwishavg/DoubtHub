import React, { useContext } from "react";
import Logo from "../../Assets/DoubtHub Logo.png";
import LogoDark from "../../Assets/DoubtHub_Logo_White.png";
import { Link } from "react-router-dom";
import classes from "../../Styles/component-styles/sidebar.module.css";
import { userObjectContext } from "../../Context";

//icons
import { UilEstate } from "@iconscout/react-unicons";
import { UilFileBookmarkAlt } from "@iconscout/react-unicons";
import { UilBookmark } from "@iconscout/react-unicons";
import { UilSetting } from "@iconscout/react-unicons";
import { UilUser } from "@iconscout/react-unicons";
import { UilSignout } from "@iconscout/react-unicons";
import { UilApps } from "@iconscout/react-unicons";

const api_endpoint = process.env.REACT_APP_API_ENDPOINT;

const Sidebar = (props) => {
	const [user, isAuthenticated] = useContext(userObjectContext);
	const theme = useContext(userObjectContext)[5];
	return (
		<div className={`${classes.sidebarContainer}`}>
			<div className={`cardComponent ${classes.sidebarComponent}`}>
				{theme === "light" && (
					<img src={Logo} alt="" className={`${classes.logo}`} />
				)}
				{theme === "dark" && (
					<img src={LogoDark} alt="" className={`${classes.logo}`} />
				)}
				<div className={`cardComponent ${classes.eventCard}`}></div>
				<Link
					to="/dashboard/1"
					className={`${classes.sidebarLink}`}
					onClick={() => props.setMenu(false)}
				>
					<UilEstate className={`${classes.iconSmaller}`} />
					<div className={`${classes.hide}`}>Dashboard</div>
				</Link>
				<Link
					to="./myQuestions"
					className={`${classes.sidebarLink} ${classes.hide}`}
					onClick={() => props.setMenu(false)}
				>
					<UilFileBookmarkAlt className={`${classes.iconSmaller}`} />
					<div className={`${classes.hide}`}>My Questions</div>
				</Link>
				<Link
					to="./saved"
					className={`${classes.sidebarLink}`}
					onClick={() => props.setMenu(false)}
				>
					<UilBookmark className={`${classes.iconSmaller}`} />
					<div className={`${classes.hide}`}>Saved</div>
				</Link>
				<Link
					to="./settings"
					className={`${classes.sidebarLink}`}
					onClick={() => props.setMenu(false)}
				>
					<UilSetting className={`${classes.iconSmaller}`} />
					<div className={`${classes.hide}`}>Settings</div>
				</Link>
				<Link
					to="./profile"
					className={`${classes.sidebarLink}`}
					onClick={() => props.setMenu(false)}
				>
					<UilUser className={`${classes.iconSmaller}`} />
					<div className={`${classes.hide}`}>Profile</div>
				</Link>
				<a
					href={api_endpoint + "/user/logout"}
					className={`${classes.sidebarLink}`}
				>
					<UilSignout
						className={`${classes.iconSmaller} ${classes.hide}`}
					/>
					<div className={`${classes.hide}`}>Logout</div>
				</a>
				<UilApps
					onClick={() => props.setMenu(!props.menu)}
					className={`${classes.iconSmaller} ${classes.unhide}`}
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
