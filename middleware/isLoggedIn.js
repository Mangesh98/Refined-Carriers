const jwt = require("jsonwebtoken");
const userModel = require("../user-model.js");

module.exports = async (req, res, next) => {
	if (!req.cookies.token) {
		req.flash("error", "You must be logged in to see this page");
		return res.redirect("/");
	}
	try {
		const token = req.cookies.token;
		// console.log(token)
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		// console.log(payload)
		req.user = await userModel.findById(payload.id).select("-password");
		next();
	} catch (error) {
		req.flash("error", "Something went wrong");
		res.redirect("/");
	}
};
