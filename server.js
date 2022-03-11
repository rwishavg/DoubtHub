const path = require("path");
const mongoose = require("mongoose");
const express = require("express");
const session = require("cookie-session");
const cors = require("cors");
require("colors");

const app = express();

const dotenv = require("dotenv");
dotenv.config({
	path: "./utils/config.env",
});

const userRoutes = require("./Routes/user");
const questionRoutes = require("./Routes/questions");
const searchRoutes = require("./Routes/search");
const commentRoutes = require("./Routes/comments");
const auth = require("./Middlewares/auth");
const localauth = require("./Middlewares/localauth");
const passport = require("passport");

const url = process.env.MONGO;

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(express.json());
app.use(session({ secret: "secret" }));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(url).then(() => console.log(`Connected to DB`.white.inverse));

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
	app.use("/user", userRoutes);
	app.use("/question", questionRoutes);
	app.use("/comment", commentRoutes);
	app.get("*", (req, res) =>
		res.sendFile(path.resolve("client", "build", "index.html"))
	);
} else {
	app.use("/user", userRoutes);
	app.use("/question", questionRoutes);
	app.use("/comment", commentRoutes);
	app.use("/search", searchRoutes);
}

app.listen(process.env.PORT || 5000, () => {
	console.log(process.env.PORT);
	console.log(`Server running at port ${process.env.PORT}`.green.inverse);
});
