const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");
const bcrypt = require("bcrypt");

if (process.env.NODE_ENV) {
	router.post("/create", async (req, res) => {
		let owners = await ownerModel.find();
		if (owners.length > 0) {
			res.status(501).send("You don't have permission to create new owner");
		}
		let { fullName, email, password } = req.body;

		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(password, salt, async (err, hash) => {
				let createdOwner = await ownerModel.create({
					fullName,
					email,
					password: hash,
				});
				res.status(201).send(createdOwner);
			});
		});
	});
}

router.get("/", (req, res) => {
	res.send("hey it's working !");
});

module.exports = router;
