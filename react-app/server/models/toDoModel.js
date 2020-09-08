const { toDoCollection, itemCollection } = require('../database/dataBase');

const insertToDo = async (title, userId) => {
	const doc = await toDoCollection.insert({
		title,
		userId,
	});
	return doc;
};

const getAsAdmin = async () => {
	const doc = await toDoCollection.find({}).limit(5).sort({ created: -1 });
	return doc;
};

const getAsUser = async (id) => {
	const doc = await toDoCollection.find({ userId: id }).limit(5).sort({ created: -1 });
	return doc;
};

const deleteToDo = async (toDoId) => {
	const item = await itemCollection.remove({ toDoId: toDoId }, { multi: true });
	const doc = await toDoCollection.remove({ _id: toDoId }, { multi: true });
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
	console.log('role: ' + role);
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
};
