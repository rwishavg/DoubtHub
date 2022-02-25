import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Assets/DoubtHub Logo.png";
import bg from "../Assets/background.jpg";
import "../Styles/page-styles/landing.css";
import { motion } from "framer-motion";

const Landing = () => {
	return (
		<div className="landingContainer">
			<div className="logoLanding">
				<img src={Logo} alt="" />
			</div>
			<div className="landingLeft">
				<div className="landingContent">
					<div className="landingHeading">
						<div className="headingFull">
							<motion.div
								animate={{
									translateY: ["100px", "0px"],
								}}
								transition={{
									duration: 0.7,
									ease: "easeOut",
									delay: 1.5,
								}}
								className="hText"
							>
								A Doubt&nbsp;
							</motion.div>
							<motion.div
								animate={{
									translateY: ["100px", "0px"],
								}}
								transition={{
									duration: 0.7,
									ease: "easeOut",
									delay: 1.8,
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
									delay: 2.1,
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
									delay: 2.7,
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
									delay: 3,
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
								delay: 3.3,
							}}
						>
							<div className="loginSign">
								<Link
									to="/login"
									className="button landingButton"
								>
									Login
								</Link>
								<Link
									to="/register"
									className="button landingButton"
								>
									Sign Up
								</Link>
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
					animate={{ translateX: ["0", "50vw"] }}
					transition={{ duration: 1, ease: "easeInOut" }}
				></motion.div>
			</div>
		</div>
	);
};

export default Landing;
