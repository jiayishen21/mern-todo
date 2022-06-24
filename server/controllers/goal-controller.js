const Goal = require("../models/goal-model");
const User = require("../models/user-model");

// @desc		Get goals
// @route		GET /api/goals
// @access	Private
const getGoals = async (req, res) => {
	try { 
		const goals = await Goal.find({user: req.user.id});
		res.status(200).json(goals);	
	} catch (error) {
		res.status(400).json({message: error.message});
	}
}

// @desc		Set goals
// @route		SET /api/goals
// @access	Private
const setGoal = async (req, res) => {
	try {
		const goal = await Goal.create({
			text: req.body.text,
			user: req.user.id
		});

		res.status(200).json(goal);
	} catch (error) {
		res.status(400).json({message: error.message});
	}
}

// @desc		Update goals
// @route		PUT /api/goals/:id
// @access	Private
const updateGoal = async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		if(!user) {
			throw new Error("User not found");
		}
		if(goal.user.toString !== user.id) {
			throw new Error("User not authorized");
		}
		const goal = await Goal.findById(req.params.id);
		if(!goal){
			throw new Error("Goal not found");
		}
		const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true});
		res.status(200).json(updatedGoal);
	} catch (error) {	
		res.status(400).json({message: error.message});
	}
}

// @desc		Delete goals
// @route		DELETE /api/goals/:id
// @access	Private
const deleteGoal = async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		if(!user) {
			throw new Error("User not found");
		}
		if(goal.user.toString !== user.id) {
			throw new Error("User not authorized");
		}
		const goal = await Goal.findById(req.params.id);
		if(!goal) {
			throw new Error("Goal not found");
		}
		await goal.remove();
		res.status(200).json({message: `Deleted goal ${req.params.id}`});
	} catch (error) {
		res.status(400).json({message: error.message});
	}
}


module.exports = {
	getGoals,
	setGoal,
	updateGoal,
	deleteGoal
};