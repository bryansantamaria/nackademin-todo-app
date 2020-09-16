const mongoose = require('mongoose');
const { getAsAdmin, getAsUser, getOneToDo } = require('./toDoModel');

const itemSchema = new mongoose.Schema({
	title: String,
	done: Boolean,
	userId: String,
	toDoId: String,
	created: String,
	posts: Array,
});

const Item = mongoose.model('Item', itemSchema);

const insertItem = async (title, done, userId, toDoId) => {
	const doc = await Item.create({
		title,
		done,
		userId,
		toDoId,
		created: new Date().toLocaleString(),
	});
	return doc;
};

const findAsAdmin = async () => {
	const toDo = await getAsAdmin();
	if (toDo.length > 0) {
		const doc = await Item.find({ toDoId: toDo[0]._id }).limit(5).sort({ created: -1 });
		return doc;
	}
};

const findAsUser = async (id) => {
	const toDo = await getAsUser(id);
	if (toDo.length > 0) {
		const doc = await Item.find({ toDoId: toDo[0]._id }).limit(5).sort({ created: -1 });
		return doc;
	}
};

const updateAsAdmin = async (postId, title, done) => {
	const doc = await Item.update(
		{ _id: postId },
		{
			$set: {
				title,
				done,
				lastUpdated: new Date().toLocaleString(),
			},
		},
		{}
	);
	return doc;
};

const updateAsUser = async (postId, title, done) => {
	const doc = await Item.update(
		{ _id: postId },
		{
			$set: {
				title,
				done,
				lastUpdated: new Date().toLocaleString(),
			},
		},
		{}
	);
	return doc;
};

const deleteAsAdmin = async (postId) => {
	const doc = await Item.remove({ _id: postId });
	return doc;
};

const deleteAsUser = async (postId) => {
	const doc = await Item.remove({ _id: postId });
	return doc;
};

const getToDoId = async (toDoId) => {
	const doc = await getOneToDo(toDoId);
	console.log(doc);
	return doc;
};

const sortByCreated = async (order, toDoId) => {
	const doc = await Item.find({ toDoId: toDoId }).sort({ created: order }).limit(5).exec();
	return doc;
};

const sortByUpdated = async (order, toDoId) => {
	const doc = await Item.find({ toDoId: toDoId }).sort({ lastUpdated: order }).limit(5).exec();
	return doc;
};

const limitPagination = async (perPage, skip, toDoId) => {
	const doc = await Item.find({ toDoId: toDoId })
		.sort({ created: -1 })
		.skip(perPage * skip)
		.limit(perPage)
		.exec();
	return doc;
};

const isOwner = async (postId, userId) => {
	const todoItem = await Item.findOne({ _id: postId });

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

const deleteItems = async (toDoId) => {
	const item = await Item.remove({ toDoId: toDoId }, { multi: true });
	return item;
};
const clear = async () => {
	const doc = await Item.remove({}, { multi: true });
	return doc;
};

const todoWithItems = async (filter) => {
	const item = await Item.find(filter).limit(5);
	return item;
};

const removeUserItems = async (id) => {
	const doc = await itemCollection.remove({ userId: id }, { multi: true });
	return doc;
};

module.exports = {
	insertItem,
	findAsAdmin,
	findAsUser,
	updateAsAdmin,
	updateAsUser,
	deleteAsAdmin,
	deleteAsUser,
	sortByCreated,
	sortByUpdated,
	limitPagination,
	isOwner,
	checkAuthorization,
	getToDoId,
	deleteItems,
	todoWithItems,
	clear,
	removeUserItems,
};
