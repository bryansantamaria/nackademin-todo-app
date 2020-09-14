const { itemCollection, toDoCollection } = require('../database/dataBase');

const insertItem = async (title, done, userId, toDoId) => {
	const doc = await itemCollection.insert({
		title,
		done,
		userId,
		toDoId,
		created: new Date().toLocaleString(),
	});
	return doc;
};

const findAsAdmin = async () => {
	const toDo = await toDoCollection.find({}).sort({ created: -1 });
	if (toDo.length > 0) {
		const doc = await itemCollection.find({ toDoId: toDo[0]._id }).limit(5).sort({ created: -1 });
		return doc;
	}
};

const findAsUser = async (id) => {
	const toDo = await toDoCollection.find({ userId: id }).sort({ created: -1 });
	if (toDo.length > 0) {
		const doc = await itemCollection.find({ toDoId: toDo[0]._id }).limit(5).sort({ created: -1 });
		return doc;
	}
};

const updateAsAdmin = async (postId, title, done) => {
	const doc = await itemCollection.update(
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
	const doc = await itemCollection.update(
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
	const doc = await itemCollection.remove({ _id: postId });
	return doc;
};

const deleteAsUser = async (postId) => {
	const doc = await itemCollection.remove({ _id: postId });
	return doc;
};

const getToDoId = async (id, toDoId) => {
	console.log('ENTERING TO DO ID');
	console.log(toDoId);
	const doc = await toDoCollection.findOne({ _id: toDoId });
	console.log(doc);
	return doc;
};

const sortByCreated = async (order, toDoId) => {
	const doc = await itemCollection
		.find({ toDoId: toDoId })
		.sort({ created: order })
		.limit(5)
		.exec();
	return doc;
};

const sortByUpdated = async (order, toDoId) => {
	const doc = await itemCollection
		.find({ toDoId: toDoId })
		.sort({ lastUpdated: order })
		.limit(5)
		.exec();
	return doc;
};

const limitPagination = async (perPage, skip, toDoId) => {
	const doc = await itemCollection
		.find({ toDoId: toDoId })
		.sort({ created: -1 })
		.skip(perPage * skip)
		.limit(perPage)
		.exec();
	return doc;
};

const isOwner = async (postId, userId) => {
	const todoItem = await itemCollection.findOne({ _id: postId });

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
	const doc = await itemCollection.remove({}, { multi: true });
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
	clear,
};
