import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UilAngleRight } from "@iconscout/react-unicons";
import { UilAngleLeft } from "@iconscout/react-unicons";
import classes from "../../Styles/component-styles/pagination.module.css";
import { motion } from "framer-motion";

const variants = {
	open: {
		scale: [1, 0.95, 1.05, 1],
	},
	closed: {
		scale: [1, 0.95, 1.05, 1],
	},
};
const PaginationComponent = (props) => {
	const [isOpen, setIsOpen] = useState(false);
	if (props.number == 1 && props.size < 10) {
		return <div></div>;
	} else
		return (
			<div className={classes["container"]}>
				<motion.div
					animate={isOpen ? "open" : "closed"}
					variants={variants}
					transition={{
						duration: 0.4,
					}}
				>
					<div className={classes["number"]}>{props.number}</div>
				</motion.div>
				<Link
					to={`/${props.page}/${props.number - 1}`}
					className={classes["links"]}
				>
					<UilAngleLeft
						color="black"
						onClick={() => setIsOpen((isOpen) => !isOpen)}
					/>
				</Link>
				{props.size === 10 && (
					<Link
						to={`/${props.page}/${props.number + 1}`}
						className={classes["links"]}
					>
						<UilAngleRight
							color="black"
							onClick={() => setIsOpen((isOpen) => !isOpen)}
						/>
					</Link>
				)}
			</div>
		);
};

export default React.memo(PaginationComponent);
