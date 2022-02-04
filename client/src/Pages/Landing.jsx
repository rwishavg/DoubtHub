import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div style={{ marginTop:"40vh", marginLeft:"45vw", width:"200px"}}>
      <Link to="/login" className="button">
					Login
      </Link>
      <Link to="/register" className="button">
					Sign Up
			</Link>
    </div>
  );
};

export default Landing;
