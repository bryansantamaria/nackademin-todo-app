const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema({
	title: String,
	userId: String,
	posts: Array,
});

const itemSchema = new mongoose.Schema({
	title: String,
	done: Boolean,
	userId: String,
	toDoId: String,
	created: String,
	posts: Array,
});

const ToDo = mongoose.model('ToDo', toDoSchema);
const Item = mongoose.model('Item', itemSchema);

const insertToDo = async (title, userId) => {
	const doc = await ToDo.insert({
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

const deleteToDo = async (toDoId) => {
	console.log(toDoId);
	const item = await Item.remove({ toDoId: toDoId }, { multi: true });
	console.log(item);
	const doc = await ToDo.remove({ _id: toDoId }, { multi: true });
	console.log(doc);
	return doc || item ? true : false;
};

const getTodoItems = async (filter) => {
	const item = await Item.find(filter).limit(5);
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

const getAllItems = async (filter) => {
	const item = await Item.find(filter).limit();
	return item;
};

const getAllTodos = async (userId) => {
	const todo = await ToDo.find({ userId: userId });
	return todo;
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
	getAllItems,
	getAllTodos,
};
