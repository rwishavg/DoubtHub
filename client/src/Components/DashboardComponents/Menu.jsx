import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import settings from "../../Assets/Icons/settings.svg";
import classes from "../../Styles/component-styles/menu.module.css";
import home from "../../Assets/Icons/home.svg";
import question from "../../Assets/Icons/question.svg";
import logout from "../../Assets/Icons/logout.svg";
import { userObjectContext } from "../../Context";

const api_endpoint = process.env.REACT_APP_API_ENDPOINT;

const Menu = ({ menu, setMenu }) => {
	const [user, isAuthenticated] = useContext(userObjectContext);
	console.log(menu);
	return (
		<DevContainer menuStatus={menu}>
			<div className={`cardComponent ${classes.userCard}`}>
				<div className={`${classes.name}`}>
					{user.firstName} {user.lastName}
				</div>
			</div>
			<Link
				to="/dashboard"
				className={`${classes.sidebarLink}`}
				onClick={(e) => setMenu(!menu)}
			>
				<img
					src={home}
					className={`${classes.iconSmaller}`}
					alt="icon"
				/>
				<div className={`${classes.hide}`}>Dashboard</div>
			</Link>
			<Link
				to="./settings"
				className={`${classes.sidebarLink}`}
				onClick={(e) => setMenu(!menu)}
			>
				<img
					src={settings}
					className={`${classes.iconSmaller} `}
					alt="icon"
				/>
				<div className={`${classes.hide}`}>Settings</div>
			</Link>
			<Link
				to="./myQuestions"
				className={`${classes.sidebarLink} ${classes.hide}`}
				onClick={(e) => setMenu(!menu)}
			>
				<img
					src={question}
					className={`${classes.iconSmaller}`}
					alt="icon"
				/>
				<div className={`${classes.hide}`}>My Questions</div>
			</Link>
			<a
				onClick={(e) => setMenu(!menu)}
				href={api_endpoint + "/user/logout"}
				className={`${classes.sidebarLink}`}
			>
				<img
					src={logout}
					className={`${classes.iconSmaller}`}
					alt="icon"
				/>
				<div className={`${classes.hide}`}>Logout</div>
			</a>
		</DevContainer>
	);
};

//style for dev container
const DevContainer = styled.div`
	position: fixed;
	z-index: 9;
	top: 0;
	right: 0;
	display: flex;
	align-items: center;
	flex-direction: column;
	width: 25rem;
	height: 100%;
	background-color: white;
	box-shadow: 2px 2px 50px rgb(204, 204, 204);
	user-select: none;
	overflow: scroll;
	transform: translateY(${(p) => (p.menuStatus ? "0%" : "100%")});
	transition: all 0.3s ease;
	opacity: ${(p) => (p.menuStatus ? "100" : "0")};
	@media screen and (max-width: 768px) {
		padding-top: 29vh;
		height: 100%;
		box-shadow: none;
		width: 100%;
		z-index: 9;
	}
`;

export default Menu;
