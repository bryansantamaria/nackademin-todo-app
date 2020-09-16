const mongoose = require('mongoose');
const { deleteItems, todoWithItems } = require('./itemModel');

const toDoSchema = new mongoose.Schema({
	title: String,
	userId: String,
	posts: Array,
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
	console.log(doc);
	return doc;
};

const deleteToDo = async (toDoId) => {
	const item = await deleteItems(toDoId);
	const doc = await ToDo.remove({ _id: toDoId }, { multi: true });
	return doc || item ? true : false;
};

const getTodoItems = async (filter) => {
	const item = await todoWithItems(filter);
	return item;
};

const updateTodo = async (toDoId, title) => {
	const doc = await ToDo.update(
		{ _id: toDoId },
		{
			$set: {
				title,
				lastUpdated: new Date().toLocaleString(),
			},
		},
		{ returnUpdatedDocs: true }
	);
	console.log(doc);
	return doc;
};

const isOwner = async (postId, userId) => {
	const todoItem = await ToDo.findOne({ _id: postId });
	console.log('Is Owner: ' + todoItem.userId === userId);
	return todoItem.userId === userId;
};

const checkAuthorization = async (role) => {
	if (role === 'admin') {
		return true;
	} else {
		return false;
	}
};

const clear = async () => {
	const doc = await ToDo.remove({}, { multi: true });
	return doc;
};

const getAllTodos = async (userId) => {
	const todo = await ToDo.find({ userId: userId });
	return todo;
};

const removeUserToDo = async (id) => {
	const doc = await ToDo.remove({ userId: id }, { multi: true });
	return doc;
};
module.exports = {
	insertToDo,
	getAsAdmin,
	getAsUser,
	deleteToDo,
	getTodoItems,
	updateTodo,
	isOwner,
	checkAuthorization,
	clear,
	getAllTodos,
	getOneToDo,
	removeUserToDo,
};
