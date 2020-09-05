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
	const toDo = await toDoCollection.find({}).limit(5).sort({ created: -1 });
	console.log(toDo);
	const doc = await itemCollection.find({ toDoId: toDo[0]._id }).limit(5).sort({ created: -1 });
	console.log(doc);
	return doc;
};

const findAsUser = async (id) => {
	console.log('ENTER FIND AS USER:');
	const toDo = await toDoCollection.find({ userId: id }).limit(5).sort({ created: -1 });
	console.log(toDo[0]._id);
	const doc = await itemCollection.find({ toDoId: toDo[0]._id }).limit(5).sort({ created: -1 });
	console.log(doc);
	return doc;
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

const sortByCreatedAdmin = async (order) => {
	const doc = await itemCollection.find({}).sort({ created: order }).limit(5).exec();
	return doc;
};

const sortByCreatedUser = async (order, userId) => {
	const doc = await itemCollection
		.find({ userId: userId })
		.sort({ created: order })
		.limit(5)
		.exec();
	return doc;
};

const sortByUpdatedAdmin = async (order) => {
	const doc = await itemCollection.find({}).sort({ lastUpdated: order }).limit(5).exec();
	return doc;
};

const sortByUpdatedUser = async (order, userId) => {
	const doc = await itemCollection
		.find({ userId: userId })
		.sort({ lastUpdated: order })
		.limit(5)
		.exec();
	return doc;
};

const limitPaginateAdmin = async (perPage, skip) => {
	const doc = await itemCollection
		.find({})
		.sort({ created: -1 })
		.skip(perPage * skip)
		.limit(perPage)
		.exec();
	return doc;
};

const limitPaginateUser = async (perPage, skip, userId) => {
	const doc = await itemCollection
		.find({ userId: userId })
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
	sortByCreatedAdmin,
	sortByCreatedUser,
	sortByUpdatedAdmin,
	sortByUpdatedUser,
	limitPaginateAdmin,
	limitPaginateUser,
	isOwner,
	checkAuthorization,
	clear,
};
