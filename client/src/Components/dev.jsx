import React from "react";
import styled from "styled-components";
import Avatar from '@mui/material/Avatar';
import pic from "../images/avatar/pic.png";

//importing mui elements
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';

const Dev = ({ devStatus }) => {
	return (
		<DevContainer devStatus={devStatus}>
			<Avatar alt="Rwishav Ghosh" src={pic} sx={avatar}/>
			<H1>Rwishav Ghosh</H1>
			<H3>Software Engineer</H3>
			<List sx={{ marginTop: 5, marginLeft: 5 }}>
        <A href="https://rwishav-ghosh.web.app/">
					<ListItemButton>
						<ListItemIcon>
							<LanguageIcon />
						</ListItemIcon>
						<ListItemText primary="Website" />
					</ListItemButton>
				</A>
				<A href="https://www.linkedin.com/in/rwishav/">
					<ListItemButton>
						<ListItemIcon>
							<LinkedInIcon />
						</ListItemIcon>
						<ListItemText primary="LinkedIn" />
					</ListItemButton>
				</A>
				<A href="https://twitter.com/rwishavvv">
					<ListItemButton>
						<ListItemIcon>
							<TwitterIcon />
						</ListItemIcon>
						<ListItemText primary="Twitter" />
					</ListItemButton>
				</A>
				<A href ="https://www.instagram.com/rwishavvv/">
					<ListItemButton>
						<ListItemIcon>
							<InstagramIcon />
						</ListItemIcon>
						<ListItemText primary="Instagram" />
					</ListItemButton>
				</A>
      </List>
		</DevContainer>
	);
};

const A = styled.a`
	text-decoration: none;
	text-decoration-color: black;
	color: black;
`;

//style for dev container
const DevContainer = styled.div`
	position: fixed;
	z-index: 9;
	top: 0;
	right: 0;
	width: 25rem;
	height: 100%;
	background-color: white;
	box-shadow: 2px 2px 50px rgb(204, 204, 204);
	user-select: none;
	overflow: scroll;
	transform: translateX(${(p) => (p.devStatus ? "0%" : "100%")});
	transition: all 0.3s ease;
	opacity: ${(p) => (p.devStatus ? "100" : "0")};
	scrollbar-width: thin;
	scrollbar-color: rgba(155, 155, 155, 0.5) tranparent;
	&::-webkit-scrollbar {
		width: 5px;
	}
	&::-webkit-scrollbar-track {
		background: transparent;
	}
	@media screen and (max-width: 768px) {
		height : 100%;
		box-shadow: none;
		width: 100%;
		z-index: 9;
	}
`;

//style for dev picture
const avatar = {
	width: 160,
	height: 160,
	marginTop: '10vh',
	marginLeft: 15,
}

//style for dev name
const H1 = styled.h2`
	display: flex;
	justify-content: center;
	margin-top: 2rem;
	padding: 1rem;
`;

//style for dev title
const H3 = styled.h3`
	display: flex;
	justify-content: center;
`;

export default Dev;