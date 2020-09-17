const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toDoSchema = new mongoose.Schema({
	title: String,
	userId: { type: Schema.Types.ObjectId, ref: 'User' },
	lastUpdated: String,
});

const ToDo = mongoose.model('ToDo', toDoSchema);

const insertToDo = async (title, userId) => {
	const doc = await ToDo.create({
		title,
		userId,
	});
	return doc;
};

const getAsAdmin = async () => {
	const doc = await ToDo.find({}).limit(5).sort({ created: 1 });
	return doc;
};

const getAsUser = async (id) => {
	const doc = await ToDo.find({ userId: id }).limit(5).sort({ created: 1 });
	return doc;
};

const getOneToDo = async (toDoId) => {
	const doc = await ToDo.findOne({ _id: toDoId });
	return doc;
};

const deleteToDo = async (toDoId) => {
	const doc = await ToDo.deleteOne({ _id: toDoId });
	return doc ? true : false;
};

const updateTodo = async (toDoId, title) => {
	const doc = await ToDo.findOneAndUpdate(
		{ _id: toDoId },
		{
			$set: {
				title,
				lastUpdated: new Date().toLocaleString(),
			},
		},
		{ new: true }
	);
	console.log(doc);
	return doc;
};

const isOwner = async (postId, userId) => {
	const todoItem = await ToDo.findOne({ _id: postId });
	console.log(todoItem.userId == userId ? true : false);
	return todoItem.userId == userId ? true : false;
};

const checkAuthorization = async (role) => {
	if (role === 'admin') {
		return true;
	} else {
		return false;
	}
};

const clear = async () => {
	const doc = await ToDo.deleteMany({}, { multi: true });
	return doc;
};

const getAllTodos = async (userId) => {
	const todo = await ToDo.find({ userId: userId });
	return todo;
};

const removeUserToDo = async (id) => {
	const doc = await ToDo.deleteMany({ userId: id }, { multi: true });
	return doc;
};
module.exports = {
	insertToDo,
	getAsAdmin,
	getAsUser,
	deleteToDo,
	updateTodo,
	isOwner,
	checkAuthorization,
	clear,
	getAllTodos,
	getOneToDo,
	removeUserToDo,
};
