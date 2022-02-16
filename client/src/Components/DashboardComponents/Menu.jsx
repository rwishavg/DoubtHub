import React from "react";
import styled from "styled-components";

const Menu = ({ menu }) => {
	console.log(menu);
	return (
		<DevContainer menuStatus={menu}>
			<H1>Rwishav Ghosh</H1>
			<H3>Software Engineer</H3>
		</DevContainer>
	);
};

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
	// transform: translateX(${(p) => (p.menuStatus ? "0%" : "100%")});
	transition: all 0.3s ease;
	opacity: ${(p) => (p.menuStatus ? "100" : "0")};
	// opacity: 1;
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

export default Menu;