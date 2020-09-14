const { toDoCollection, itemCollection } = require('../database/dataBase');

const insertToDo = async (title, userId) => {
	const doc = await toDoCollection.insert({
		title,
		userId,
	});
	return doc;
};

const getAsAdmin = async () => {
	const doc = await toDoCollection.find({}).limit(5).sort({ created: 1 });
	return doc;
};

const getAsUser = async (id) => {
	const doc = await toDoCollection.find({ userId: id }).limit(5).sort({ created: 1 });
	return doc;
};

const deleteToDo = async (toDoId) => {
	console.log(toDoId);
	const item = await itemCollection.remove({ toDoId: toDoId }, { multi: true });
	console.log(item);
	const doc = await toDoCollection.remove({ _id: toDoId }, { multi: true });
	console.log(doc);
	return doc || item ? true : false;
};

const getTodoItems = async (filter) => {
	const item = await itemCollection.find(filter).limit(5);
	return item;
};

const updateTodo = async (toDoId, title) => {
	const doc = await toDoCollection.update(
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
	const todoItem = await toDoCollection.findOne({ _id: postId });
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
	const doc = await toDoCollection.remove({}, { multi: true });
	return doc;
};

const getAllItems = async (filter) => {
	const item = await itemCollection.find(filter).limit();
	return item;
};

const getAllTodos = async (userId) => {
	const todo = await toDoCollection.find({ userId: userId });
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
