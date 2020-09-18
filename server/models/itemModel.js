const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new mongoose.Schema({
	title: String,
	done: Boolean,
	userId: { type: Schema.Types.ObjectId, ref: 'User' },
	toDoId: { type: Schema.Types.ObjectId, ref: 'ToDo' },
	created: String,
	lastUpdated: String,
});

const Item = mongoose.model('Item', itemSchema);

const insertItem = async (title, done, userId, toDoId) => {
	const doc = await Item.create({
		title,
		done,
		userId,
		toDoId,
		created: new Date().toLocaleString(),
		lastUpdated: new Date().toLocaleString(),
	});
	return doc._doc;
};

const findItems = async (toDoId) => {
	const doc = await Item.find({ toDoId: toDoId }).limit(5).sort({ created: -1 });
	return doc;
};

const updateAsAdmin = async (postId, title, done) => {
	const doc = await Item.updateOne(
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
	return doc._doc;
};

const updateAsUser = async (postId, title, done) => {
	const doc = await Item.updateOne(
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
	return doc._doc;
};

const deleteAsAdmin = async (postId) => {
	const doc = await Item.deleteOne({ _id: postId });
	return doc;
};

const deleteAsUser = async (postId) => {
	const doc = await Item.deleteOne({ _id: postId });
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

	return todoItem.userId == userId ? true : false;
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
	const item = await Item.deleteMany({ toDoId: toDoId }, { multi: true });
	return item;
};
const clear = async () => {
	const doc = await Item.deleteMany({}, { multi: true });
	return doc;
};

const todoWithItems = async (filter) => {
	const item = await Item.find(filter).limit(5);
	return item;
};

const removeUserItems = async (id) => {
	const doc = await Item.deleteMany({ userId: id }, { multi: true });
	return doc;
};

module.exports = {
	insertItem,
	findItems,
	updateAsAdmin,
	updateAsUser,
	deleteAsAdmin,
	deleteAsUser,
	sortByCreated,
	sortByUpdated,
	limitPagination,
	isOwner,
	checkAuthorization,
	deleteItems,
	todoWithItems,
	clear,
	removeUserItems,
};
