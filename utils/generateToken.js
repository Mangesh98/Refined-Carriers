const jwt = require("jsonwebtoken");
const generateToken = (user) => {
	return jwt.sign(
		{
			id: user._id,
			email: user.email,
			fullName: user.fullName,
		},
		process.env.JWT_SECRET
	);
};

module.exports = generateToken;
