const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");
router.get("/", (req, res) => {
	let error = req.flash("error");
	res.render("index", { error: error });
});
router.get("/shop", isLoggedIn, (req, res) => {
	let error = req.flash("error");
	res.render("index", { error: error });
});
