const userModel = require("../models/user-Model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
	try {
		let { fullName, email, password } = req.body;

		//check if user already exists
		let user = await userModel.findOne({ email });
		if (user) return res.status(400).send("User already exists");

		//hash password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(password, salt, async (err, hash) => {
				if (err) res.send(err.message);

				//create user
				let createdUser = await userModel.create({
					fullName,
					email,
					password: hash,
				});
				let token = generateToken(createdUser);
				res.cookie("token", token);
				res.send(createdUser);
			});
		});
	} catch (err) {
		res.send(err.message);
	}
};
module.exports.loginUser = async (req, res) => {
	try {
		let { email, password } = req.body;

		//check if user exists
		let user = await userModel.findOne({ email });
		if (!user) return res.status(400).send("Email or Password is incorrect");

		//compare password
		bcrypt.compare(password, user.password, (err, result) => {
			if (err) return res.status(400).send("Email or Password is incorrect");
			if (result) {
				let token = generateToken(user);
				res.cookie("token", token);
				res.send("User logged in successfully");
			} else {
				res.status(400).send("Email or Password is incorrect");
			}
		});
	} catch (err) {
		res.send(err.message);
	}
};

module.exports.logoutUser = async (req, res) => {
	res.cookie("token", "");
	res.redirect("/");
};
