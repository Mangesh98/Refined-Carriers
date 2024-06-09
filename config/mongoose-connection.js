const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const debug = require("debug")("development:mongoose");

mongoose
	.connect(process.env.DB_URL)
	.then(() => {
		debug("Connected to MongoDB");
	})
	.catch((error) => {
		debug("Error connecting to MongoDB:", error);
	});
		
module.exports = mongoose.connection;