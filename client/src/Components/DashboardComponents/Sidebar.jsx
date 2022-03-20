import React, { useContext } from "react";
import Logo from "../../Assets/DoubtHub Logo.png";
import LogoDark from "../../Assets/DoubtHub_Logo_White.png";
import { Link, useNavigate } from "react-router-dom";
import classes from "../../Styles/component-styles/sidebar.module.css";
import { userObjectContext } from "../../Context";
import { toast } from "wc-toast";

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
	const navigate = useNavigate();
	const checkAuth = (arg) => {
		if (isAuthenticated === false) {
			navigate("../../login", { replace: true });
			toast("Login To continue");
			return 0;
		} else {
			navigate(arg, { replace: true });
		}
	};
	return (
		<div className={`${classes.sidebarContainer}`}>
			<div className={`cardComponent ${classes.sidebarComponent}`}>
				{theme === "light" && (
					<Link to={"../"}>
						<img src={Logo} alt="" className={`${classes.logo}`} />
					</Link>
				)}
				{theme === "dark" && (
					<Link to={"../"}>
						<img
							src={LogoDark}
							alt=""
							className={`${classes.logo}`}
						/>
					</Link>
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
				<div
					className={`${classes.sidebarLink} ${classes.hide}`}
					onClick={() => {
						checkAuth("./myQuestions");
						props.setMenu(false);
					}}
				>
					<UilFileBookmarkAlt className={`${classes.iconSmaller}`} />
					<div className={`${classes.hide}`}>My Questions</div>
				</div>
				<div
					className={`${classes.sidebarLink}`}
					onClick={() => {
						checkAuth("./saved");
						props.setMenu(false);
					}}
				>
					<UilBookmark className={`${classes.iconSmaller}`} />
					<div className={`${classes.hide}`}>Saved</div>
				</div>
				<Link
					to="./settings"
					className={`${classes.sidebarLink}`}
					onClick={() => props.setMenu(false)}
				>
					<UilSetting className={`${classes.iconSmaller}`} />
					<div className={`${classes.hide}`}>Settings</div>
				</Link>
				<div
					className={`${classes.sidebarLink}`}
					onClick={() => {
						checkAuth("./profile");
						props.setMenu(false);
					}}
				>
					<UilUser className={`${classes.iconSmaller}`} />
					<div className={`${classes.hide}`}>Profile</div>
				</div>
				{isAuthenticated === true && (
					<a
						href={api_endpoint + "/user/logout"}
						className={`${classes.sidebarLink}`}
					>
						<UilSignout
							className={`${classes.iconSmaller} ${classes.hide}`}
						/>
						<div className={`${classes.hide}`}>Logout</div>
					</a>
				)}

				<UilApps
					onClick={() => props.setMenu(!props.menu)}
					className={`${classes.iconSmaller} ${classes.unhide}`}
				/>
				<div className={`cardComponent ${classes.userCard}`}>
					{isAuthenticated === true && (
						<img
							src={user.profileIMG}
							alt=""
							className={`${classes.userPhoto}`}
						/>
					)}
					{isAuthenticated === true && (
						<div className={`${classes.name} ${classes.hide}`}>
							{user.firstName} {user.lastName}
						</div>
					)}
					{isAuthenticated === false && (
						<Link
							to={"../login"}
							className={`${classes.name} ${classes.hide}`}
						>
							<div className={`${classes.name} ${classes.hide}`}>
								Login / Sign Up
							</div>
						</Link>
					)}
				</div>
			</div>
		</div>
	);
};

export default React.memo(Sidebar);
