const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const protect = async (req, res, next) => {
	try {
		let token;
		if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
			token = req.headers.authorization.split(" ")[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = await User.findById(decoded.id).select("-password");
			next();
		}	
		if(!token) {
			throw new Error("Unauthorized");
		}
	} catch (error) {
		res.status(400).json({message: error.message});
	}
};

module.exports = {protect};