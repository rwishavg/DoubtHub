import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import classes from "../../Styles/component-styles/menu.module.css";

import { UilEstate } from "@iconscout/react-unicons";
import { UilSetting } from "@iconscout/react-unicons";
import { UilSignout } from "@iconscout/react-unicons";
import { UilFileBookmarkAlt } from "@iconscout/react-unicons";

import { userObjectContext } from "../../Context";

const api_endpoint = process.env.REACT_APP_API_ENDPOINT;
const inactiveStyle = {
	transform: "translateY(100%)",
	opacity: "0",
};
const activeStyle = {
	transform: "translateY(0%)",
	opacity: "1",
};
const Menu = ({ menu, setMenu }) => {
	const [user, isAuthenticated] = useContext(userObjectContext);
	const [menuStyle, setMenuStyle] = useState(inactiveStyle);
	useEffect(() => {
		if (menu === false) setMenuStyle(inactiveStyle);
		else setMenuStyle(activeStyle);
	}, [menu]);

	return (
		<div className={`${classes.container}`} style={menuStyle}>
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
				<UilEstate className={`${classes.iconSmaller}`} />
				<div className={`${classes.hide}`}>Dashboard</div>
			</Link>
			<Link
				to="./settings"
				className={`${classes.sidebarLink}`}
				onClick={(e) => setMenu(!menu)}
			>
				<UilSetting className={`${classes.iconSmaller}`} />
				<div className={`${classes.hide}`}>Settings</div>
			</Link>
			<Link
				to="./myQuestions"
				className={`${classes.sidebarLink} ${classes.hide}`}
				onClick={(e) => setMenu(!menu)}
			>
				<UilFileBookmarkAlt className={`${classes.iconSmaller}`} />
				<div className={`${classes.hide}`}>My Questions</div>
			</Link>
			<a
				onClick={(e) => setMenu(!menu)}
				href={api_endpoint + "/user/logout"}
				className={`${classes.sidebarLink}`}
			>
				<UilSignout className={`${classes.iconSmaller}`} />
				<div className={`${classes.hide}`}>Logout</div>
			</a>
		</div>
	);
};

//style for dev container
const DevContainer = styled.div``;

export default React.memo(Menu);
