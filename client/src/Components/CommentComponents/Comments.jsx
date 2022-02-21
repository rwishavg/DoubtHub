import React from "react";
import classes from "../../Styles/component-styles/comments.module.css";
import QuestionUser from "../QuestionComponents/QuestionUser";
import uparrow from "../../Assets/Icons/uparrow.svg";
const Comments = () => {
	return (
		// <div className={`cardComponent ${classes["scale"]}`}>
		<div>
			<div className={classes["content"]}>
				<div className={classes["topOptions"]}>
					<div className={classes["icons"]}>
						<img src={uparrow} alt="" />
						<div className={classes["mar"]}> 213 </div>
						<img
							src={uparrow}
							alt=""
							className={classes["inverse"]}
						/>
					</div>
					<QuestionUser
						firstName={"Raghav"}
						lastName={"Mathur"}
						profileIMG={
							"https://lh3.googleusercontent.com/a-/AOh14GgFdXaSCjn3CAobuhukN07MD9nlXDVtOTYj9peCjQ=s96-c"
						}
						username={"raghav"}
						date={"5 Hours ago"}
						reverse={true}
					/>
				</div>
				<div className={classes["commentDescription"]}>
					Lorem Ipsum is simply dummy text of the printing and
					typesetting industry. Lorem Ipsum has been the industry's
					standard dummy text ever since the 1500s, when an unknown
					printer took a galley of type and scrambled it to make a
					type specimen book. It has survived not only five centuries,
					but also the leap into electronic typesetting, remaining
					essentially unchanged. It was popularised in the 1960s with
					the release of Letraset sheets containing Lorem Ipsum
					passages, and more recently with desktop publishing software
					like Aldus PageMaker including versions of Lorem Ipsum.
				</div>
			</div>
		</div>
		// </div>
	);
};

export default Comments;
