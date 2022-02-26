import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Assets/DoubtHub Logo.png";
import bg from "../Assets/background.svg";
import "../Styles/page-styles/landing.css";
import { motion } from "framer-motion";

const variants = {
	open: { translateX: ["-49vw", "0vw"] },
	closed: { translateX: ["0", "-49vw"] },
};
const Landing = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [opacity, setOpacity] = useState(1);
	const navigate = useNavigate();
	return (
		<div className="landingContainer">
			<div className="logoLanding">
				<img src={Logo} alt="" />
			</div>
			<div className="landingLeft">
				<div
					className="landingContent"
					style={{
						opacity: `${opacity}`,
						// transition: "opacity 0.5s ease",
					}}
				>
					<div className="landingHeading">
						<div className="headingFull">
							<motion.div
								animate={{
									translateY: ["100px", "0px"],
								}}
								transition={{
									duration: 0.7,
									ease: "easeOut",
									delay: 1,
								}}
								className="hText"
							>
								Doubt&nbsp;
							</motion.div>
							<motion.div
								animate={{
									translateY: ["100px", "0px"],
								}}
								transition={{
									duration: 0.7,
									ease: "easeOut",
									delay: 1.2,
								}}
								className="hText"
							>
								Solving&nbsp;
							</motion.div>
							<motion.div
								animate={{
									translateY: ["75px", "0px"],
								}}
								transition={{
									duration: 0.7,
									ease: "easeOut",
									delay: 1.5,
								}}
								className="hText"
							>
								App
							</motion.div>
						</div>
						<div className="headingFull">
							<motion.div
								animate={{
									translateY: ["75px", "0px"],
								}}
								transition={{
									duration: 0.7,
									ease: "easeOut",
									delay: 1.8,
								}}
							>
								Built For You.
							</motion.div>
						</div>
					</div>
					<div className="landingSubhead">
						<div className="subheadingFull">
							<motion.div
								animate={{
									translateY: ["75px", "0px"],
								}}
								transition={{
									duration: 0.7,
									ease: "easeOut",
									delay: 2.1,
								}}
							>
								A Safe Place for your Curiosity and Growth
							</motion.div>
						</div>
					</div>
					<div className="linkFull">
						<motion.div
							animate={{
								translateY: ["75px", "0px"],
							}}
							transition={{
								duration: 0.7,
								ease: "easeOut",
								delay: 2.4,
							}}
						>
							<div className="loginSign">
								<div
									className="button landingButton"
									onClick={() => {
										setIsOpen((isOpen) => !isOpen);
										setOpacity(0);
										setTimeout(() => {
											navigate("/login", {
												replace: true,
											});
										}, 1000);
									}}
								>
									Login
								</div>
								<div
									to="/register"
									className="button landingButton"
									onClick={() => {
										setIsOpen((isOpen) => !isOpen);
										setOpacity(0);
										setTimeout(() => {
											navigate("/register", {
												replace: true,
											});
										}, 1000);
									}}
								>
									Sign Up
								</div>
							</div>
						</motion.div>
					</div>
				</div>
				<div className="borderLeftSide"></div>
			</div>
			<div className="landingRight">
				<div
					className="rightInside"
					style={{ background: `url(${bg})` }}
				></div>
				<motion.div
					className="animateWid"
					animate={isOpen ? "open" : "closed"}
					variants={variants}
					transition={{ duration: 1.5, ease: [0.66, 0.44, 0, 0.98] }}
				></motion.div>
			</div>
		</div>
	);
};

export default Landing;
