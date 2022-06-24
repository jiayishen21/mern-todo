const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user-model");

// @desc		Register users
// @route		POST /api/users
// @access	Public
const registerUser = async (req, res) => {
	try {
		const {name, email, password} = req.body;
		if(!name || !email || !password) {
			throw new Error("Please add all fields");
		}
		const userExists = await User.findOne({email});
		if(userExists) {
			throw new Error("Email already used");
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = await User.create({
			name,
			email,
			password: hashedPassword
		});

		if(user) {
			res.status(201).json({
				_id: user.id,
				name: user.name,
				email: user.email,
				token: genToken(user._id)
			});
		}
		else {
			throw new Error("Invalid user data");
		}
		
	} catch (error) {
		res.status(400).json({message: error.message});	
	}
};

// @desc		Authenticate user
// @route		POST /api/users/login
// @access	Public
const loginUser = async (req, res) => {
	try {
		const {email, password} = req.body;
		const user = await User.findOne({email});
		if(user && (await bcrypt.compare(password, user.password))) {
			res.status(201).json({
				_id: user.id,
				name: user.name,
				email: user.email,
				token: genToken(user._id)
			});
		}
		else {
			throw new Error("Invalid email or password");
		}
		
	} catch (error) {	
		res.status(400).json({message: error.message});	
	}
};

// @desc		Get user data
// @route		GET /api/users/me
// @access	Private
const getUser = async (req, res) => {
	const {_id, name, email} = await User.findById(req.user.id);
	res.status(200).json({
		id: _id,
		name,
		email
	});
};

// @desc		Get user data
// @route		GET /api/users/me
// @access	Public
const genToken = (id) => {
	return jwt.sign({id}, process.env.JWT_SECRET, {
		expiresIn: "30d"
	});
};

module.exports = {
	registerUser,
	loginUser,
	getUser
};