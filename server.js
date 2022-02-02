const path = require("path");
const mongoose = require("mongoose");
const express = require("express");
const session = require("cookie-session");
const cors = require("cors");

const app = express();

const dotenv = require("dotenv");
dotenv.config({
	path: "./utils/config.env",
});

const apiRoutes = require("./Routes/user");
const auth = require("./Middlewares/auth");
const passport = require("passport");

const url = process.env.MONGO;

const whitelist = ["http://localhost:3000"];
const corsOptions = {
	origin: function (origin, callback) {
		if (!origin || whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true,
};

app.use(cors());
app.use(cors(corsOptions));

app.use(express.json());
app.use(session({ secret: "secret" }));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(url).then(() => console.log("Connected to DB"));

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
	app.use("/user", apiRoutes);
	app.get('*', (req, res) => res.sendFile(path.resolve('client', 'build', 'index.html')));
} 
else {
	app.use("/user", apiRoutes);
}

app.listen(process.env.PORT || 5000, () => {
	console.log(process.env.PORT);
	console.log(`Server running at port ${process.env.PORT}`);
	
});
